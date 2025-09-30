import { Request, Response, Router } from "express";
import { OrganizationUserController } from "../../controllers/organization-user.controller";
import { errorHandler } from "../../utils";
import { HTTP_STATUS_CODES } from "../../utils/consts";

const router = Router();

// Add user to organization
router.post(
  "/organization-user/create",
  async (req: Request, res: Response) => {
    try {
      const { doc } = req.body;

      return res.status(HTTP_STATUS_CODES.CREATED).json({
        success: true,
        message: await OrganizationUserController.create(doc),
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  }
);

// Remove user from organization
router.post(
  "/organization-user/remove",
  async (req: Request, res: Response) => {
    try {
      const { doc } = req.body;

      return res.status(HTTP_STATUS_CODES.OK).json({
        success: true,
        message: await OrganizationUserController.remove(doc),
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  }
);

// Get organization users list
router.post(
  "/organization-user/list",
  async (req: Request, res: Response) => {
    try {
      const { doc, user } = req.body;

      const result = await OrganizationUserController.getList(doc, user);

      return res.status(HTTP_STATUS_CODES.OK).json({
        success: true,
        message: "Organization users retrieved successfully",
        ...result,
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  }
);

export default router;