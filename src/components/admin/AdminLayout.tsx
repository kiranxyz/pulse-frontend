import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthContext } from "../../context/AuthProvider";

interface NavLink {
  label: string;
  path: string;
  roles: string[];
}

const NAV_LINKS: NavLink[] = [
  {
    label: "Overview",
    path: "/dashboard",
    roles: ["admin", "organizer", "ticketchecker"],
  },
  { label: "Events", path: "/dashboard/events", roles: ["admin", "organizer"] },
  { label: "Users", path: "/dashboard/users", roles: ["admin", "organizer"] },
  { label: "Settings", path: "/dashboard/settings", roles: ["admin"] },
];

const AdminLayout = () => {
  const location = useLocation();
  const { me } = useAuthContext();
  const role = me?.role;

  if (!role || !["admin", "organizer", "ticketchecker"].includes(role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full flex-shrink-0 bg-gray-800 p-4 text-white md:w-64">
        <header className="mb-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </header>
        <nav aria-label="Sidebar navigation">
          <ul className="flex flex-row gap-2 overflow-x-auto md:flex-col">
            {NAV_LINKS.filter((link) => link.roles.includes(role)).map(
              (link) => {
                const isActive =
                  location.pathname === link.path ||
                  location.pathname.startsWith(link.path + "/");

                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`block whitespace-nowrap rounded px-3 py-2 hover:underline ${
                        isActive ? "bg-gray-700 font-bold" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              },
            )}
          </ul>
        </nav>
      </aside>

      <main className="flex-grow bg-gray-100 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
