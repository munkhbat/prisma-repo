import { Request, Response, Router } from "express";
import organizatopnRouter from "./api/organization.api";
import organizationUserRouter from "./api/organization-user.api";
import userRouter from "./api/user.api";
const router = Router();

router.get(
  "/api/health-check",
  async (_: Request, res: Response): Promise<any> => {
    return res.status(201).json({ success: true, message: "ok" });
  }
);
router.use("/api", userRouter);
router.use("/api", organizatopnRouter);
router.use("/api", organizationUserRouter);
export default router;
