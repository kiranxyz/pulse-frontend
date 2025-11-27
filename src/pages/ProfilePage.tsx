import { useEffect, useState } from "react";

import { useAuthContext } from "../context/AuthProvider";

export default function ProfilePage() {
  const { me, loading, refetch } = useAuthContext();

  const [username, setUsername] = useState(me?.username || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string>(
    me?.avatar
      ? `${import.meta.env.VITE_PULSE_BACKEND_API_URL}/uploads/${me.avatar}`
      : "",
  );
  const [status, setStatus] = useState("");

  const passwordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const pwdStrong = passwordStrength(newPassword) >= 4;

  // Keep preview avatar in sync
  useEffect(() => {
    if (me?.avatar) {
      setPreviewAvatar(
        `${import.meta.env.VITE_PULSE_BACKEND_API_URL}/uploads/${me.avatar}`,
      );
    }
    setUsername(me?.username || "");
  }, [me]);

  if (loading) return <p>Loading profile...</p>;
  if (!me) return <p>You must be logged in to view your profile.</p>;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewAvatar && previewAvatar.startsWith("blob:")) {
      URL.revokeObjectURL(previewAvatar);
    }

    setAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    if (newPassword && !pwdStrong)
      return setStatus(
        "New password is weak. Minimum 8 chars, include uppercase, lowercase, number & symbol.",
      );

    setStatus("Saving profile...");

    try {
      const formData = new FormData();
      formData.append("username", username);

      if (newPassword) {
        if (!currentPassword)
          return setStatus("Current password is required to change password");
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

      const updated = await res.json();

      if (updated.avatar) {
        setPreviewAvatar(
          `${import.meta.env.VITE_PULSE_BACKEND_API_URL}/uploads/${updated.avatar}`,
        );
      }

      setStatus("Profile updated!");
      setAvatar(null);
      setCurrentPassword("");
      setNewPassword("");
      await refetch();
    } catch (err: unknown) {
      setStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <main className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      {previewAvatar && (
        <div className="mb-4">
          <img
            src={previewAvatar}
            alt="Avatar"
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>
      )}

      <section className="mb-4">
        <label className="mb-1 block font-medium">Username</label>
        <input
          type="text"
          className="input input-bordered w-full rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </section>

      <section className="mb-4">
        <label className="mb-1 block font-medium">Current Password</label>
        <input
          type="password"
          className="input input-bordered w-full rounded-lg"
          placeholder="Required to change password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </section>

      <section className="mb-4">
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
      </section>

      <section className="mb-4">
        <label className="mb-1 block font-medium">Avatar</label>
        <input type="file" onChange={handleAvatarChange} />
      </section>

      <div className="flex gap-4">
        <button
          className="btn btn-primary mt-4 rounded-lg"
          onClick={handleSaveProfile}
        >
          Save Profile
        </button>
      </div>

      {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
    </main>
  );
}
