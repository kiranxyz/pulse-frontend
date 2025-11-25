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

          {me && (
            <Link to="/profile" className="text-blue-600">
              Profile
            </Link>
          )}
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
            <>
              <span className="text-gray-700">{`Hi, ${me.email}`}</span>
              <button
                onClick={handleLogout}
                className="rounded bg-violet-900 px-3 py-1 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
}
