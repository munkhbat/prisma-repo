import { Request, Response, Router } from "express";
import { OrganizationController } from "../../controllers/organization.controller";
import { errorHandler } from "../../utils";
import { HTTP_STATUS_CODES } from "../../utils/consts";

const router = Router();

// Organization registration
router.post("/organization/register", async (req: Request, res: Response) => {
  try {
    const { doc } = req.body;

    return res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      message: await OrganizationController.create(doc),
    });
  } catch (err) {
    return errorHandler(res, err);
  }
});

// Get organization list
router.post("/organization/list", async (req: Request, res: Response) => {
  try {
    const { doc, user } = req.body;

    const result = await OrganizationController.getList(doc, user);

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: "Organizations retrieved successfully",
      ...result,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
});

export default router;
