import { useEffect, useState } from "react";

type Stats = {
  upcomingEvents: number;
  ticketsSold: number;
  totalCheckers: number;
};
type UserProfile = {
  _id: string;
  name: string;
  email: string;
  role: string;
};
export default function OrganizerOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  const base = import.meta.env.VITE_PULSE_BACKEND_API_URL;
  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      try {
        const res = await fetch(`${base}/api/profile`, {
          credentials: "include",
        });
        const data = await res.json();
        if (mounted) setUser(data);
        console.log(data);
      } catch {
        if (mounted) setUser(null);
      } finally {
        //
      }
    }

    fetchProfile();
    return () => {
      mounted = false;
    };
  }, [base]);
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`${base}/organizer/${user?._id}/analytics`, {
          credentials: "include",
        });
        const data = await res.json();
        if (mounted) setStats(data);
      } catch {
        if (mounted)
          setStats({ upcomingEvents: 0, ticketsSold: 0, totalCheckers: 0 });
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [base]);
  if (!stats) return <main className="p-4">Loading…</main>;

  return (
    <main className="p-4">
      <header>
        <h1 className="text-2xl font-bold">Organizer Overview</h1>
      </header>

      <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="card p-4">
          <h2 className="text-sm text-gray-500">Upcoming Events</h2>
          <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
        </article>

        <article className="card p-4">
          <h2 className="text-sm text-gray-500">Tickets Sold</h2>
          <div className="text-2xl font-bold">{stats.ticketsSold}</div>
        </article>

        <article className="card p-4">
          <h2 className="text-sm text-gray-500">Checkers Assigned</h2>
          <div className="text-2xl font-bold">{stats.totalCheckers}</div>
        </article>
      </section>
    </main>
  );
}
