import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDemoRequestSchema, signupSchema, loginSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";

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

  const httpServer = createServer(app);
  return httpServer;
}
