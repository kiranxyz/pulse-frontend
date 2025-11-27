import { useState } from "react";

import { useAuth } from "../../lib/useAuth.ts";

interface LoginModalProps {
  close: () => void;
  openRegister: () => void;
}

export default function LoginModal({ close, openRegister }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState("");

  const { login, logout, session } = useAuth();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 6;
  const canSubmit = emailValid && passwordValid;

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setErrorMsg("");

    try {
      await login({ email, password });
      close();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setStatus("Signing out...");
    try {
      await logout({ email, password });
      setStatus("Signed out");
    } catch (err: unknown) {
      setStatus(
        err instanceof Error
          ? `Sign out error: ${err.message}`
          : `Sign out error: ${String(err)}`,
      );
    }
  };

  return (
    <dialog open className="modal">
      <article className="modal-box rounded-xl p-6">
        <header className="mb-4">
          <h2 className="text-lg font-bold">Login</h2>
          {session?.user && (
            <p className="mt-1 text-sm text-green-600">
              Logged in as <strong>{session.user.email}</strong>
            </p>
          )}
        </header>

        {errorMsg && (
          <p className="alert alert-error mb-3 py-2 text-sm">{errorMsg}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full rounded-lg border px-3 py-2 text-sm ${
                email
                  ? emailValid
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && !emailValid && (
              <p className="mt-1 text-xs text-red-600">Invalid email format</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full rounded-lg px-3 py-2 pr-10 text-sm ${
                  password
                    ? passwordValid
                      ? "border-green-500"
                      : "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 text-sm opacity-80"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            {password && !passwordValid && (
              <p className="mt-1 text-xs text-red-600">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-ghost rounded-lg"
              onClick={close}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary rounded-lg"
              disabled={loading || !canSubmit}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm">
          Don’t have an account yet?{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={openRegister}
          >
            Register
          </button>
        </p>

        <section className="mt-3 text-sm text-gray-600">{status}</section>

        {session?.user && (
          <button
            className="btn btn-error btn-sm mt-4 w-full rounded-lg"
            onClick={handleSignOut}
            type="button"
          >
            Sign out
          </button>
        )}
      </article>
    </dialog>
  );
}
