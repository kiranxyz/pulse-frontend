import { useEffect, useState } from "react";

import { useAuth } from "../../lib/useAuth";

interface RegisterModalProps {
  close: () => void;
  openLogin: () => void;
}

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
  return score; // 0..5
}

export default function RegisterModal({
  close,
  openLogin,
}: RegisterModalProps) {
  const { register } = useAuth();

  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<
    "participant" | "organizer" | "ticketchecker" | "admin"
  >("participant");
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [age] = useState("");

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwdScore = passwordStrength(password);
  const canSubmit =
    Boolean(username.trim()) &&
    emailValid &&
    password.length >= 6 &&
    ageConfirmed;

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!canSubmit) return;
    setLoading(true);

    try {
      await register({ email, password, username, title, location, age, role });
      close();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      aria-labelledby="register-modal-title"
    >
      <div
        className={`w-full max-w-md transform rounded-xl border border-white/20 bg-white/30 p-6 shadow-2xl backdrop-blur-lg transition-all duration-350 ease-out ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <header className="mb-4 flex items-center justify-between">
          <h3 id="register-modal-title" className="text-lg font-semibold">
            Create account
          </h3>
          <button
            onClick={close}
            className="text-sm opacity-80 hover:opacity-100"
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        {error && (
          <div className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium">
              Title (Optional)
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/20 px-3 py-2 text-sm"
              placeholder="e.g. Developer, Student"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium"
            >
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg border border-white/20 bg-white/20 px-3 py-2 text-sm"
              placeholder="Full name"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-1 block text-sm font-medium"
            >
              Location
            </label>
            <input
              id="location"
              list="locations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/20 px-3 py-2 text-sm"
              placeholder="City, Country or choose..."
            />
            <datalist id="locations">
              {LOCATIONS.map((l) => (
                <option key={l} value={l} />
              ))}
            </datalist>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-white/20 bg-white/20 px-3 py-2 text-sm"
              placeholder="you@example.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-white/20 bg-white/20 px-3 py-2 pr-10 text-sm"
                placeholder="Choose a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-sm opacity-80"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded bg-white/10">
                <div
                  style={{ width: `${(pwdScore / 5) * 100}%` }}
                  className={`h-full transition-all duration-200 ${pwdScore >= 4 ? "bg-green-400" : pwdScore >= 2 ? "bg-yellow-400" : "bg-red-400"}`}
                />
              </div>
              <div className="w-24 text-right text-xs">
                {password
                  ? pwdScore >= 4
                    ? "Strong"
                    : pwdScore >= 2
                      ? "Medium"
                      : "Weak"
                  : "—"}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium">
              Role
            </label>
            <select
              id="role"
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
              className="w-full rounded-lg border border-white/20 bg-white/20 px-3 py-2 text-sm"
            >
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
              <option value="ticketchecker">Participant</option>
              <option value="admin">Participant</option>
            </select>
          </div>

          <div className="bg-base-200 mt-2 rounded-lg border p-3">
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

          <div className="pt-2">
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition ${canSubmit ? "bg-indigo-600 text-white hover:bg-indigo-700" : "cursor-not-allowed bg-gray-300 text-gray-700"}`}
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </div>
        </form>

        <footer className="mt-4 text-center text-sm">
          <span className="mr-2">Already have an account?</span>
          <button
            type="button"
            className="text-indigo-700 underline"
            onClick={() => {
              close();
              openLogin();
            }}
          >
            Log in
          </button>
        </footer>
      </div>
    </dialog>
  );
}
