import React from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAuthContext } from "../../context/AuthProvider";

const AppLayout: React.FC = () => {
  const { me, loading, logout } = useAuthContext();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout({ email: me?.email || "", password: "" });
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        theme="colored"
      />
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
          <h1 className="text-xl font-bold">Pulse App</h1>
          <nav className="flex gap-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>

            {loading && <span>Loading...</span>}

            {(!loading && me && me.role === "admin") ||
            me?.role === "organizer" ? (
              <>
                <Link to="/profile" className="hover:underline">
                  <FaUserCircle size={20} />
                  Profile
                </Link>
                <Link to="/admin/dashboard" className="hover:underline">
                  <MdOutlineDashboard size={20} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-transparent hover:underline"
                >
                  <span>Welcome, {me && me.username}!</span>
                  <FaSignOutAlt size={20} />
                  Logout
                </button>
              </>
            ) : me?.role === "participant" ? (
              <>
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
                <Link to="/events" className="hover:underline">
                  My Events
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-transparent hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="hover:underline">
                  <FaUser size={20} />
                  Register
                </Link>
                <Link to="/login" className="hover:underline">
                  <FaSignInAlt size={20} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </header>

        <main className="grow bg-gray-100 p-6">
          <Outlet /> {/* Render child pages */}
        </main>

        <footer className="bg-gray-800 p-4 text-center text-white">
          &copy; {new Date().getFullYear()} Pulse App
        </footer>
      </div>
    </>
  );
};

export default AppLayout;
