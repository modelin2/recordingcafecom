import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const hotelAdmins = pgTable("hotel_admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hotelCode: text("hotel_code").notNull().unique(),
  hotelName: text("hotel_name").notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHotelAdminSchema = createInsertSchema(hotelAdmins).pick({
  hotelCode: true,
  hotelName: true,
  username: true,
  password: true,
});

export type InsertHotelAdmin = z.infer<typeof insertHotelAdminSchema>;
export type HotelAdmin = typeof hotelAdmins.$inferSelect;

export const hotelReservations = pgTable("hotel_reservations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hotelCode: text("hotel_code").notNull(),
  roomNumber: text("room_number").notNull(),
  nickname: text("nickname").notNull(),
  partySize: integer("party_size").notNull(),
  visitDate: text("visit_date").notNull(),
  visitTime: text("visit_time").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHotelReservationSchema = createInsertSchema(hotelReservations).pick({
  hotelCode: true,
  roomNumber: true,
  nickname: true,
  partySize: true,
  visitDate: true,
  visitTime: true,
});

export type InsertHotelReservation = z.infer<typeof insertHotelReservationSchema>;
export type HotelReservation = typeof hotelReservations.$inferSelect;
