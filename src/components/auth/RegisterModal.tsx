import { useState } from "react";

import { authClient } from "../../lib/auth-client";

interface RegisterModalProps {
  close: () => void;
  openLogin: () => void;
}

export default function RegisterModal({
  close,
  openLogin,
}: RegisterModalProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [role, setRole] = useState<"participant" | "organizer">("participant");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: signupError } = await authClient.signUp.email({
        email,
        password,
        name: username,
      });

      if (signupError) {
        setError(signupError.message ?? "Registration failed");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:8080/api/users/profile", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, address, title, role }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(`Failed to save profile: ${text}`);
        setLoading(false);
        return;
      }

      setLoading(false);
      close();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  };

  return (
    <dialog open className="modal">
      <article className="modal-box">
        <header>
          <h2 className="text-lg font-bold">Create Account</h2>
        </header>

        {error && (
          <p className="alert alert-error mt-3 py-2 text-sm">{error}</p>
        )}

        <section>
          <form onSubmit={handleRegister}>
            <fieldset className="form-control mt-4">
              <legend className="font-medium">Username</legend>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered mt-1 w-full"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </fieldset>
            <fieldset className="form-control mt-4">
              <legend className="font-medium">Title</legend>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered mt-1 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </fieldset>
            ´{" "}
            <fieldset className="form-control mt-4">
              <legend className="font-medium">Address</legend>
              <input
                type="text"
                placeholder="Address"
                className="input input-bordered mt-1 w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </fieldset>
            <fieldset className="form-control mt-4">
              <legend className="font-medium">Email</legend>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered mt-1 w-full"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="form-control mt-4">
              <legend className="font-medium">Password</legend>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered mt-1 w-full"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <fieldset className="form-control mt-4">
              <legend className="font-medium">Role</legend>
              <select
                className="select select-bordered mt-1 w-full"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "participant" | "organizer")
                }
              >
                <option value="participant">Participant</option>
                <option value="organizer">Organizer</option>
              </select>
            </fieldset>
            <footer className="modal-action mt-6 flex justify-end gap-2">
              <button type="button" className="btn btn-ghost" onClick={close}>
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Creating..." : "Register"}
              </button>
            </footer>
          </form>
        </section>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={openLogin}
          >
            Login
          </button>
        </p>
      </article>
    </dialog>
  );
}
