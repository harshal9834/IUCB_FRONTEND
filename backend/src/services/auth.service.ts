import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Admin, AdminRole } from "@prisma/client";
import prisma from "../config/Database.js";
import ApiError from "../utils/ApiError.js";
import Logger from "../utils/Logger.js";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_signing_key_change_me_in_production";
const JWT_EXPIRES_IN = "15m"; // Short lived access token
const REFRESH_TOKEN_EXPIRES_DAYS = 7;

export class AuthService {
  // Generate Access JWT Token
  generateAccessToken(admin: { id: string; email: string; role: AdminRole }): string {
    return jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  // Generate Refresh Token and store it in database
  async generateRefreshToken(adminId: string): Promise<string> {
    const token = crypto.randomBytes(40).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_DAYS);

    await prisma.refreshToken.create({
      data: {
        token,
        adminId,
        expiresAt,
      },
    });

    return token;
  }

  // Log Administrative Operations
  async logAudit(adminId: string | null, entityType: string, entityId: string, action: string, ip: string | null, ua: string | null, oldData?: any, newData?: any) {
    try {
      await prisma.auditLog.create({
        data: {
          adminId,
          entityType,
          entityId,
          action,
          ipAddress: ip,
          userAgent: ua,
          oldData: oldData ? JSON.parse(JSON.stringify(oldData)) : undefined,
          newData: newData ? JSON.parse(JSON.stringify(newData)) : undefined,
        },
      });
    } catch (err) {
      Logger.error("Failed to write audit log entry:", err);
    }
  }

  // Invalidate individual refresh token
  async invalidateRefreshToken(token: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { token },
    });
  }

  // Invalidate all tokens for an admin (e.g. on reset/change password)
  async invalidateAllAdminTokens(adminId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { adminId },
    });
  }
}
export default AuthService;
