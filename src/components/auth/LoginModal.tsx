import { useState } from "react";

import { authClient, useSession } from "../../lib/auth-client";

type Provider = "instagram" | "google" | "facebook";

interface LoginModalProps {
  close: () => void;
  openRegister: () => void;
}

export interface User {
  id?: string;
  email?: string;
  name?: string;
  [key: string]: string | number | boolean | undefined;
}

export default function LoginModal({ close, openRegister }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState("");
  const [me, setMe] = useState<User | null>(null);

  const { data: session, refetch: refetchSession } = useSession();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await authClient.signIn.email({ email, password });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message ?? "Login failed");
      return;
    }

    await refetchSession();
    close();
  };

  async function handleSocial(provider: Provider) {
    setStatus(`Starting ${provider} sign in...`);
    try {
      await authClient.signIn.social({ provider });
      setStatus(`Redirecting to ${provider}...`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus(`Social sign in error: ${err.message}`);
      } else {
        setStatus(`Social sign in error: ${String(err)}`);
      }
    }
  }

  async function handleSignOut() {
    setStatus("Signing out...");
    try {
      await authClient.signOut();
      setMe(null);
      await refetchSession();
      setStatus("Signed out");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus(`Sign out error: ${err.message}`);
      } else {
        setStatus(`Sign out error: ${String(err)}`);
      }
    }
  }

  return (
    <dialog open className="modal">
      <article className="modal-box">
        <header>
          <h2 className="text-lg font-bold">Login</h2>
          {session?.user && (
            <p className="mt-1 text-sm text-green-600">
              Logged in as <strong>{session.user.email}</strong>
            </p>
          )}
        </header>

        {errorMsg && (
          <p className="alert alert-error mt-3 py-2 text-sm">{errorMsg}</p>
        )}

        <section>
          <form onSubmit={handleLogin}>
            <fieldset className="form-control mt-4">
              <legend className="font-medium">Email</legend>
              <input
                type="email"
                className="input input-bordered mt-1 w-full"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            <fieldset className="form-control mt-4">
              <legend className="font-medium">Password</legend>
              <input
                type="password"
                className="input input-bordered mt-1 w-full"
                placeholder="Enter your password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            <footer className="modal-action flex justify-end gap-2">
              <button type="button" className="btn btn-ghost" onClick={close}>
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </footer>
          </form>
        </section>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <button
            className="text-blue-500 underline"
            onClick={openRegister}
            type="button"
          >
            Register
          </button>
        </p>

        <section className="mt-4 flex flex-col gap-2">
          <button
            className="btn btn-outline btn-info"
            onClick={() => handleSocial("instagram")}
            type="button"
          >
            Continue with Instagram
          </button>

          <button
            className="btn btn-outline btn-primary"
            onClick={() => handleSocial("google")}
            type="button"
          >
            Continue with Google
          </button>

          <button
            className="btn btn-outline btn-secondary"
            onClick={() => handleSocial("facebook")}
            type="button"
          >
            Continue with Facebook
          </button>
        </section>

        <section className="mt-3 text-sm text-gray-600">
          {status}
          {me && (
            <pre className="mt-2 rounded bg-gray-100 p-2">
              {JSON.stringify(me, null, 2)}
            </pre>
          )}
        </section>

        {session?.user && (
          <button
            className="btn btn-error btn-sm mt-4 w-full"
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
