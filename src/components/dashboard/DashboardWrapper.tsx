import { Navigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthProvider";
import AdminOverview from "../admin/AdminOverview";
import OrganizerOverview from "../dashboard/OrganizerOverview";
import TicketCheckerDashboard from "../dashboard/TicketCheckerDashboard";

export default function DashboardWrapper() {
  const { member } = useAuthContext();

  if (!member) return <Navigate to="/" replace />;

  switch (member.role) {
    case "admin":
      return <AdminOverview />;
    case "organizer":
      return <OrganizerOverview />;
    case "ticketchecker":
      return <TicketCheckerDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
}
