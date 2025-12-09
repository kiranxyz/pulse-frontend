import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthProvider";

export default function AppLayout() {
  const { member, loading, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout({ email: member?.email || "", password: "" });
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const NAV_ITEMS = [
    {
      label: "Home",
      path: "/",
      roles: ["guest", "participant", "admin", "organizer", "ticketchecker"],
    },
    {
      label: "Register",
      path: "/register",
      roles: ["guest"],
    },
    {
      label: "Login",
      path: "/login",
      roles: ["guest"],
    },
    {
      label: "Profile",
      path: "/profile",
      roles: ["participant", "admin", "organizer", "ticketchecker"],
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      roles: ["admin", "organizer", "ticketchecker"],
    },
  ];
  const role = member?.role || "guest";
  const visibleNav = NAV_ITEMS.filter((item) =>
    item.roles.includes(
      role as "admin" | "organizer" | "ticketchecker" | "participant",
    ),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex flex-col items-center justify-between gap-2 bg-gray-800 p-4 text-white sm:flex-row">
        <h1 className="text-xl font-bold">Pulse</h1>
        <nav className="flex flex-wrap gap-4">
          {loading ? (
            <span>Loading...</span>
          ) : (
            visibleNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "underline" : "hover:underline"
                }
              >
                {item.label}
              </NavLink>
            ))
          )}
          {member && (
            <button
              onClick={handleLogout}
              className="bg-transparent hover:underline"
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      <main className="grow bg-gray-100 p-4">
        <Outlet /> {/* Render child pages */}
      </main>

      <footer className="bg-gray-800 p-4 text-center text-white">
        &copy; {new Date().getFullYear()} Pulse
      </footer>
    </div>
  );
}
