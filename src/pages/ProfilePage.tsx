import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthProvider";

export default function ProfilePage() {
  const { me, loading, refetch, logout } = useAuthContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState(me?.username || "");
  const [email, setEmail] = useState(me?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  if (loading) return <p>Loading profile...</p>;
  if (!me) return <p>You must be logged in to view your profile.</p>;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setAvatar(e.target.files[0]);
  };

  const handleSaveProfile = async () => {
    setStatus("Saving profile...");
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      if (newPassword) {
        if (!currentPassword) {
          setStatus("Current password is required to change password");
          return;
        }
        formData.append("password", newPassword);
        formData.append("currentPassword", currentPassword);
      }
      if (avatar) formData.append("avatar", avatar);

      const res = await fetch(
        `${import.meta.env.VITE_PULSE_BACKEND_API_URL}/api/profile`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        },
      );

      if (!res.ok) {
        const text = await res.text();
        setStatus(`Error saving profile: ${text}`);
        return;
      }

      setStatus("Profile updated!");
      setCurrentPassword("");
      setNewPassword("");
      await refetch();
    } catch (err: unknown) {
      setStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleDeleteProfile = async () => {
    if (!confirm("Are you sure you want to delete your profile?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_PULSE_BACKEND_API_URL}/api/profile`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) {
        const text = await res.text();
        alert(`Failed to delete profile: ${text}`);
        return;
      }

      alert("Profile deleted successfully!");
      await logout({ email: me.email || "", password: "" });
      navigate("/");
    } catch (err) {
      console.error("Delete profile error:", err);
      alert("An error occurred while deleting your profile.");
    }
  };

  return (
    <main className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      <section className="mb-4">
        <label className="mb-1 block font-medium">Username</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </section>

      <section className="mb-4">
        <label className="mb-1 block font-medium">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </section>

      <section className="mb-4">
        <label className="mb-1 block font-medium">Current Password</label>
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Required to change password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </section>

      <section className="mb-4">
        <label className="mb-1 block font-medium">New Password</label>
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Leave blank to keep current password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </section>

      <section className="mb-4">
        <label className="mb-1 block font-medium">Avatar</label>
        <input type="file" onChange={handleAvatarChange} />
      </section>

      <div className="flex gap-4">
        <button className="btn btn-primary mt-4" onClick={handleSaveProfile}>
          Save Profile
        </button>
        <button
          className="btn btn-outline btn-error mt-4"
          onClick={handleDeleteProfile}
        >
          Delete Profile
        </button>
      </div>

      {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
    </main>
  );
}
