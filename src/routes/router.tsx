import { Navigate, createBrowserRouter } from "react-router-dom";

import AdminLayout from "../components/admin/AdminLayout";
import AdminOverview from "../components/admin/AdminOverview";
import AdminEvents from "../components/dashboard/AdminEvents";
import CreateEventPage from "../components/dashboard/CreateEvent";
import EditEventPage from "../components/dashboard/EventEdit";
// Layouts
import AppLayout from "../components/layout/AppLayout";
<<<<<<< HEAD
import Payment from "../components/rsvp/Payment";
import Thanks from "../components/rsvp/Thanks";
import Ticket from "../components/rsvp/Ticket";
=======
>>>>>>> 477b8005b61a7dddf08ae8144054443d56f815e6
import ErrorPage from "../pages/ErrorPage";
import EventDetails from "../pages/EventDetails";
import EventsPage from "../pages/EventsPage";
// Pages
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
<<<<<<< HEAD
      { path: "/payment", element: <Payment /> },
      { path: "/thanks", element: <Thanks /> },
      { path: "/ticket", element: <Ticket /> },
=======
>>>>>>> 477b8005b61a7dddf08ae8144054443d56f815e6
    ],
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminOverview /> },
          { path: "dashboard/events", element: <AdminEvents /> },
          { path: "dashboard/create", element: <CreateEventPage /> },
          { path: "dashboard/edit/:id", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);
