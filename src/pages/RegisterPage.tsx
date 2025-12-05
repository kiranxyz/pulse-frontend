import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthProvider";

const LOCATIONS = [
  "Berlin, Germany",
  "London, UK",
  "New York, USA",
  "San Francisco, USA",
  "Paris, France",
  "Remote",
];

function passwordStrength(pwd: string) {
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[a-z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return s;
}

export default function RegisterPage() {
  const { register } = useAuthContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<
    "participant" | "organizer" | "ticketchecker" | "admin"
  >("participant");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwdScore = passwordStrength(password);

  const canSubmit =
    username.trim() && emailValid && password.length >= 6 && ageConfirmed;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      await register({
        email,
        password,
        username,
        title,
        location,
        age: "",
        role,
      });
      navigate("/");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Create Your Account</h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <fieldset className="space-y-4">
          <legend className="sr-only">Registration Form</legend>

          <div>
            <label className="mb-1 block font-medium" htmlFor="title">
              Title (Optional)
            </label>
            <input
              id="title"
              className="input w-full rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="input w-full rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              list="locations"
              className="input w-full rounded-lg"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <datalist id="locations">
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="mb-1 block font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="input w-full rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <p className="mt-1 text-xs">
              {!email ? (
                "Enter your email"
              ) : emailValid ? (
                <span className="text-green-600">Valid email</span>
              ) : (
                <span className="text-red-600">Invalid email</span>
              )}
            </p>
          </div>

          <div>
            <label className="mb-1 block font-medium" htmlFor="password">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input w-full rounded-lg pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-sm opacity-80"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            <div className="mt-1 h-2 w-full overflow-hidden rounded-lg bg-gray-200">
              <div
                className={
                  "h-full transition-all duration-200 " +
                  (pwdScore >= 4
                    ? "bg-green-500"
                    : pwdScore >= 2
                      ? "bg-yellow-400"
                      : "bg-red-500")
                }
                style={{ width: `${(pwdScore / 5) * 100}%` }}
              />
            </div>

            <p className="mt-1 text-xs">
              {!password
                ? "—"
                : pwdScore >= 4
                  ? "Strong"
                  : pwdScore >= 2
                    ? "Medium"
                    : "Weak"}
            </p>
          </div>

          <div>
            <label className="mb-1 block font-medium" htmlFor="role">
              Register As
            </label>
            <select
              id="role"
              className="select select-bordered w-full rounded-lg"
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value as
                    | "participant"
                    | "organizer"
                    | "ticketchecker"
                    | "admin",
                )
              }
            >
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
              <option value="ticketchecker">Ticket Checker</option>
            </select>
          </div>

          <div className="bg-base-200 rounded-lg border p-3">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                required
              />
              <span className="text-sm font-medium">
                I am <strong>18 years of age or older</strong>.
              </span>
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className={`btn btn-primary mt-6 w-full ${loading ? "loading" : ""}`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 underline">
          Login
        </a>
      </p>
    </main>
  );
}
