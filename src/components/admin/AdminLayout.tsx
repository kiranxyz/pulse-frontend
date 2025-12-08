import React from "react";
<<<<<<< HEAD
import { Outlet, Link, useLocation } from "react-router";
=======
import { Outlet, Link, useLocation } from "react-router-dom";
>>>>>>> 373e4acaf322a3f9cf590ac294066775ef2e96bf

const AdminLayout: React.FC = () => {
  const location = useLocation();

  return (

   

    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
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

<<<<<<< HEAD
      <main className="grow bg-gray-100 p-6">
        <Outlet />
=======
      
      <main className="grow p-6 bg-gray-100">
        <Outlet /> 
>>>>>>> 373e4acaf322a3f9cf590ac294066775ef2e96bf
      </main>
    </div>
  );
};

export default AdminLayout;
