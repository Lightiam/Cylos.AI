import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDemoRequestSchema, 
  signupSchema, 
  loginSchema,
  insertTenantSchema,
  insertThreatSchema,
  insertSecurityScanSchema,
  insertComplianceRecordSchema,
  insertMonitoringAlertSchema
} from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { securityService } from "./services/securityService";
import { tenantService } from "./services/tenantService";
import { complianceService } from "./services/complianceService";
import { monitoringService } from "./services/monitoringService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo request submission
  app.post("/api/demo-request", async (req, res) => {
    try {
      const demoRequestData = insertDemoRequestSchema.parse(req.body);
      const demoRequest = await storage.createDemoRequest(demoRequestData);
      res.json({ success: true, id: demoRequest.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Get all demo requests (for admin purposes)
  app.get("/api/demo-requests", async (req, res) => {
    try {
      const demoRequests = await storage.getDemoRequests();
      res.json(demoRequests);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // User signup
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      // Create user (excluding confirmPassword)
      const { confirmPassword, ...userToCreate } = userData;
      const user = await storage.createUser({
        ...userToCreate,
        password: hashedPassword,
      });

      // Don't return password in response
      const { password, ...userResponse } = user;
      res.status(201).json({ 
        success: true, 
        user: userResponse,
        message: "Account created successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // User login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);

      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Don't return password in response
      const { password: _, ...userResponse } = user;
      res.json({ 
        success: true, 
        user: userResponse,
        message: "Login successful" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });


  app.post("/api/v1/tenants", async (req, res) => {
    try {
      const tenantData = insertTenantSchema.parse(req.body);
      const tenant = await tenantService.createTenant(tenantData.userId!, tenantData.name, {
        industry: tenantData.industry || undefined,
        securityLevel: "standard"
      });
      
      res.json({
        success: true,
        data: {
          tenant_id: tenant.id,
          name: tenant.name,
          industry: tenant.industry,
          created_at: tenant.createdAt
        }
      });
    } catch (error) {
      console.error("Create tenant error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create tenant" });
      }
    }
  });

  app.get("/api/v1/tenants/:tenantId", async (req, res) => {
    try {
      const tenantId = parseInt(req.params.tenantId);
      const tenant = await tenantService.getTenant(tenantId);
      
      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" });
      }
      
      res.json({
        success: true,
        data: {
          tenant_id: tenant.id,
          name: tenant.name,
          industry: tenant.industry,
          created_at: tenant.createdAt
        }
      });
    } catch (error) {
      console.error("Get tenant error:", error);
      res.status(500).json({ error: "Failed to retrieve tenant" });
    }
  });

  app.get("/api/v1/tenants/:tenantId/dashboard", async (req, res) => {
    try {
      const tenantId = parseInt(req.params.tenantId);
      const dashboard = await tenantService.getTenantDashboard(tenantId);
      
      res.json({
        success: true,
        data: dashboard
      });
    } catch (error) {
      console.error("Get tenant dashboard error:", error);
      res.status(500).json({ error: "Failed to retrieve tenant dashboard" });
    }
  });

  app.post("/api/v1/analyze", async (req, res) => {
    try {
      const { text, source = "api", tenant_id } = req.body;
      
      if (!text || !tenant_id) {
        return res.status(400).json({ error: "Missing required fields: text, tenant_id" });
      }
      
      const analysis = await securityService.analyzeText(tenant_id, text, source);
      
      res.json({
        success: true,
        data: {
          threat_level: analysis.threatLevel,
          severity: analysis.severity,
          categories: analysis.categories,
          confidence: analysis.confidence,
          recommendations: analysis.recommendations
        }
      });
    } catch (error) {
      console.error("Threat analysis error:", error);
      res.status(500).json({ error: "Threat analysis failed" });
    }
  });

  app.post("/api/v1/analyze/batch", async (req, res) => {
    try {
      const { texts, source = "api", tenant_id } = req.body;
      
      if (!texts || !Array.isArray(texts) || !tenant_id) {
        return res.status(400).json({ error: "Missing required fields: texts (array), tenant_id" });
      }
      
      const analyses = await securityService.batchAnalyzeTexts(tenant_id, texts, source);
      
      res.json({
        success: true,
        data: {
          results: analyses.map(analysis => ({
            threat_level: analysis.threatLevel,
            severity: analysis.severity,
            categories: analysis.categories,
            confidence: analysis.confidence,
            recommendations: analysis.recommendations
          }))
        }
      });
    } catch (error) {
      console.error("Batch threat analysis error:", error);
      res.status(500).json({ error: "Batch threat analysis failed" });
    }
  });

  app.get("/api/v1/tenants/:tenantId/threats/stats", async (req, res) => {
    try {
      const tenantId = parseInt(req.params.tenantId);
      const stats = await securityService.getThreatStats(tenantId);
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error("Get threat stats error:", error);
      res.status(500).json({ error: "Failed to retrieve threat statistics" });
    }
  });

  app.post("/api/v1/scans", async (req, res) => {
    try {
      const { scan_type, config = {}, tenant_id } = req.body;
      
      if (!scan_type || !tenant_id) {
        return res.status(400).json({ error: "Missing required fields: scan_type, tenant_id" });
      }
      
      const scanId = await securityService.startSecurityScan(tenant_id, scan_type, config);
      
      res.json({
        success: true,
        data: {
          scan_id: scanId,
          status: "started",
          scan_type: scan_type
        }
      });
    } catch (error) {
      console.error("Start security scan error:", error);
      res.status(500).json({ error: "Failed to start security scan" });
    }
  });

  app.get("/api/v1/scans/:scanId/results", async (req, res) => {
    try {
      const scanId = parseInt(req.params.scanId);
      const { tenant_id } = req.query;
      
      if (!tenant_id) {
        return res.status(400).json({ error: "Missing required query parameter: tenant_id" });
      }
      
      const results = await securityService.getScanResults(parseInt(tenant_id as string), scanId);
      
      res.json({
        success: true,
        data: results
      });
    } catch (error) {
      console.error("Get scan results error:", error);
      res.status(500).json({ error: "Failed to retrieve scan results" });
    }
  });

  app.post("/api/v1/compliance/check", async (req, res) => {
    try {
      const { framework, tenant_id } = req.body;
      
      if (!framework || !tenant_id) {
        return res.status(400).json({ error: "Missing required fields: framework, tenant_id" });
      }
      
      const assessment = await complianceService.checkCompliance(tenant_id, framework);
      
      res.json({
        success: true,
        data: {
          framework: assessment.framework,
          score: assessment.score,
          status: assessment.status,
          findings: assessment.findings,
          recommendations: assessment.recommendations
        }
      });
    } catch (error) {
      console.error("Compliance check error:", error);
      res.status(500).json({ error: "Compliance check failed" });
    }
  });

  app.get("/api/v1/tenants/:tenantId/compliance", async (req, res) => {
    try {
      const tenantId = parseInt(req.params.tenantId);
      const status = await complianceService.getComplianceStatus(tenantId);
      
      res.json({
        success: true,
        data: {
          compliance_records: status.map(record => ({
            framework: record.framework,
            status: record.status,
            score: record.score,
            last_checked: record.lastChecked
          }))
        }
      });
    } catch (error) {
      console.error("Get compliance status error:", error);
      res.status(500).json({ error: "Failed to retrieve compliance status" });
    }
  });

  app.get("/api/v1/tenants/:tenantId/compliance/:framework/report", async (req, res) => {
    try {
      const tenantId = parseInt(req.params.tenantId);
      const framework = req.params.framework;
      
      const report = await complianceService.getComplianceReport(tenantId, framework);
      
      res.json({
        success: true,
        data: report
      });
    } catch (error) {
      console.error("Get compliance report error:", error);
      res.status(500).json({ error: "Failed to generate compliance report" });
    }
  });

  app.get("/api/v1/tenants/:tenantId/metrics", async (req, res) => {
    try {
      const tenantId = parseInt(req.params.tenantId);
      const metrics = await monitoringService.getSystemMetrics(tenantId);
      
      res.json({
        success: true,
        data: metrics
      });
    } catch (error) {
      console.error("Get system metrics error:", error);
      res.status(500).json({ error: "Failed to retrieve system metrics" });
    }
  });

  app.get("/api/v1/tenants/:tenantId/alerts", async (req, res) => {
    try {
      const tenantId = parseInt(req.params.tenantId);
      const { status, severity, limit } = req.query;
      
      const options: any = {};
      if (status) options.status = status as string;
      if (severity) options.severity = severity as string;
      if (limit) options.limit = parseInt(limit as string);
      
      const alerts = await monitoringService.getAlerts(tenantId, options);
      
      res.json({
        success: true,
        data: {
          alerts: alerts.map(alert => ({
            id: alert.id,
            alert_type: alert.alertType,
            severity: alert.severity,
            message: alert.message,
            status: alert.status,
            created_at: alert.createdAt,
            resolved_at: alert.resolvedAt
          }))
        }
      });
    } catch (error) {
      console.error("Get alerts error:", error);
      res.status(500).json({ error: "Failed to retrieve alerts" });
    }
  });

  app.post("/api/v1/tenants/:tenantId/alerts/:alertId/resolve", async (req, res) => {
    try {
      const tenantId = parseInt(req.params.tenantId);
      const alertId = parseInt(req.params.alertId);
      
      const alert = await monitoringService.resolveAlert(tenantId, alertId);
      
      res.json({
        success: true,
        data: {
          id: alert.id,
          status: alert.status,
          resolved_at: alert.resolvedAt
        }
      });
    } catch (error) {
      console.error("Resolve alert error:", error);
      res.status(500).json({ error: "Failed to resolve alert" });
    }
  });

  app.get("/api/v1/tenants/:tenantId/dashboard/metrics", async (req, res) => {
    try {
      const tenantId = parseInt(req.params.tenantId);
      const dashboardMetrics = await monitoringService.getDashboardMetrics(tenantId);
      
      res.json({
        success: true,
        data: dashboardMetrics
      });
    } catch (error) {
      console.error("Get dashboard metrics error:", error);
      res.status(500).json({ error: "Failed to retrieve dashboard metrics" });
    }
  });

  app.post("/api/v1/webhook/threat-detected", async (req, res) => {
    try {
      const { tenant_id, threat_data, source = "webhook" } = req.body;
      
      if (!tenant_id || !threat_data) {
        return res.status(400).json({ error: "Missing required fields: tenant_id, threat_data" });
      }
      
      // Create alert for webhook threat detection
      const alert = await monitoringService.createAlert(
        tenant_id,
        "external_threat",
        threat_data.severity || "medium",
        `External threat detected: ${threat_data.description || "Unknown threat"}`,
        { source, threat_data }
      );
      
      res.json({
        success: true,
        data: {
          alert_id: alert.id,
          message: "Threat alert created successfully"
        }
      });
    } catch (error) {
      console.error("Webhook threat detection error:", error);
      res.status(500).json({ error: "Failed to process threat webhook" });
    }
  });

  app.get("/api/v1/health", async (req, res) => {
    try {
      res.json({
        success: true,
        data: {
          status: "healthy",
          timestamp: new Date().toISOString(),
          version: "1.0.0",
          services: {
            database: "connected",
            security_engine: "active",
            monitoring: "active"
          }
        }
      });
    } catch (error) {
      console.error("Health check error:", error);
      res.status(500).json({ error: "Health check failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
