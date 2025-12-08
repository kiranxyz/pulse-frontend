import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type OrganizerEvent = {
  _id: string;
  title: string;
  date: string;
  ticketsSold: number;
  checkIns: number;
  revenue: number;
};

export default function OrganizerEventsPage() {
  const [events, setEvents] = useState<OrganizerEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const base = import.meta.env.VITE_PULSE_BACKEND_API_URL;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch(`${base}/organizer/events`, {
          credentials: "include",
        });
        const data = await res.json();
        if (mounted) setEvents(data);
      } catch {
        if (mounted) setEvents([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [base]);

  if (loading) return <main className="p-4">Loading events…</main>;

  return (
    <main className="p-4">
      <header className="mb-4">
        <h1 className="text-xl font-bold">My Events</h1>
      </header>

      <section className="overflow-auto rounded-lg bg-white shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th>Tickets Sold</th>
              <th>Check-ins</th>
              <th>Revenue (€)</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((ev, index) => (
              <tr key={ev._id}>
                <td>{index + 1}</td>
                <td>{ev.title}</td>
                <td>{ev.date}</td>
                <td className="text-center">{ev.ticketsSold}</td>
                <td className="text-center">{ev.checkIns}</td>
                <td className="text-center">{ev.revenue}</td>

                <td>
                  <div className="flex gap-2">
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
                  </div>
                </td>
              </tr>
            ))}

            {events.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  No events yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
