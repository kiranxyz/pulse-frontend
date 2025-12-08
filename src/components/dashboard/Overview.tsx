import { useEffect, useState } from "react";

import AdminLayout from "../layout/AdminLayout";

interface OverviewStats {
  totalUsers: number;
  totalEvents: number;
  totalTickets: number;
  totalCheckins: number;
  revenue?: number;
}

export default function OverviewPage() {
  const [stats, setStats] = useState<OverviewStats | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          import.meta.env.VITE_PULSE_BACKEND_API_URL + "/admin/stats",
          { credentials: "include" },
        );

        if (!res.ok) throw new Error("Failed to load stats");

        const data: OverviewStats = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
        setStats(null);
      }
    }

    load();
  }, []);

  return (
    <AdminLayout>
      <h1 className="mb-6 text-3xl font-bold">Dashboard Overview</h1>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="card bg-white p-5 shadow-md">
              <h3 className="text-lg font-semibold">Users</h3>
              <p className="mt-2 text-3xl font-bold">{stats.totalUsers}</p>
            </div>

            <div className="card bg-white p-5 shadow-md">
              <h3 className="text-lg font-semibold">Events</h3>
              <p className="mt-2 text-3xl font-bold">{stats.totalEvents}</p>
            </div>

            <div className="card bg-white p-5 shadow-md">
              <h3 className="text-lg font-semibold">Tickets Sold</h3>
              <p className="mt-2 text-3xl font-bold">{stats.totalTickets}</p>
            </div>

            <div className="card bg-white p-5 shadow-md">
              <h3 className="text-lg font-semibold">Checked-In</h3>
              <p className="mt-2 text-3xl font-bold">{stats.totalCheckins}</p>
            </div>
          </div>

          <div className="card bg-white p-6 shadow-md">
            <h2 className="mb-3 text-2xl font-bold">Revenue</h2>
            <p className="text-gray-600">Revenue and stats coming soon…</p>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
