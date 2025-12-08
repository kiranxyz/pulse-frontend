import { useEffect, useState } from "react";

import { useAuthContext } from "../context/AuthProvider";

export default function ProfilePage() {
  const { member, loading, refetch } = useAuthContext();
  const baseUrl = import.meta.env.VITE_PULSE_BACKEND_API_URL;

  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [status, setStatus] = useState("");

  const passwordStrength = (pwd: string) => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[a-z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };

  const pwdStrong = passwordStrength(newPassword) >= 4;

  useEffect(() => {
    if (!member) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsername(member.username || "");
    if (member.avatar) setPreviewAvatar(`${baseUrl}/uploads/${member.avatar}`);
  }, [member]);

  if (loading) return <p>Loading profile...</p>;
  if (!member) return <p>You must be logged in to view your profile.</p>;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewAvatar.startsWith("blob:")) URL.revokeObjectURL(previewAvatar);

    setAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    if (newPassword && !pwdStrong) {
      setStatus(
        "New password is weak. Minimum 8 chars with uppercase, lowercase, number and symbol.",
      );
      return;
    }

    if (newPassword && !currentPassword) {
      setStatus("Current password is required to change password");
      return;
    }

    setStatus("Saving profile...");

    try {
      const formData = new FormData();
      formData.append("username", username);
      if (newPassword) {
        formData.append("password", newPassword);
        formData.append("currentPassword", currentPassword);
      }
      if (avatar) formData.append("avatar", avatar);

      const res = await fetch(`${baseUrl}/api/profile`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        setStatus(`Error saving profile: ${text}`);
        return;
      }

      const data = await res.json();

      if (data.avatar) setPreviewAvatar(`${baseUrl}/uploads/${data.avatar}`);

      setStatus("Profile updated!");
      setAvatar(null);
      setCurrentPassword("");
      setNewPassword("");
      await refetch();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setStatus(`Error: ${msg}`);
    }
  };

  return (
    <main className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      {previewAvatar && (
        <img
          src={previewAvatar}
          alt="Avatar"
          className="mb-4 h-20 w-20 rounded-full object-cover"
        />
      )}

      <div className="mb-4">
        <label className="mb-1 block font-medium">Username</label>
        <input
          type="text"
          className="input input-bordered w-full rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block font-medium">Current Password</label>
        <input
          type="password"
          className="input input-bordered w-full rounded-lg"
          placeholder="Required to change password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block font-medium">New Password</label>
        <input
          type="password"
          className={`input input-bordered w-full rounded-lg ${
            newPassword && !pwdStrong ? "border-red-500" : ""
          }`}
          placeholder="Leave blank to keep current password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block font-medium">Avatar</label>
        <input type="file" onChange={handleAvatarChange} />
      </div>

      <button
        className="btn btn-primary mt-4 rounded-lg"
        onClick={handleSaveProfile}
      >
        Save Profile
      </button>

      {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
    </main>
  );
}
