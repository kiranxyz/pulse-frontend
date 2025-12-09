import { createBrowserRouter } from "react-router";

import AdminOverview from "../components/admin/AdminOverview";
import AddEventPage from "../components/dashboard/AddEvent";
import CheckInPage from "../components/dashboard/Checkin";
import CreateEventPage from "../components/dashboard/CreateEvent";
import DashboardWrapper from "../components/dashboard/DashboardWrapper";
import EventDetailsPage from "../components/dashboard/EventDetails";
import EditEventPage from "../components/dashboard/EventEdit";
import MyEvents from "../components/dashboard/MyEvents";
import OrganizerCheckersPage from "../components/dashboard/OrganizerCheckersPage";
import OrganizerDashboard from "../components/dashboard/OrganizerDashboard";
import OrganizerEventsPage from "../components/dashboard/OrganizerEventsPage";
import OrganizerUsersPage from "../components/dashboard/OrganizerUsersPage";
import SettingsPage from "../components/dashboard/Settings";
import TicketCheckerDashboard from "../components/dashboard/TicketCheckerDashboard";
import UsersPage from "../components/dashboard/Users";
import AdminLayout from "../components/layout/AdminLayout";
import AppLayout from "../components/layout/AppLayout";
import Payment from "../components/rsvp/Payment";
import Thanks from "../components/rsvp/Thanks";
import Ticket from "../components/rsvp/Ticket";
import ErrorPage from "../pages/ErrorPage";
import EventDetails from "../pages/EventDetails";
import EventsPage from "../pages/EventsPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Public pages
      { path: "/", element: <HomePage /> },
      { path: "/events", element: <EventsPage /> },
      { path: "/events/:id", element: <EventDetails /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/payment", element: <Payment /> },
      { path: "/thanks", element: <Thanks /> },
      { path: "/ticket", element: <Ticket /> },

      // Protected profile
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },

      // Admin & Organizer routes
      {
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "organizer", "ticketchecker"]}
          >
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "/dashboard", element: <DashboardWrapper /> },
          { path: "/dashboard/events", element: <MyEvents /> },
          { path: "/dashboard/users", element: <UsersPage /> },

          { path: "/dashboard/create", element: <CreateEventPage /> },
          { path: "/dashboard/createevent", element: <AddEventPage /> },
          { path: "/dashboard/createevent/:id", element: <AddEventPage /> },
          { path: "/dashboard/edit/:id", element: <EditEventPage /> },
          { path: "/dashboard/events/:id", element: <EventDetailsPage /> },

          // Admin-only
          {
            path: "/dashboard/settings",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <SettingsPage />
              </ProtectedRoute>
            ),
          },

          // Organizer-only
          {
            path: "/dashboard",
            element: <OrganizerDashboard />,
          },

          { path: "/dashboard/orgevents", element: <OrganizerEventsPage /> },
          { path: "/dashboard/orgusers", element: <OrganizerUsersPage /> },
          {
            path: "/dashboard/checkers",
            element: <OrganizerCheckersPage />,
          },
          {
            path: "/dashboard/checker",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <TicketCheckerDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/checkin",
            element: (
              <ProtectedRoute allowedRoles={["ticketchecker", "admin"]}>
                <CheckInPage />
              </ProtectedRoute>
            ),
          },
        ],
      },

      // TicketChecker routes
      {
        element: (
          <ProtectedRoute allowedRoles={["ticketchecker", "admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "/dashboard", element: <AdminOverview /> },

          { path: "/dashboard/checkin", element: <CheckInPage /> },
          {
            path: "/dashboard/checker",
            element: <TicketCheckerDashboard />,
          },
        ],
      },
    ],
  },
]);
