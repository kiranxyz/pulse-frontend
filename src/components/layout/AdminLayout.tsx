import { motion } from "framer-motion";
import {
  Calendar,
  CheckSquare,
  Home,
  Menu,
  Settings,
  UserCog,
  Users,
} from "lucide-react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthContext } from "../../context/AuthProvider";

interface NavLink {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: string[];
  group: "General" | "Admin" | "Organizer" | "Checkers";
}

const NAV_LINKS: NavLink[] = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: Home,
    roles: ["admin", "organizer", "ticketchecker"],
    group: "General",
  },

  {
    label: "Users",
    path: "/dashboard/users",
    icon: Users,
    roles: ["admin"],
    group: "Admin",
  },
  {
    label: "Events",
    path: "/dashboard/events",
    icon: Calendar,
    roles: ["admin"],
    group: "Admin",
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
    roles: ["admin"],
    group: "Admin",
  },
  {
    label: "Manage Checkers",
    path: "/dashboard/checkers",
    icon: UserCog,
    roles: ["admin", "organizer"],
    group: "Organizer",
  },

  {
    label: "Manage Users",
    path: "/dashboard/orgusers",
    icon: UserCog,
    roles: ["admin", "organizer"],
    group: "Organizer",
  },
  {
    label: "Manage Events",
    path: "/dashboard/orgevents",
    icon: Calendar,
    roles: ["admin", "organizer"],
    group: "Organizer",
  },

  {
    label: "Checker Dashboard",
    path: "/dashboard/checker",
    icon: CheckSquare,
    roles: ["admin"],
    group: "Checkers",
  },
  {
    label: "Check-In",
    path: "/dashboard/checkin",
    icon: CheckSquare,
    roles: ["ticketchecker", "admin"],
    group: "Checkers",
  },
];

export default function AdminLayout() {
  const location = useLocation();
  const { member, logout } = useAuthContext();
  const role = member?.role;

  if (!role || !["admin", "organizer", "ticketchecker"].includes(role)) {
    return <Navigate to="/" replace />;
  }

  const filteredGroups = ["General", "Admin", "Organizer", "Checkers"]
    .map((group) => ({
      group,
      links: NAV_LINKS.filter(
        (l) => l.group === group && l.roles.includes(role),
      ),
    }))
    .filter((g) => g.links.length > 0);

  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer-dashboard" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="bg-base-100 flex items-center justify-between p-4 shadow lg:hidden">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <label htmlFor="drawer-dashboard" className="btn btn-primary btn-sm">
            <Menu />
          </label>
        </div>

        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="drawer-dashboard" className="drawer-overlay"></label>

        <motion.aside
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 140 }}
          className="bg-base-200 flex w-72 flex-col p-4"
        >
          <div className="bg-base-300 mb-4 rounded p-4">
            <p className="font-bold">{member?.username || "User"}</p>
            <p className="text-sm capitalize opacity-70">{role}</p>
          </div>

          <nav className="flex-1 overflow-y-auto">
            {filteredGroups.map(({ group, links }) => (
              <div key={group} className="mb-4">
                <h2 className="mb-2 px-2 text-sm font-semibold opacity-70">
                  {group}
                </h2>
                <ul className="menu">
                  {links.map((link) => {
                    const isActive =
                      location.pathname === link.path ||
                      location.pathname.startsWith(link.path + "/");

                    return (
                      <li key={link.path}>
                        <Link
                          className={isActive ? "active font-semibold" : ""}
                          to={link.path}
                        >
                          <link.icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <button onClick={logout} className="btn btn-error mt-auto">
            Logout
          </button>
        </motion.aside>
      </div>
    </div>
  );
}
