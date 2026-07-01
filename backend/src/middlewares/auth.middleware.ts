import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AdminRole, Admin } from "@prisma/client";
import prisma from "../config/Database.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";

export interface AuthenticatedRequest extends Request {
  admin?: Omit<Admin, "password">;
}

export const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized to access this route, token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "super_secret_jwt_signing_key_change_me_in_production") as { id: string; role: string };

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
    });

    if (!admin || admin.status !== "ACTIVE" || admin.deletedAt !== null) {
      throw new ApiError(401, "Not authorized, user not active or deleted");
    }

    const { password, ...adminWithoutPassword } = admin;
    req.admin = adminWithoutPassword;
    next();
  } catch (error) {
    throw new ApiError(401, "Not authorized, token invalid or expired");
  }
});

export const requireRole = (roles: AdminRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.admin) {
      throw new ApiError(401, "Not authenticated");
    }

    if (!roles.includes(req.admin.role)) {
      throw new ApiError(403, `Access denied: Role '${req.admin.role}' does not have sufficient privileges`);
    }

    next();
  };
};
