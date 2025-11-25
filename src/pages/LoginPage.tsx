import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      alert(
        "Login failed: " + (err instanceof Error ? err.message : String(err)),
      );
    }
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>

      <input
        className="input mb-3 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input mb-3 w-full"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </main>
  );
}
