import { Router } from "express";
import adminRoutes from "./admin.routes.js";
import authRoutes from "./auth.routes.js";

const rootRouter = Router();

// API Health Check
rootRouter.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

rootRouter.use("/v1/auth", authRoutes);
rootRouter.use("/admins", adminRoutes);

export default rootRouter;
