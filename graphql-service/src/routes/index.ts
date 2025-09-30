import { Response, Router } from "express";

const router = Router();

router.get("/health-check", async (_, res: Response): Promise<any> => {
  return res.json({ success: true, message: "Success" });
});

export default router;
