import { storage } from "../storage";
import type { InsertTenant, Tenant } from "../../shared/schema";

interface TenantConfig {
  industry?: string;
  securityLevel?: "basic" | "standard" | "enterprise";
  alertSettings?: {
    email: boolean;
    sms: boolean;
    webhook?: string;
  };
  scanSchedule?: {
    frequency: "daily" | "weekly" | "monthly";
    time: string;
  };
}

export class TenantService {
  async createTenant(userId: number, name: string, config: TenantConfig = {}): Promise<Tenant> {
    try {
      const tenantData: InsertTenant = {
        name,
        industry: config.industry,
        config: JSON.stringify(config),
        userId
      };

      const tenant = await storage.createTenant(tenantData);
      
      await this.initializeDefaultSettings(tenant.id);
      
      return tenant;
    } catch (error) {
      console.error("Error creating tenant:", error);
      throw new Error("Failed to create tenant");
    }
  }

  async getTenant(tenantId: number): Promise<Tenant | null> {
    try {
      const tenant = await storage.getTenant(tenantId);
      return tenant || null;
    } catch (error) {
      console.error("Error getting tenant:", error);
      throw new Error("Failed to retrieve tenant");
    }
  }

  async getTenantsByUser(userId: number): Promise<Tenant[]> {
    try {
      return await storage.getTenantsByUserId(userId);
    } catch (error) {
      console.error("Error getting user tenants:", error);
      throw new Error("Failed to retrieve user tenants");
    }
  }

  async updateTenantConfig(tenantId: number, config: Partial<TenantConfig>): Promise<Tenant> {
    try {
      const tenant = await storage.getTenant(tenantId);
      if (!tenant) {
        throw new Error("Tenant not found");
      }

      const currentConfig = JSON.parse(tenant.config || "{}");
      const updatedConfig = { ...currentConfig, ...config };

      const updatedTenant = await storage.updateTenant(tenantId, {
        config: JSON.stringify(updatedConfig)
      });

      return updatedTenant;
    } catch (error) {
      console.error("Error updating tenant config:", error);
      throw new Error("Failed to update tenant configuration");
    }
  }

  async getTenantDashboard(tenantId: number) {
    try {
      const tenant = await storage.getTenant(tenantId);
      if (!tenant) {
        throw new Error("Tenant not found");
      }

      const [threatStats, recentScans, alerts] = await Promise.all([
        storage.getThreatStats(tenantId),
        storage.getSecurityScans(tenantId),
        storage.getActiveAlerts(tenantId)
      ]);

      return {
        tenant: {
          id: tenant.id,
          name: tenant.name,
          industry: tenant.industry,
          created_at: tenant.createdAt
        },
        security_metrics: {
          total_threats: threatStats.total || 0,
          threats_blocked: threatStats.blocked || 0,
          security_score: this.calculateSecurityScore(threatStats),
          last_scan: recentScans[0]?.createdAt || null
        },
        recent_activity: {
          scans: recentScans.slice(0, 5),
          alerts: alerts.slice(0, 10)
        }
      };
    } catch (error) {
      console.error("Error getting tenant dashboard:", error);
      throw new Error("Failed to retrieve tenant dashboard");
    }
  }

  async validateTenantAccess(tenantId: number, userId: number): Promise<boolean> {
    try {
      const tenant = await storage.getTenant(tenantId);
      return tenant?.userId === userId;
    } catch (error) {
      console.error("Error validating tenant access:", error);
      return false;
    }
  }

  async getTenantSettings(tenantId: number) {
    try {
      const tenant = await storage.getTenant(tenantId);
      if (!tenant) {
        throw new Error("Tenant not found");
      }

      const config = JSON.parse(tenant.config || "{}");
      return {
        tenant_id: tenant.id,
        name: tenant.name,
        industry: tenant.industry,
        security_level: config.securityLevel || "standard",
        alert_settings: config.alertSettings || {
          email: true,
          sms: false
        },
        scan_schedule: config.scanSchedule || {
          frequency: "weekly",
          time: "02:00"
        }
      };
    } catch (error) {
      console.error("Error getting tenant settings:", error);
      throw new Error("Failed to retrieve tenant settings");
    }
  }

  private async initializeDefaultSettings(tenantId: number): Promise<void> {
    try {
      await storage.createComplianceRecord({
        tenantId,
        framework: "SOC2",
        status: "pending",
        score: 0,
        findings: JSON.stringify([])
      });

      await storage.createComplianceRecord({
        tenantId,
        framework: "ISO27001",
        status: "pending",
        score: 0,
        findings: JSON.stringify([])
      });
    } catch (error) {
      console.error("Error initializing default settings:", error);
    }
  }

  private calculateSecurityScore(threatStats: any): number {
    const total = threatStats.total || 0;
    const blocked = threatStats.blocked || 0;
    
    if (total === 0) return 100;
    
    const blockRate = blocked / total;
    return Math.round(blockRate * 100);
  }
}

export const tenantService = new TenantService();
