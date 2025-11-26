import { Link } from "react-router-dom";

import { authClient } from "../../lib/auth-client";
import { useAuth } from "../../lib/useAuth.ts";
import { useSession } from "../../lib/useAuthSession";

interface HeaderProps {
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

export default function Header({
  openLoginModal,
  openRegisterModal,
}: HeaderProps) {
  const { data: session, isPending } = useSession();
  console.log("session in Header:", session);

  const handleLogout = async () => {
    await authClient.signOut();
  };
  const { me } = useAuth();

  return (
    <header className="bg-base-100 border-b">
      <nav
        className="mx-auto flex w-full max-w-6xl items-center justify-between p-4"
        aria-label="Main navigation"
      >
        <a
          href="/"
          className="text-xl font-bold text-indigo-700 hover:opacity-80"
          aria-label="Pulse homepage"
        >
          Pulse
        </a>

        {isPending && (
          <div
            role="status"
            aria-live="polite"
            className="loading loading-spinner loading-sm text-primary"
          >
            <span className="sr-only">Loading session…</span>
          </div>
        )}

        {session?.user ? (
          <div className="flex items-center gap-4">
            {me?.avatar && (
              <img
                src={`${import.meta.env.VITE_PULSE_BACKEND_API_URL}/uploads/${me.avatar}`}
                alt="User Avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <span className="text-base-content/80 text-sm">
              Welcome, <strong>{session.user.email}</strong>
            </span>
            <Link
              to="/profile"
              className="btn btn-outline btn-sm"
              aria-label="Go to profile"
            >
              Profile
            </Link>
            <button
              className="btn btn-error btn-sm"
              onClick={handleLogout}
              aria-label="Log out"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              className="btn btn-outline btn-sm"
              onClick={openRegisterModal}
              aria-label="Open registration modal"
            >
              Register
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={openLoginModal}
              aria-label="Open login modal"
            >
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
