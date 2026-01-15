import { type User, type InsertUser, type HotelAdmin, type InsertHotelAdmin, type HotelReservation, type InsertHotelReservation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getHotelAdmin(id: string): Promise<HotelAdmin | undefined>;
  getHotelAdminByUsername(username: string): Promise<HotelAdmin | undefined>;
  getHotelAdminByHotelCode(hotelCode: string): Promise<HotelAdmin | undefined>;
  createHotelAdmin(admin: InsertHotelAdmin): Promise<HotelAdmin>;
  updateHotelAdminPassword(id: string, newPassword: string): Promise<HotelAdmin | undefined>;
  
  createReservation(reservation: InsertHotelReservation): Promise<HotelReservation>;
  getReservationsByHotelCode(hotelCode: string): Promise<HotelReservation[]>;
  getAllReservations(): Promise<HotelReservation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private hotelAdmins: Map<string, HotelAdmin>;
  private reservations: Map<string, HotelReservation>;

  constructor() {
    this.users = new Map();
    this.hotelAdmins = new Map();
    this.reservations = new Map();
    
    this.initDefaultAdmins();
  }

  private initDefaultAdmins() {
    const riversideAdmin: HotelAdmin = {
      id: randomUUID(),
      hotelCode: "riverside",
      hotelName: "리버사이드 호텔",
      username: "river",
      password: "5678",
      createdAt: new Date(),
    };
    this.hotelAdmins.set(riversideAdmin.id, riversideAdmin);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getHotelAdmin(id: string): Promise<HotelAdmin | undefined> {
    return this.hotelAdmins.get(id);
  }

  async getHotelAdminByUsername(username: string): Promise<HotelAdmin | undefined> {
    return Array.from(this.hotelAdmins.values()).find(
      (admin) => admin.username === username,
    );
  }

  async getHotelAdminByHotelCode(hotelCode: string): Promise<HotelAdmin | undefined> {
    return Array.from(this.hotelAdmins.values()).find(
      (admin) => admin.hotelCode === hotelCode,
    );
  }

  async createHotelAdmin(insertAdmin: InsertHotelAdmin): Promise<HotelAdmin> {
    const id = randomUUID();
    const admin: HotelAdmin = { ...insertAdmin, id, createdAt: new Date() };
    this.hotelAdmins.set(id, admin);
    return admin;
  }

  async updateHotelAdminPassword(id: string, newPassword: string): Promise<HotelAdmin | undefined> {
    const admin = this.hotelAdmins.get(id);
    if (!admin) return undefined;
    
    const updatedAdmin = { ...admin, password: newPassword };
    this.hotelAdmins.set(id, updatedAdmin);
    return updatedAdmin;
  }

  async createReservation(insertReservation: InsertHotelReservation): Promise<HotelReservation> {
    const id = randomUUID();
    const reservation: HotelReservation = { ...insertReservation, id, createdAt: new Date() };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async getReservationsByHotelCode(hotelCode: string): Promise<HotelReservation[]> {
    return Array.from(this.reservations.values()).filter(
      (reservation) => reservation.hotelCode === hotelCode,
    );
  }

  async getAllReservations(): Promise<HotelReservation[]> {
    return Array.from(this.reservations.values());
  }
}

export const storage = new MemStorage();
