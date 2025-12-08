import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type EventItem = {
  _id: string;
  title: string;
  date: string;
  time?: string;
};

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const base = import.meta.env.VITE_PULSE_BACKEND_API_URL;

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`${base}/api/events`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        if (mounted) setEvents(data);
      } catch (err) {
        console.error(err);
        if (mounted) setEvents([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [base]);

  if (loading) return <main className="p-4">Loading events…</main>;

  return (
    <main className="p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Events</h1>
        <Link to="/dashboard/createevent" className="btn btn-primary btn-sm">
          Add Event
        </Link>
      </header>

      <section className="overflow-auto rounded-lg bg-white shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Event</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, i) => (
              <tr key={ev._id} className="hover:bg-gray-50">
                <td>{i + 1}</td>
                <td className="font-medium">{ev.title}</td>
                <td>{ev.date}</td>
                <td>{ev.time || "-"}</td>
                <td className="flex gap-2">
                  <Link
                    to={`/dashboard/events/${ev._id}`}
                    className="btn btn-sm btn-outline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/dashboard/createevent/${ev._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No events
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
