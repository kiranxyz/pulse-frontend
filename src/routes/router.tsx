import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import ErrorPage from "../pages/ErrorPage";
import EventsPage from "../pages/EventsPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/events", element: <EventsPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
]);
