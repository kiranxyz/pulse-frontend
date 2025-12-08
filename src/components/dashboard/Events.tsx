import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface EventItem {
  _id: string;
  title: string;
  date: string;
  time: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const BASE_URL = import.meta.env.VITE_PULSE_BACKEND_API_URL;

  useEffect(() => {
    if (!BASE_URL) return;

    fetch(`${BASE_URL}/api/events`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data: EventItem[]) => setEvents(data))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [BASE_URL]);

  if (loading) return <p className="p-6 text-center">Loading events...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <main className="p-6">
      <header className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <button className="btn btn-primary">Add Event</button>
      </header>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 text-lg font-semibold">
            <tr>
              <th>#</th>
              <th>Event</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, i) => (
              <tr key={ev._id} className="hover:bg-gray-50">
                <td>{i + 1}</td>
                <td className="font-semibold">{ev.title}</td>
                <td>{ev.date}</td>
                <td>{ev.time}</td>
                <td className="flex gap-2">
                  <Link
                    to={`/events/${ev._id}`}
                    className="btn btn-sm btn-outline"
                  >
                    View
                  </Link>
                  <button className="btn btn-sm btn-primary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
