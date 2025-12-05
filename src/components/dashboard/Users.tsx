import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "participant" | "organizer" | "ticket checker" | "admin";
  events?: string[];
  active?: boolean;
}

const MOCK_USERS: User[] = [
  {
    _id: "1",
    name: "Max Mustermann",
    email: "max.mustermann@example.com",
    role: "participant",
    events: ["Berlin AI Workshop", "Hamburg Startup Night"],
    active: true,
  },
  {
    _id: "2",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    role: "organizer",
    events: ["Tech Fusion Summit", "Berlin AI Workshop"],
    active: true,
  },
  {
    _id: "3",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@example.com",
    role: "ticket checker",
    events: ["Frankfurt Fintech Workshop"],
    active: true,
  },
  {
    _id: "4",
    name: "Akshay Kumar",
    email: "akshay.kumar@example.com",
    role: "participant",
    events: ["Cologne Marketing Summit"],
    active: true,
  },
  {
    _id: "5",
    name: "Carlos García",
    email: "carlos.garcia@example.com",
    role: "organizer",
    events: ["Munich Tech Conference 2025"],
    active: true,
  },
];

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 500);
  }, []);

  const handleEdit = (user: User) => {
    const newName = prompt("Edit name:", user.name);
    if (newName) {
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, name: newName } : u)),
      );
    }
  };

  const handleDeactivate = (user: User) => {
    if (window.confirm(`Are you sure you want to deactivate ${user.name}?`)) {
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, active: false } : u)),
      );
    }
  };

  if (loading) return <p className="p-6 text-center">Loading users...</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Users</h1>

      <div className="overflow-x-auto rounded-xl bg-white shadow-lg">
        <table className="table w-full border-collapse">
          <thead className="bg-gray-100 text-lg font-semibold">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Events</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className={`transition-colors duration-200 hover:bg-gray-50 ${
                  user.active === false ? "opacity-50" : ""
                }`}
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">{user.events?.join(", ") || "-"}</td>
                <td className="px-4 py-2">
                  {user.active ? "Active" : "Deactivated"}
                </td>
                <td className="flex gap-2 px-4 py-2">
                  <button
                    className="btn btn-sm btn-outline transition-all hover:bg-gray-100"
                    onClick={() => handleEdit(user)}
                    disabled={!user.active}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error transition-all hover:brightness-110"
                    onClick={() => handleDeactivate(user)}
                    disabled={!user.active}
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default UsersPage;
