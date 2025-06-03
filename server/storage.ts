import { 
  users, 
  demoRequests, 
  tenants,
  threats,
  securityScans,
  complianceRecords,
  monitoringAlerts,
  type User, 
  type InsertUser, 
  type DemoRequest, 
  type InsertDemoRequest,
  type InsertTenant,
  type Tenant,
  type InsertThreat,
  type Threat,
  type InsertSecurityScan,
  type SecurityScan,
  type InsertComplianceRecord,
  type ComplianceRecord,
  type InsertMonitoringAlert,
  type MonitoringAlert
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, count } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDemoRequest(demoRequest: InsertDemoRequest): Promise<DemoRequest>;
  getDemoRequests(): Promise<DemoRequest[]>;
  
  createTenant(tenant: InsertTenant): Promise<Tenant>;
  getTenant(id: number): Promise<Tenant | undefined>;
  getTenantsByUserId(userId: number): Promise<Tenant[]>;
  updateTenant(id: number, updates: Partial<Tenant>): Promise<Tenant>;
  
  createThreat(threat: InsertThreat): Promise<Threat>;
  getThreats(tenantId: number, limit?: number): Promise<Threat[]>;
  getThreatStats(tenantId: number): Promise<any>;
  
  createSecurityScan(scan: InsertSecurityScan): Promise<SecurityScan>;
  updateSecurityScan(id: number, updates: Partial<SecurityScan>): Promise<SecurityScan>;
  getSecurityScan(id: number): Promise<SecurityScan | undefined>;
  getSecurityScans(tenantId: number): Promise<SecurityScan[]>;
  
  createComplianceRecord(record: InsertComplianceRecord): Promise<ComplianceRecord>;
  getComplianceRecords(tenantId: number): Promise<ComplianceRecord[]>;
  updateComplianceRecord(id: number, updates: Partial<ComplianceRecord>): Promise<ComplianceRecord>;
  
  createMonitoringAlert(alert: InsertMonitoringAlert): Promise<MonitoringAlert>;
  getMonitoringAlerts(tenantId: number): Promise<MonitoringAlert[]>;
  getActiveAlerts(tenantId: number): Promise<MonitoringAlert[]>;
  updateMonitoringAlert(id: number, updates: Partial<MonitoringAlert>): Promise<MonitoringAlert>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createDemoRequest(insertDemoRequest: InsertDemoRequest): Promise<DemoRequest> {
    const [demoRequest] = await db
      .insert(demoRequests)
      .values({
        ...insertDemoRequest,
        message: insertDemoRequest.message || null
      })
      .returning();
    return demoRequest;
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    const requests = await db
      .select()
      .from(demoRequests)
      .orderBy(demoRequests.createdAt);
    return requests.reverse();
  }

  async createTenant(insertTenant: InsertTenant): Promise<Tenant> {
    const [tenant] = await db
      .insert(tenants)
      .values(insertTenant)
      .returning();
    return tenant;
  }

  async getTenant(id: number): Promise<Tenant | undefined> {
    const [tenant] = await db.select().from(tenants).where(eq(tenants.id, id));
    return tenant || undefined;
  }

  async getTenantsByUserId(userId: number): Promise<Tenant[]> {
    return await db.select().from(tenants).where(eq(tenants.userId, userId));
  }

  async updateTenant(id: number, updates: Partial<Tenant>): Promise<Tenant> {
    const [tenant] = await db
      .update(tenants)
      .set(updates)
      .where(eq(tenants.id, id))
      .returning();
    return tenant;
  }

  async createThreat(insertThreat: InsertThreat): Promise<Threat> {
    const [threat] = await db
      .insert(threats)
      .values(insertThreat)
      .returning();
    return threat;
  }

  async getThreats(tenantId: number, limit: number = 100): Promise<Threat[]> {
    return await db
      .select()
      .from(threats)
      .where(eq(threats.tenantId, tenantId))
      .orderBy(desc(threats.createdAt))
      .limit(limit);
  }

  async getThreatStats(tenantId: number): Promise<any> {
    const [totalResult] = await db
      .select({ count: count() })
      .from(threats)
      .where(eq(threats.tenantId, tenantId));

    const [blockedResult] = await db
      .select({ count: count() })
      .from(threats)
      .where(and(eq(threats.tenantId, tenantId), eq(threats.status, "blocked")));

    return {
      total: totalResult.count,
      blocked: blockedResult.count,
      active: totalResult.count - blockedResult.count
    };
  }

  async createSecurityScan(insertScan: InsertSecurityScan): Promise<SecurityScan> {
    const [scan] = await db
      .insert(securityScans)
      .values(insertScan)
      .returning();
    return scan;
  }

  async updateSecurityScan(id: number, updates: Partial<SecurityScan>): Promise<SecurityScan> {
    const [scan] = await db
      .update(securityScans)
      .set(updates)
      .where(eq(securityScans.id, id))
      .returning();
    return scan;
  }

  async getSecurityScan(id: number): Promise<SecurityScan | undefined> {
    const [scan] = await db.select().from(securityScans).where(eq(securityScans.id, id));
    return scan || undefined;
  }

  async getSecurityScans(tenantId: number): Promise<SecurityScan[]> {
    return await db
      .select()
      .from(securityScans)
      .where(eq(securityScans.tenantId, tenantId))
      .orderBy(desc(securityScans.createdAt));
  }

  async createComplianceRecord(insertRecord: InsertComplianceRecord): Promise<ComplianceRecord> {
    const [record] = await db
      .insert(complianceRecords)
      .values(insertRecord)
      .returning();
    return record;
  }

  async getComplianceRecords(tenantId: number): Promise<ComplianceRecord[]> {
    return await db
      .select()
      .from(complianceRecords)
      .where(eq(complianceRecords.tenantId, tenantId))
      .orderBy(desc(complianceRecords.lastChecked));
  }

  async updateComplianceRecord(id: number, updates: Partial<ComplianceRecord>): Promise<ComplianceRecord> {
    const [record] = await db
      .update(complianceRecords)
      .set(updates)
      .where(eq(complianceRecords.id, id))
      .returning();
    return record;
  }

  async createMonitoringAlert(insertAlert: InsertMonitoringAlert): Promise<MonitoringAlert> {
    const [alert] = await db
      .insert(monitoringAlerts)
      .values(insertAlert)
      .returning();
    return alert;
  }

  async getMonitoringAlerts(tenantId: number): Promise<MonitoringAlert[]> {
    return await db
      .select()
      .from(monitoringAlerts)
      .where(eq(monitoringAlerts.tenantId, tenantId))
      .orderBy(desc(monitoringAlerts.createdAt));
  }

  async getActiveAlerts(tenantId: number): Promise<MonitoringAlert[]> {
    return await db
      .select()
      .from(monitoringAlerts)
      .where(and(eq(monitoringAlerts.tenantId, tenantId), eq(monitoringAlerts.status, "active")))
      .orderBy(desc(monitoringAlerts.createdAt));
  }

  async updateMonitoringAlert(id: number, updates: Partial<MonitoringAlert>): Promise<MonitoringAlert> {
    const [alert] = await db
      .update(monitoringAlerts)
      .set(updates)
      .where(eq(monitoringAlerts.id, id))
      .returning();
    return alert;
  }
}

export const storage = new DatabaseStorage();
