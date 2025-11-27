import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./pages/AdminHome";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import CreateEvent from "./components/dashboard/CreateEvent";
import EventEdit from "./components/dashboard/EventEdit";
import HomePage from "./pages/HomePage";
import EventDetails from "./pages/EventDetails";
import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events/create" element={<CreateEvent />} />
        <Route path="/admin/events/:id/edit" element={<EventEdit />} />

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}
