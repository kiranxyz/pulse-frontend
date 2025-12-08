import { useEffect, useState } from "react";

type EventBreakdown = { eventId: string; title: string; scanned: number };
type RecentScan = { ticketId: string; time: string; event: string };

type CheckerAnalytics = {
  checkerId?: string;
  today: number;
  total: number;
  events: EventBreakdown[];
  recent: RecentScan[];
};

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function AnalyticsDashboard() {
  const base = import.meta.env.VITE_PULSE_BACKEND_API_URL;

  const [analytics, setAnalytics] = useState<CheckerAnalytics | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      try {
        const res = await fetch(`${base}/api/profile`, {
          credentials: "include",
        });
        const data = await res.json();
        if (mounted) setUser(data);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProfile();
    return () => {
      mounted = false;
    };
  }, [base]);

  useEffect(() => {
    if (!user) return;

    async function fetchAnalytics() {
      try {
        const res = await fetch(`${base}/checker/${user?._id}/analytics`, {
          credentials: "include",
        });
        const data = await res.json();
        setAnalytics(data);
      } catch {
        setAnalytics(null);
      }
    }

    fetchAnalytics();
  }, [user, base]);
  if (loading) return <main className="p-4">Loading session…</main>;
  if (!user) return <main className="p-4 text-red-500">Not logged in.</main>;
  if (!["admin", "ticketchecker"].includes(user.role))
    return <main className="p-4 text-red-500">Access denied.</main>;
  if (!analytics) return <main className="p-4">Loading analytics…</main>;

  return (
    <main className="p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Check-in Dashboard ({user.role})</h1>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="card p-3">
          <div className="text-sm text-gray-500">Scanned Today</div>
          <div className="text-2xl font-bold">{analytics.today}</div>
        </div>
        <div className="card p-3">
          <div className="text-sm text-gray-500">Total Scanned</div>
          <div className="text-2xl font-bold">{analytics.total}</div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Event Breakdown</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {analytics.events.map((e) => (
            <div
              key={e.eventId}
              className="card flex items-center justify-between p-3"
            >
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-xs text-gray-500">ID: {e.eventId}</div>
              </div>
              <div className="text-xl font-bold">{e.scanned}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Recent Scans</h2>
        <ul className="divide-y rounded-lg border bg-white">
          {analytics.recent.map((r) => (
            <li
              key={r.ticketId}
              className="flex items-center justify-between p-3"
            >
              <div>
                <div className="font-medium">{r.ticketId}</div>
                <div className="text-xs text-gray-500">
                  {new Date(r.time).toLocaleString()} • {r.event}
                </div>
              </div>
              <div className="text-sm text-green-600">Checked</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
