import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface EventItem {
  _id: string;
  title: string;
  date: string;
  time: string;
}

interface EventTableProps {
  events: EventItem[];
}

function EventTable({ events }: EventTableProps) {
  if (!events.length) {
    return <p className="p-4 text-center text-gray-500">No events found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-lg">
      <table className="table w-full border-collapse">
        <thead className="bg-gray-100 text-lg font-semibold">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Event</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev, i) => (
            <tr
              key={ev._id}
              className="transition-colors duration-200 hover:bg-gray-50"
            >
              <td className="px-4 py-2">{i + 1}</td>
              <td className="px-4 py-2 font-semibold text-gray-700">
                {ev.title}
              </td>
              <td className="px-4 py-2 text-gray-600">{ev.date}</td>
              <td className="px-4 py-2 text-gray-600">{ev.time}</td>
              <td className="flex gap-2 px-4 py-2">
                <Link
                  to={`/dashboard/events/${ev._id}`}
                  className="btn btn-sm btn-outline transition-colors hover:bg-gray-100"
                >
                  View
                </Link>
                <Link
                  to={`/dashboard/createevent/${ev._id}`}
                  className="btn btn-sm btn-primary transition-all hover:brightness-110"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    // Replace with backend API call
    const mockEvents: EventItem[] = [
      {
        _id: "1",
        title: "Munich Tech Conference 2025",
        date: "2025-12-05",
        time: "09:00 AM",
      },
      {
        _id: "2",
        title: "Hamburg Startup Night",
        date: "2025-12-07",
        time: "06:00 PM",
      },
      {
        _id: "3",
        title: "Frankfurt Fintech Workshop",
        date: "2025-12-10",
        time: "10:00 AM",
      },
      {
        _id: "4",
        title: "Cologne Marketing Summit",
        date: "2025-12-12",
        time: "11:00 AM",
      },
      {
        _id: "5",
        title: "Berlin AI Workshop",
        date: "2025-12-15",
        time: "01:00 PM",
      },
    ];
    setEvents(mockEvents);
    /*
    fetch(import.meta.env.VITE_PULSE_BACKEND_API_URL + "/api/events")
      .then((res) => res.json())
      .then((data: EventItem[]) => setEvents(data));
    */
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Events</h1>
        <Link to="/dashboard/createevent">
          <button className="btn btn-primary w-full sm:w-auto">
            Add Event
          </button>
        </Link>
      </div>

      <EventTable events={events} />
    </main>
  );
}
