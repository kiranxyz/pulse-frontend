import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuthContext();
  const navigate = useNavigate();

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
      navigate("/");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>

      {errorMsg && (
        <p className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">
          {errorMsg}
        </p>
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
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm ${
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

        <button
          type="submit"
          className={`btn btn-primary w-full rounded-lg ${loading ? "loading" : ""}`}
          disabled={loading || !canSubmit}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don’t have an account yet?{" "}
        <a href="/register" className="text-blue-500 underline">
          Register
        </a>
      </p>
    </main>
  );
}
