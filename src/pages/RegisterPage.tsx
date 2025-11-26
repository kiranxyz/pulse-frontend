import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthProvider";

export default function RegisterPage() {
  const { register } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [role] = useState("participant");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      await register({
        email,
        username,
        address,
        title,
        role,
        password,
      });
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed");
    }
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Register</h1>

      <input
        className="input mb-3 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input mb-3 w-full"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="input mb-3 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="input mb-3 w-full"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        className="input mb-3 w-full"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleRegister}>
        Register
      </button>
    </main>
  );
}
