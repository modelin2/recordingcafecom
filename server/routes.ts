import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertHotelReservationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/reservations", async (req, res) => {
    try {
      const validated = insertHotelReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(validated);
      res.json(reservation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid reservation data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create reservation" });
      }
    }
  });

  app.get("/api/reservations/:hotelCode", async (req, res) => {
    try {
      const { hotelCode } = req.params;
      const reservations = await storage.getReservationsByHotelCode(hotelCode);
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reservations" });
    }
  });

  app.post("/api/hotel-admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }
      
      const admin = await storage.getHotelAdminByUsername(username);
      
      if (!admin || admin.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      res.json({
        id: admin.id,
        hotelCode: admin.hotelCode,
        hotelName: admin.hotelName,
        username: admin.username,
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/hotel-admin/change-password", async (req, res) => {
    try {
      const { adminId, currentPassword, newPassword } = req.body;
      
      if (!adminId || !currentPassword || !newPassword) {
        return res.status(400).json({ error: "All fields required" });
      }
      
      const admin = await storage.getHotelAdmin(adminId);
      
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      
      if (admin.password !== currentPassword) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }
      
      const updatedAdmin = await storage.updateHotelAdminPassword(adminId, newPassword);
      
      res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to change password" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
