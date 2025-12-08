import type { NotificationType } from "../../types/NotificationType";
import Notification from "./Notification";

const Notifications = ({
  notifications,
}: {
  notifications: NotificationType[];
}) => {
  return (
    <div>
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default Notifications;
