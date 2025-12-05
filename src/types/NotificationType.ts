export type NotificationType = {
  id: string;
  title: string;
  message: string;
  type: "email" | "registration" | "info" | "reminder";
  userId: string;
  isRead?: boolean;
};
