// Notification interfaces

// Create notification
export interface INotificationCreate {
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
}

// Get notification list
export interface INotificationGetList {
  userId?: string;
  type?: string;
  isRead?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Mark as read
export interface INotificationMarkAsRead {
  id: string;
}

// Delete notification
export interface INotificationDelete {
  id: string;
}