import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 text-white">
        <h2 className="mb-4 text-xl font-bold">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <Link
            to="/admin/dashboard"
            className={`hover:underline ${location.pathname === "/admin/dashboard" ? "font-bold" : ""}`}
          >
            Overview
          </Link>
          <Link
            to="/admin/dashboard/events"
            className={`hover:underline ${location.pathname.includes("/events") ? "font-bold" : ""}`}
          >
            Events
          </Link>
          <Link
            to="/admin/dashboard/checkin"
            className={`hover:underline ${location.pathname.includes("/checkin") ? "font-bold" : ""}`}
          >
            Check In
          </Link>
          <Link
            to="/admin/dashboard/settings"
            className={`hover:underline ${location.pathname.includes("/settings") ? "font-bold" : ""}`}
          >
            Settings
          </Link>
        </nav>
      </aside>

      <main className="flex-grow bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
