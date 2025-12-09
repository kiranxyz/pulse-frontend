import { useEffect, useState } from "react";

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  events?: string[];
  active?: boolean;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const base = import.meta.env.VITE_PULSE_BACKEND_API_URL || "/api";

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`${base}/admin/users`, {
          credentials: "include",
        });
        const data = await res.json();
        if (mounted) setUsers(data);
      } catch {
        if (mounted) setUsers([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [base]);

  const toggleActive = async (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, active: !u.active } : u)),
    );
    try {
      await fetch(`${base}/admin/users/${id}/toggle`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // handle error
    }
  };

  if (loading) return <main className="p-4">Loading users…</main>;

  return (
    <main className="p-4">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Users</h1>
      </header>

      <section className="overflow-auto rounded-lg bg-white shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Events</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className={u.active === false ? "opacity-60" : ""}
              >
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td>{u.events?.join(", ") || "-"}</td>
                <td>{u.active ? "Active" : "Deactivated"}</td>
                <td className="flex gap-2">
                  <button
                    className={`btn btn-sm ${
                      u.active
                        ? "btn-outline btn-error" // red outline for deactivate
                        : "btn-outline btn-success" // green outline for activate
                    }`}
                    onClick={() => toggleActive(u._id)}
                  >
                    {u.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  No users
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
