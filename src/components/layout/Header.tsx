import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/AuthProvider";

interface HeaderProps {
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

export default function Header({
  openLoginModal,
  openRegisterModal,
}: HeaderProps) {
  const { me, logout } = useAuthContext();

  const avatarSrc = me?.avatar
    ? `${import.meta.env.VITE_PULSE_BACKEND_API_URL}/uploads/${me.avatar}`
    : "";

  const role = me?.role?.toLowerCase() || "guest";

  const handleLogout = async () => {
    await logout({ email: me?.email || "", password: "" });
    window.location.href = "/";
  };

  const navItems = [
    {
      label: "Home",
      path: "/",
      roles: ["admin", "organizer", "ticketchecker", "participant", "guest"],
    },
    {
      label: "Events",
      path: "/events",
      roles: ["admin", "organizer", "participant", "guest"],
    },
    { label: "Dashboard", path: "/dashboard", roles: ["admin", "organizer"] },
    { label: "Check In", path: "/checkin", roles: ["ticketchecker", "admin"] },
    {
      label: "Profile",
      path: "/profile",
      roles: ["admin", "organizer", "ticketchecker", "participant"],
    },
    { label: "Register", path: "/register", roles: ["guest"] },
    { label: "Login", path: "/login", roles: ["guest"] },
  ];

  const visibleNav = navItems.filter((item) => item.roles.includes(role));

  return (
    <header className="bg-base-100 border-b">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 p-4">
        <Link
          to="/"
          className="text-xl font-bold text-indigo-700 hover:opacity-80"
        >
          Pulse
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {visibleNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="btn btn-ghost btn-sm"
            >
              {item.label}
            </Link>
          ))}

          {me ? (
            <>
              {avatarSrc && (
                <img
                  src={avatarSrc}
                  alt={`${me.username || "User"} Avatar`}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <button className="btn btn-error btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline btn-sm"
                onClick={openRegisterModal}
              >
                Register
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={openLoginModal}
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
