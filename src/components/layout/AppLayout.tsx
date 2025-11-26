import { Link, Outlet, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthProvider";

export default function AppLayout() {
  const { me, logout } = useAuthContext();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout({ email: me?.email || "", password: "" });
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <>
      <nav className="flex justify-between bg-gray-100 p-4 shadow">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">
            Pulse
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!me && (
            <>
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </>
          )}

          {me && (
            <div className="flex items-center gap-3">
              {me.avatar ? (
                <img
                  src={`${import.meta.env.VITE_PULSE_BACKEND_API_URL}/uploads/${me.avatar}`}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm text-white">
                  {me.username?.[0].toUpperCase()}
                </div>
              )}

              <span className="text-gray-700">Hi, {me.username}</span>

              <Link to="/profile" className="text-blue-600">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="rounded bg-purple-900 px-3 py-1 text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
}
