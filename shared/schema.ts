import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  company: text("company"),
  role: text("role"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  environmentSize: text("environment_size").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  isVerified: true,
  createdAt: true,
});

export const signupSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertDemoRequestSchema = createInsertSchema(demoRequests).omit({
  id: true,
  createdAt: true,
});

export const tenants = pgTable("tenants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  industry: text("industry"),
  config: text("config").default("{}"), // JSON string
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const threats = pgTable("threats", {
  id: serial("id").primaryKey(),
  tenantId: integer("tenant_id").references(() => tenants.id),
  text: text("text").notNull(),
  source: text("source").default("api"),
  severity: text("severity").notNull(),
  status: text("status").default("detected"),
  metadata: text("metadata").default("{}"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const securityScans = pgTable("security_scans", {
  id: serial("id").primaryKey(),
  tenantId: integer("tenant_id").references(() => tenants.id),
  scanType: text("scan_type").notNull(),
  status: text("status").default("pending"),
  config: text("config").default("{}"),
  results: text("results").default("{}"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const complianceRecords = pgTable("compliance_records", {
  id: serial("id").primaryKey(),
  tenantId: integer("tenant_id").references(() => tenants.id),
  framework: text("framework").notNull(), // SOC2, ISO27001, etc.
  status: text("status").default("pending"),
  score: integer("score"),
  findings: text("findings").default("{}"),
  lastChecked: timestamp("last_checked").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const monitoringAlerts = pgTable("monitoring_alerts", {
  id: serial("id").primaryKey(),
  tenantId: integer("tenant_id").references(() => tenants.id),
  alertType: text("alert_type").notNull(),
  severity: text("severity").notNull(),
  message: text("message").notNull(),
  metadata: text("metadata").default("{}"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
});

export const insertTenantSchema = createInsertSchema(tenants).omit({
  id: true,
  createdAt: true,
});

export const insertThreatSchema = createInsertSchema(threats).omit({
  id: true,
  createdAt: true,
});

export const insertSecurityScanSchema = createInsertSchema(securityScans).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertComplianceRecordSchema = createInsertSchema(complianceRecords).omit({
  id: true,
  createdAt: true,
  lastChecked: true,
});

export const insertMonitoringAlertSchema = createInsertSchema(monitoringAlerts).omit({
  id: true,
  createdAt: true,
  resolvedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type DemoRequest = typeof demoRequests.$inferSelect;

export type InsertTenant = z.infer<typeof insertTenantSchema>;
export type Tenant = typeof tenants.$inferSelect;
export type InsertThreat = z.infer<typeof insertThreatSchema>;
export type Threat = typeof threats.$inferSelect;
export type InsertSecurityScan = z.infer<typeof insertSecurityScanSchema>;
export type SecurityScan = typeof securityScans.$inferSelect;
export type InsertComplianceRecord = z.infer<typeof insertComplianceRecordSchema>;
export type ComplianceRecord = typeof complianceRecords.$inferSelect;
export type InsertMonitoringAlert = z.infer<typeof insertMonitoringAlertSchema>;
export type MonitoringAlert = typeof monitoringAlerts.$inferSelect;
