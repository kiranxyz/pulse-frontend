import type { NotificationType } from "../../types/NotificationType";

const Notification = ({ notification }: { notification: NotificationType }) => {
  return <div>{notification.message}</div>;
};

export default Notification;
