import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuthContext } from "../context/AuthProvider";

const LOCATIONS = [
  "Berlin, Germany",
  "London, UK",
  "New York, USA",
  "San Francisco, USA",
  "Paris, France",
  "Remote",
];

function passwordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
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
  const [age] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwdScore = passwordStrength(password);
  const canSubmit =
    Boolean(username.trim()) &&
    emailValid &&
    password.length >= 6 &&
    ageConfirmed;

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) return;

    setLoading(true);
    try {
      await register({ email, password, username, title, location, age, role });
      navigate("/");
    } catch (err: unknown) {
      console.error("Registration failed:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <header>
        <h1 className="mb-4 text-2xl font-bold">Create Your Account</h1>
      </header>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <fieldset className="space-y-4">
          <legend className="sr-only">Registration Form</legend>

          <div>
            <label htmlFor="title" className="mb-1 block font-medium">
              Title (Optional)
            </label>
            <input
              id="title"
              type="text"
              className="input w-full rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="username" className="mb-1 block font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="input w-full rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="mb-1 block font-medium">
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
            <label htmlFor="email" className="mb-1 block font-medium">
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
              {email ? (
                emailValid ? (
                  <span className="text-green-600">Valid email</span>
                ) : (
                  <span className="text-red-600">Invalid email</span>
                )
              ) : (
                <span className="text-gray-500">Enter your email</span>
              )}
            </p>
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block font-medium">
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
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm opacity-80"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-lg bg-gray-200">
              <div
                className={`h-full transition-all duration-200 ${pwdScore >= 4 ? "bg-green-500" : pwdScore >= 2 ? "bg-yellow-400" : "bg-red-500"}`}
                style={{ width: `${(pwdScore / 5) * 100}%` }}
              />
            </div>
            <p className="mt-1 text-xs">
              {password
                ? pwdScore >= 4
                  ? "Strong"
                  : pwdScore >= 2
                    ? "Medium"
                    : "Weak"
                : "—"}
            </p>
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block font-medium">
              Register As
            </label>
            <select
              id="role"
              className="select-bordered select w-full rounded-lg"
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
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mt-2 rounded-lg border bg-base-200 p-3">
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

        <footer className="mt-6">
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={!canSubmit || loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </footer>
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
