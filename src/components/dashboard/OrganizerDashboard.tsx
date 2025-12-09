import { useLoaderData } from "react-router-dom";

interface OrganizerStats {
  upcoming: number;
  ticketsSold: number;
  totalCheckers: number;
}

export default function OrganizerDashboard() {
  const stats = useLoaderData() as OrganizerStats;

  return (
    <main className="space-y-6 p-4 md:p-6">
      <header>
        <h1 className="text-2xl font-bold">Organizer Dashboard</h1>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="card bg-white p-4 shadow-md">
          <h2 className="text-gray-600">Upcoming Events</h2>
          <p className="text-3xl font-bold">{stats.upcoming}</p>
        </article>

        <article className="card bg-white p-4 shadow-md">
          <h2 className="text-gray-600">Tickets Sold</h2>
          <p className="text-3xl font-bold">{stats.ticketsSold}</p>
        </article>

        <article className="card bg-white p-4 shadow-md">
          <h2 className="text-gray-600">Ticket Checkers Assigned</h2>
          <p className="text-3xl font-bold">{stats.totalCheckers}</p>
        </article>
      </section>
    </main>
  );
}
