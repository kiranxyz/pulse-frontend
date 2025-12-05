import { Link, Outlet, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthProvider";

export default function AppLayout() {
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

  const navItems = [
    {
      label: "Home",
      path: "/",
      roles: ["admin", "organizer", "ticketchecker", "participant"],
    },
    {
      label: "Events",
      path: "/events",
      roles: ["admin", "organizer", "participant"],
    },
    { label: "Dashboard", path: "/dashboard", roles: ["admin", "organizer"] },
    {
      label: "Profile",
      path: "/profile",
      roles: ["admin", "organizer", "ticketchecker", "participant"],
    },
    { label: "Check In", path: "/checkin", roles: ["admin", "ticketchecker"] },
    { label: "Register", path: "/register", roles: ["guest"] },
    { label: "Login", path: "/login", roles: ["guest"] },
  ];

  const role = me?.role || "guest";
  const visibleNav = navItems.filter((item) => item.roles.includes(role));

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex flex-col items-center justify-between gap-2 bg-gray-800 p-4 text-white sm:flex-row">
        <h1 className="text-xl font-bold">Pulse</h1>
        <nav className="flex flex-wrap gap-4">
          {loading ? (
            <span>Loading...</span>
          ) : (
            visibleNav.map((item) => (
              <Link key={item.path} to={item.path} className="hover:underline">
                {item.label}
              </Link>
            ))
          )}
          {role !== "guest" && (
            <button
              onClick={handleLogout}
              className="bg-transparent hover:underline"
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      <main className="flex-grow bg-gray-100 p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-800 p-4 text-center text-white">
        &copy; {new Date().getFullYear()} Pulse
      </footer>
    </div>
  );
}
