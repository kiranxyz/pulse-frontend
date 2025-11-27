import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import AppLayout from "../components/layout/AppLayout";
import AdminLayout from "../components/admin/AdminLayout";

// Pages
import HomePage from "../pages/HomePage";
import EventsPage from "../pages/EventsPage";
import AdminOverview from "../components/admin/AdminOverview";
import AdminEvents from "../components/dashboard/AdminEvents";
import CreateEventPage from "../components/dashboard/CreateEvent";
import EditEventPage from "../components/dashboard/EventEdit";
import ErrorPage from "../pages/ErrorPage";
import EventDetails from "../pages/EventDetails";

export const router = createBrowserRouter([
  {
    element: <AppLayout />, 
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/events", element: <EventsPage /> },
      { path: "/events/:id", element: <EventDetails /> }, 
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