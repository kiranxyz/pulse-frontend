import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface EventOptions {
  discountFirst10: boolean;
  showHurryUp: boolean;
  reminder: boolean;
  emailNotify: boolean;
}

interface EventType {
  _id: string;
  title: string;
  address: string;
  date: string;
  time: string;
  totalSeats: number;
  ticketsSold: number;
  ticketsAvailable: number;
  checkins: number;
  options: EventOptions;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card bg-base-100 rounded-lg p-6 text-center shadow-lg">
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

function OptionCard({ options }: { options: EventOptions }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="card bg-base-100 rounded-lg p-4 shadow-md">
        <p>
          Discount first 10:{" "}
          {options.discountFirst10 ? "✔ Enabled" : "✘ Disabled"}
        </p>
        <p>
          Hurry up @ 80%: {options.showHurryUp ? "✔ Enabled" : "✘ Disabled"}
        </p>
      </div>
      <div className="card bg-base-100 rounded-lg p-4 shadow-md">
        <p>
          Reminder 1 hour before:{" "}
          {options.reminder ? "✔ Enabled" : "✘ Disabled"}
        </p>
        <p>
          Email participants:{" "}
          {options.emailNotify ? "✔ Enabled" : "✘ Disabled"}
        </p>
      </div>
    </div>
  );
}

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventType | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_PULSE_BACKEND_API_URL}/api/events/${id}`,
          { credentials: "include" },
        );
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setEvent(null);
      }
    }
    load();
  }, [id]);

  if (!event)
    return <p className="mt-10 text-center text-lg">Event not found</p>;

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6">
      <h1 className="text-4xl font-bold">{event.title}</h1>

      <section className="card bg-base-100 space-y-3 rounded-lg p-6 shadow-lg">
        <p>
          <strong>Location:</strong> {event.address}
        </p>
        <p>
          <strong>Date:</strong> {event.date}
        </p>
        <p>
          <strong>Time:</strong> {event.time}
        </p>
        <p>
          <strong>Total Seats:</strong> {event.totalSeats}
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Event Stats</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard label="Tickets Sold" value={event.ticketsSold} />
          <StatCard label="Tickets Available" value={event.ticketsAvailable} />
          <StatCard label="Check-ins" value={event.checkins} />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Options</h2>
        <OptionCard options={event.options} />
      </section>
    </main>
  );
}
