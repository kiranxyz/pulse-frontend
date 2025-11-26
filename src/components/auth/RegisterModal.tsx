import { useState } from "react";

import { useAuth } from "../../lib/useAuth.ts";

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

  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register({ email, password, username, title, address, role });
      close();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
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
