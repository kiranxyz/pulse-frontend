import React from "react";
import { Outlet, Link } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Pulse App</h1>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/events" className="hover:underline">Events</Link>
          <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
        </nav>
      </header>

      
      <main className="flex-grow bg-gray-100 p-6">
        <Outlet /> {/* Render child pages */}
      </main>

      
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} Pulse App
      </footer>
    </div>
  );
};

export default AppLayout;
