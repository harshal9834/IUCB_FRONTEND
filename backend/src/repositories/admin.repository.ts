import prisma from "../config/Database.js";
import { Admin } from "@prisma/client";

export class AdminRepository {
  async findByEmail(email: string): Promise<Admin | null> {
    return prisma.admin.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<Admin | null> {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<Admin, "id" | "createdAt" | "updatedAt" | "deletedAt" | "lastLogin">): Promise<Admin> {
    return prisma.admin.create({
      data,
    });
  }
}
export default AdminRepository;
