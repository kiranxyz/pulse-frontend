import { useEffect, useState } from "react";

type EventOption = {
  _id: string;
  title: string;
};

type Checker = {
  _id: string;
  name: string;
  email: string;
  events: EventOption[];
  ticketsScanned: number;
  lastScan?: string;
  active: boolean;
};

export default function OrganizerCheckersPage() {
  const base = import.meta.env.VITE_PULSE_BACKEND_API_URL;

  const [checkers, setCheckers] = useState<Checker[]>([]);
  const [events, setEvents] = useState<EventOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newChecker, setNewChecker] = useState({
    name: "",
    email: "",
    events: [] as string[],
  });

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const [checkerRes, eventRes] = await Promise.all([
          fetch(`${base}/organizer/checkers`, { credentials: "include" }),
          fetch(`${base}/organizer/events`, { credentials: "include" }),
        ]);

        const checkerData = await checkerRes.json();
        const eventData = await eventRes.json();

        if (mounted) {
          setCheckers(checkerData);
          setEvents(eventData);
        }
      } catch (err) {
        console.error(err);
        if (mounted) {
          setCheckers([]);
          setEvents([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, [base]);

  const toggleActive = async (id: string) => {
    setCheckers((prev) =>
      prev.map((c) => (c._id === id ? { ...c, active: !c.active } : c)),
    );

    try {
      await fetch(`${base}/organizer/checkers/${id}/toggle`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Failed to toggle checker:", err);
    }
  };

  const handleAddChecker = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newChecker.name ||
      !newChecker.email ||
      newChecker.events.length === 0
    ) {
      alert("Please fill all fields and select at least one event");
      return;
    }

    try {
      const res = await fetch(`${base}/organizer/checkers`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChecker),
      });

      if (!res.ok) throw new Error("Failed to create checker");

      const createdChecker = await res.json();

      setCheckers((prev) => [...prev, createdChecker]);

      setNewChecker({ name: "", email: "", events: [] });
      setShowAdd(false);
    } catch (err) {
      console.error(err);
      alert("Error adding checker");
    }
  };

  if (loading) return <main className="p-4">Loading checkers…</main>;

  return (
    <main className="p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ticket Checkers</h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? "Cancel" : "Add Checker"}
        </button>
      </header>

      {showAdd && (
        <form
          onSubmit={handleAddChecker}
          className="mb-4 rounded-lg bg-white p-4 shadow"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              value={newChecker.name}
              onChange={(e) =>
                setNewChecker({ ...newChecker, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={newChecker.email}
              onChange={(e) =>
                setNewChecker({ ...newChecker, email: e.target.value })
              }
              required
            />
            <select
              multiple
              className="select select-bordered w-full"
              value={newChecker.events}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value,
                );
                setNewChecker({ ...newChecker, events: selected });
              }}
              required
            >
              {events.map((ev) => (
                <option key={ev._id} value={ev._id.toString()}>
                  {ev.title}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-success btn-sm mt-3">
            Add Checker
          </button>
        </form>
      )}

      <section className="overflow-auto rounded-lg bg-white shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Events</th>
              <th>Tickets Scanned</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {checkers.map((c) => (
              <tr key={c._id} className={c.active ? "" : "opacity-60"}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.events.map((e) => e.title).join(", ") || "-"}</td>
                <td>{c.ticketsScanned}</td>
                <td>{c.active ? "Active" : "Deactivated"}</td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      c.active
                        ? "btn-outline btn-error" // red outline for deactivate
                        : "btn-outline btn-success" // green outline for activate
                    }`}
                    onClick={() => toggleActive(c._id)}
                  >
                    {c.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
            {checkers.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  No checkers
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
