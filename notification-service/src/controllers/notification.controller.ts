import {
  INotificationCreate,
  INotificationDelete,
  INotificationGetList,
  INotificationMarkAsRead,
} from "../interfaces/notification.interface";
import { db } from "../utils/db.server";
import { order, pagination } from "../utils/pagination";
import {
  validateCreate,
  validateDelete,
  validateMarkAsRead,
} from "../validations/notification.validation";

export class NotificationController {
  // Create notification
  static async create(doc: INotificationCreate) {
    try {
      const filtered = await validateCreate(doc);

      await db.notification.create({
        data: {
          userId: filtered.userId,
          title: filtered.title,
          message: filtered.message,
          type: filtered.type,
        },
      });

      return "Notification created successfully";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Mark as read
  static async markAsRead(doc: INotificationMarkAsRead) {
    try {
      const filtered = await validateMarkAsRead(doc);

      const notification = await db.notification.findFirst({
        where: { id: filtered.id },
      });

      if (!notification) {
        throw new Error("Notification not found");
      }

      await db.notification.update({
        where: { id: filtered.id },
        data: { isRead: true },
      });

      return "Notification marked as read";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Delete notification
  static async delete(doc: INotificationDelete) {
    try {
      const filtered = await validateDelete(doc);

      const notification = await db.notification.findFirst({
        where: { id: filtered.id },
      });

      if (!notification) {
        throw new Error("Notification not found");
      }

      await db.notification.delete({
        where: { id: filtered.id },
      });

      return "Notification deleted successfully";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Query builder
  static async query(doc: INotificationGetList): Promise<object> {
    const { userId, type, isRead } = doc;

    const conditions: any[] = [];

    if (userId) conditions.push({ userId });
    if (type) conditions.push({ type });
    if (isRead !== undefined) conditions.push({ isRead });

    if (conditions.length === 0) {
      return {};
    }

    return { AND: conditions };
  }

  // Get notification list
  static async getList(doc: INotificationGetList, user: any) {
    const where = await this.query(doc);

    const [rows, count] = await Promise.all([
      db.notification.findMany({
        where,
        ...order(doc),
        ...pagination(doc),
      }),
      db.notification.count({ where }),
    ]);

    return { rows, count };
  }

  // Get unread count
  static async getUnreadCount(userId: string) {
    const count = await db.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });

    return { count };
  }

  // Mark all as read
  static async markAllAsRead(userId: string) {
    try {
      await db.notification.updateMany({
        where: {
          userId,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });

      return "All notifications marked as read";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}