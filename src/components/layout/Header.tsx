import { Link } from "react-router";

import { useAuthContext } from "../../context/AuthProvider";

interface HeaderProps {
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

export default function Header({
  openLoginModal,
  openRegisterModal,
}: HeaderProps) {
  const { member, logout } = useAuthContext();
  const maintenanceMode = localStorage.getItem("maintenanceMode") === "true";
  console.log(maintenanceMode);
  const isGuest = !member;
  const role = member?.role?.toLowerCase() || "";
  const base = import.meta.env.VITE_PULSE_BACKEND_API_URL;

  const avatarSrc = member?.avatar ? `${base}/uploads/${member.avatar}` : "";

  const handleLogout = async () => {
    await logout({ email: member?.email || "", password: "" });
    window.location.href = "/";
  };

  const navItems = [
    {
      label: "Home",
      path: "/",
      roles: ["guest", "participant", "admin", "organizer", "ticketchecker"],
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      roles: ["admin", "organizer", "ticketchecker"],
    },
    {
      label: "Profile",
      path: "/profile",
      roles: ["participant", "admin", "organizer", "ticketchecker"],
    },
    {
      label: "Events",
      path: "/events",
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
  ];

  const visibleNav = navItems.filter((item) =>
    isGuest ? item.roles.includes("guest") : item.roles.includes(role),
  );

  return (
    <header className="border-b bg-base-100">
      {maintenanceMode && (
        <span className="rounded bg-yellow-300 px-2 py-1 text-xs text-black">
          Maintenance Mode
        </span>
      )}
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 p-4">
        <Link
          to="/"
          className="text-xl font-bold text-indigo-700 hover:opacity-80"
        >
          Pulse
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {visibleNav.map((item) => {
            if (isGuest && item.label === "Register") {
              return (
                <button
                  key={item.path}
                  className="btn btn-outline btn-sm"
                  onClick={openRegisterModal}
                >
                  {item.label}
                </button>
              );
            }
            if (isGuest && item.label === "Login") {
              return (
                <button
                  key={item.path}
                  className="btn btn-primary btn-sm"
                  onClick={openLoginModal}
                >
                  {item.label}
                </button>
              );
            }
            if (item.label === "Dashboard" && role === "ticketchecker") {
              return (
                <Link
                  key={item.path}
                  to="/dashboard"
                  className="btn btn-ghost btn-sm"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className="btn btn-ghost btn-sm"
              >
                {item.label}
              </Link>
            );
          })}

          {!isGuest && (
            <>
              {avatarSrc && (
                <img
                  src={avatarSrc}
                  alt={`${member?.username || "User"} Avatar`}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <button className="btn btn-error btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
