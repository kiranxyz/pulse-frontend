import { createBrowserRouter } from "react-router";

import AppLayout from "./components/layout/AppLayout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import HomePage from "./pages/HomePage.tsx";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
    ],
  },
]);
