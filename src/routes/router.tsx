import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../components/admin/AdminLayout";
import AdminOverview from "../components/admin/AdminOverview";
import AddEventPage from "../components/dashboard/AddEvent";
import AdminEvents from "../components/dashboard/AdminEvents";
import CheckInPage from "../components/dashboard/Checkin";
import CreateEventPage from "../components/dashboard/CreateEvent";
import EventDetailsPage from "../components/dashboard/EventDetails";
import EditEventPage from "../components/dashboard/EventEdit";
import EventsDashPage from "../components/dashboard/Events";
import SettingsPage from "../components/dashboard/Settings";
import UsersPage from "../components/dashboard/Users";
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
      { path: "/", element: <HomePage /> },
      { path: "/events", element: <EventsPage /> },
      { path: "/events/:id", element: <EventDetails /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      { path: "/payment", element: <Payment /> },
      { path: "/thanks", element: <Thanks /> },
      { path: "/ticket", element: <Ticket /> },

      {
        element: (
          <ProtectedRoute allowedRoles={["admin", "organizer"]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "/dashboard", element: <AdminOverview /> },
          { path: "/dashboard/events", element: <AdminEvents /> },
          { path: "/dashboard/create", element: <CreateEventPage /> },
          { path: "/dashboard/createevent", element: <AddEventPage /> },
          { path: "/dashboard/createevent/:id", element: <AddEventPage /> },
          { path: "/dashboard/edit/:id", element: <EditEventPage /> },
          { path: "/dashboard/events/:id", element: <EventDetailsPage /> },
          { path: "/dashboard/users", element: <UsersPage /> },
          { path: "/dashboard/settings", element: <SettingsPage /> },
        ],
      },
      {
        element: (
          <ProtectedRoute allowedRoles={["ticketchecker", "admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [{ path: "/checkin", element: <CheckInPage /> }],
      },
    ],
  },
]);
