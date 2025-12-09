import { NavLink } from "react-router-dom";

import { NAV_LINKS } from "../../utils/navItems";

export default function DashboardSidebar({ role }: { role: string }) {
  return (
    <aside className="w-full flex-shrink-0 bg-gray-800 p-4 text-white md:w-64">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>

      <nav aria-label="Sidebar navigation">
        <ul className="flex flex-row gap-2 overflow-x-auto md:flex-col">
          {NAV_LINKS.filter((link) => link.roles.includes(role)).map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block rounded px-3 py-2 hover:underline ${
                    isActive ? "bg-gray-700 font-bold" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
