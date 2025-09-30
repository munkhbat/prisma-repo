import { Request, Response, Router } from "express";
import i18n from "i18n";
import { UserController } from "../../controllers/user.controller";
import { errorHandler } from "../../utils";
import { HTTP_STATUS_CODES } from "../../utils/consts";
const router = Router();

// User registration
router.post(
  "/user/register",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { doc } = req.body;

      return res.status(HTTP_STATUS_CODES.CREATED).json({
        success: true,
        message: await UserController.register(doc),
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  }
);

// User login
router.post(
  "/user/login",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { doc } = req.body;

      return res.status(HTTP_STATUS_CODES.ACCEPTED).json({
        success: true,
        message: await UserController.login(doc),
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  }
);

// User get
router.post("/user/list", async (req: Request, res: Response): Promise<any> => {
  try {
    const { doc } = req.body;

    const result = await UserController.getList(doc);

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: i18n.__("success.ok"),
      ...result,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
});

export default router;
