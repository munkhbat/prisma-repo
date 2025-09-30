import { Request, Response, Router } from "express";
import notificationRouter from "./api/notification.api";

const router = Router();

router.get(
  "/api/health-check",
  async (_: Request, res: Response): Promise<any> => {
    return res.status(200).json({ success: true, message: "ok" });
  }
);

router.use("/api", notificationRouter);

export default router;