import { Request, Response } from "express";
import { AdminService } from "../services/admin.service.js";

export class AdminController {
  private adminService = new AdminService();

  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const email = req.query.email as string;
      if (!email) {
        res.status(400).json({ error: "Email query parameter required" });
        return;
      }

      const admin = await this.adminService.getAdminByEmail(email);
      if (!admin) {
        res.status(404).json({ error: "Admin not found" });
        return;
      }

      res.status(200).json({ admin: { id: admin.id, fullName: admin.fullName, email: admin.email, role: admin.role } });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
export default AdminController;
