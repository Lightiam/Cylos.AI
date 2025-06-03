import { storage } from "../storage";
import type { InsertMonitoringAlert, MonitoringAlert } from "../../shared/schema";

interface MetricData {
  timestamp: Date;
  value: number;
  metadata?: Record<string, any>;
}

interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  severity: "low" | "medium" | "high" | "critical";
  enabled: boolean;
}

interface SystemMetrics {
  threats_detected: number;
  scans_completed: number;
  alerts_active: number;
  security_score: number;
  uptime_percentage: number;
  response_time_ms: number;
}

export class MonitoringService {
  private metrics: Map<string, MetricData[]> = new Map();
  private alertRules: Map<number, AlertRule[]> = new Map();

  async recordMetric(tenantId: number, metricName: string, value: number, metadata?: Record<string, any>): Promise<void> {
    try {
      const key = `${tenantId}:${metricName}`;
      const metricData: MetricData = {
        timestamp: new Date(),
        value,
        metadata
      };

      if (!this.metrics.has(key)) {
        this.metrics.set(key, []);
      }

      const metrics = this.metrics.get(key)!;
      metrics.push(metricData);

      if (metrics.length > 1000) {
        metrics.shift();
      }

      await this.checkAlertRules(tenantId, metricName, value);
    } catch (error) {
      console.error("Error recording metric:", error);
      throw new Error("Failed to record metric");
    }
  }

  async getMetrics(tenantId: number, metricName: string, timeRange?: { start: Date; end: Date }): Promise<MetricData[]> {
    try {
      const key = `${tenantId}:${metricName}`;
      const metrics = this.metrics.get(key) || [];

      if (!timeRange) {
        return metrics;
      }

      return metrics.filter(m => 
        m.timestamp >= timeRange.start && m.timestamp <= timeRange.end
      );
    } catch (error) {
      console.error("Error getting metrics:", error);
      throw new Error("Failed to retrieve metrics");
    }
  }

  async getSystemMetrics(tenantId: number): Promise<SystemMetrics> {
    try {
      const [threatStats, scans, alerts] = await Promise.all([
        storage.getThreatStats(tenantId),
        storage.getSecurityScans(tenantId),
        storage.getActiveAlerts(tenantId)
      ]);

      const completedScans = scans.filter(s => s.status === "completed").length;
      const securityScore = this.calculateSecurityScore(threatStats, scans, alerts);

      return {
        threats_detected: threatStats.total || 0,
        scans_completed: completedScans,
        alerts_active: alerts.length,
        security_score: securityScore,
        uptime_percentage: 99.9, // Mock uptime
        response_time_ms: Math.floor(Math.random() * 100) + 50 // Mock response time
      };
    } catch (error) {
      console.error("Error getting system metrics:", error);
      throw new Error("Failed to retrieve system metrics");
    }
  }

  async createAlert(tenantId: number, alertType: string, severity: "low" | "medium" | "high" | "critical", message: string, metadata?: Record<string, any>): Promise<MonitoringAlert> {
    try {
      const alert = await storage.createMonitoringAlert({
        tenantId,
        alertType,
        severity,
        message,
        metadata: JSON.stringify(metadata || {})
      });

      await this.sendAlertNotifications(tenantId, alert);

      return alert;
    } catch (error) {
      console.error("Error creating alert:", error);
      throw new Error("Failed to create alert");
    }
  }

  async getAlerts(tenantId: number, options?: { status?: string; severity?: string; limit?: number }): Promise<MonitoringAlert[]> {
    try {
      const alerts = await storage.getMonitoringAlerts(tenantId);
      
      let filteredAlerts = alerts;

      if (options?.status) {
        filteredAlerts = filteredAlerts.filter(a => a.status === options.status);
      }

      if (options?.severity) {
        filteredAlerts = filteredAlerts.filter(a => a.severity === options.severity);
      }

      if (options?.limit) {
        filteredAlerts = filteredAlerts.slice(0, options.limit);
      }

      return filteredAlerts;
    } catch (error) {
      console.error("Error getting alerts:", error);
      throw new Error("Failed to retrieve alerts");
    }
  }

  async resolveAlert(tenantId: number, alertId: number): Promise<MonitoringAlert> {
    try {
      const alert = await storage.updateMonitoringAlert(alertId, {
        status: "resolved",
        resolvedAt: new Date()
      });

      return alert;
    } catch (error) {
      console.error("Error resolving alert:", error);
      throw new Error("Failed to resolve alert");
    }
  }

  async setupAlertRules(tenantId: number, rules: AlertRule[]): Promise<void> {
    try {
      this.alertRules.set(tenantId, rules);
    } catch (error) {
      console.error("Error setting up alert rules:", error);
      throw new Error("Failed to setup alert rules");
    }
  }

  async getAlertRules(tenantId: number): Promise<AlertRule[]> {
    return this.alertRules.get(tenantId) || [];
  }

  async getDashboardMetrics(tenantId: number) {
    try {
      const [systemMetrics, recentAlerts, threatTrends] = await Promise.all([
        this.getSystemMetrics(tenantId),
        this.getAlerts(tenantId, { limit: 10 }),
        this.getThreatTrends(tenantId)
      ]);

      return {
        system_metrics: systemMetrics,
        recent_alerts: recentAlerts,
        threat_trends: threatTrends,
        health_status: this.calculateHealthStatus(systemMetrics, recentAlerts)
      };
    } catch (error) {
      console.error("Error getting dashboard metrics:", error);
      throw new Error("Failed to retrieve dashboard metrics");
    }
  }

  private async checkAlertRules(tenantId: number, metricName: string, value: number): Promise<void> {
    const rules = this.alertRules.get(tenantId) || [];
    
    for (const rule of rules) {
      if (!rule.enabled) continue;

      const shouldAlert = this.evaluateAlertCondition(rule, metricName, value);
      
      if (shouldAlert) {
        await this.createAlert(
          tenantId,
          `metric_threshold`,
          rule.severity,
          `${rule.name}: ${metricName} value ${value} exceeded threshold ${rule.threshold}`,
          { rule_id: rule.id, metric_name: metricName, value, threshold: rule.threshold }
        );
      }
    }
  }

  private evaluateAlertCondition(rule: AlertRule, metricName: string, value: number): boolean {
    if (rule.condition === "greater_than") {
      return value > rule.threshold;
    } else if (rule.condition === "less_than") {
      return value < rule.threshold;
    }
    return false;
  }

  private async sendAlertNotifications(tenantId: number, alert: MonitoringAlert): Promise<void> {
    console.log(`Alert notification for tenant ${tenantId}: ${alert.message}`);
    
  }

  private calculateSecurityScore(threatStats: any, scans: any[], alerts: MonitoringAlert[]): number {
    let score = 100;

    const threatCount = threatStats.total || 0;
    score -= Math.min(threatCount * 2, 30);

    const failedScans = scans.filter(s => s.status === "failed").length;
    score -= failedScans * 5;

    const criticalAlerts = alerts.filter(a => a.severity === "critical" && a.status === "active").length;
    score -= criticalAlerts * 10;

    return Math.max(score, 0);
  }

  private async getThreatTrends(tenantId: number): Promise<any[]> {
    const trends = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      trends.push({
        date: date.toISOString().split('T')[0],
        threats: Math.floor(Math.random() * 20),
        blocked: Math.floor(Math.random() * 15)
      });
    }
    
    return trends;
  }

  private calculateHealthStatus(metrics: SystemMetrics, alerts: MonitoringAlert[]): "healthy" | "warning" | "critical" {
    const criticalAlerts = alerts.filter(a => a.severity === "critical" && a.status === "active").length;
    
    if (criticalAlerts > 0 || metrics.security_score < 50) {
      return "critical";
    }
    
    if (metrics.security_score < 80 || alerts.length > 5) {
      return "warning";
    }
    
    return "healthy";
  }
}

export const monitoringService = new MonitoringService();
