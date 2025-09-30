import { Request, Response, Router } from "express";
import { NotificationController } from "../../controllers/notification.controller";
import { errorHandler } from "../../utils";
import { HTTP_STATUS_CODES } from "../../utils/consts";

const router = Router();

// Create notification
router.post("/notification/create", async (req: Request, res: Response) => {
  try {
    const { doc } = req.body;

    return res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      message: await NotificationController.create(doc),
    });
  } catch (err) {
    return errorHandler(res, err);
  }
});

// Mark as read
router.post("/notification/mark-as-read", async (req: Request, res: Response) => {
  try {
    const { doc } = req.body;

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: await NotificationController.markAsRead(doc),
    });
  } catch (err) {
    return errorHandler(res, err);
  }
});

// Delete notification
router.post("/notification/delete", async (req: Request, res: Response) => {
  try {
    const { doc } = req.body;

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: await NotificationController.delete(doc),
    });
  } catch (err) {
    return errorHandler(res, err);
  }
});

// Get notification list
router.post("/notification/list", async (req: Request, res: Response) => {
  try {
    const { doc, user } = req.body;

    const result = await NotificationController.getList(doc, user);

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: "Notifications retrieved successfully",
      ...result,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
});

// Get unread count
router.post("/notification/unread-count", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const result = await NotificationController.getUnreadCount(userId);

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      ...result,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
});

// Mark all as read
router.post("/notification/mark-all-as-read", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: await NotificationController.markAllAsRead(userId),
    });
  } catch (err) {
    return errorHandler(res, err);
  }
});

export default router;