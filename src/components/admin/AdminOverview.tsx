import { useEffect, useState } from "react";

import { StatCard } from "../../components/admin/StatCard";
import { type OverviewStats } from "../../types/OverviewStatsType";

function fetchStats(): Promise<OverviewStats> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        overview: {
          totalUsers: 1200,
          newUsersThisMonth: 85,
          activeUsersThisMonth: 430,
        },
        events: {
          totalEvents: 18,
          upcomingEventsThisMonth: 4,
          pastEventsThisMonth: 2,
        },
        tickets: {
          ticketsSoldThisMonth: 260,
          ticketsAvailableThisMonth: 400,
          checkinsThisMonth: 190,
          attendanceRateThisMonth: 73,
        },
        finance: {
          revenueTotal: 25200,
          revenueThisMonth: 15800,
          highestEarningEvent: { name: "Tech Fusion Summit", revenue: 9600 },
        },
      });
    }, 500),
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<OverviewStats | null>(null);

  useEffect(() => {
    void (async () => {
      const data = await fetchStats();
      setStats(data);
    })();
  }, []);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  if (!stats) {
    return <p className="p-4 text-center">Loading stats...</p>;
  }

  const renderStatSection = (
    title: string,
    data: {
      title: string;
      value: number | string;
      subtitle?: string;
      icon?: React.ReactNode;
      gradientClass?: string;
    }[],
    gridCols = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3",
  ) => (
    <section className="space-y-3">
      <h2 className="border-b border-gray-200 pb-2 text-xl font-semibold text-gray-700 md:text-2xl">
        {title}
      </h2>
      <div className={`grid gap-4 ${gridCols}`}>
        {data.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  );

  return (
    <main className="min-h-screen space-y-10 bg-gray-50 p-4 md:p-6">
      <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
        Admin Dashboard – {currentMonth}
      </h1>

      {renderStatSection("User Overview", [
        {
          title: "Total Users",
          value: stats.overview.totalUsers,
          gradientClass: "bg-purple-50",
          icon: "👤",
        },
        {
          title: "New Users",
          value: stats.overview.newUsersThisMonth,
          subtitle: `In ${currentMonth}`,
          gradientClass: "bg-purple-50",
          icon: "👤",
        },
        {
          title: "Active Users",
          value: stats.overview.activeUsersThisMonth,
          subtitle: `In ${currentMonth}`,
          gradientClass: "bg-purple-50",
          icon: "👤",
        },
      ])}

      {renderStatSection("Event Stats", [
        {
          title: "Total Events",
          value: stats.events.totalEvents,
          gradientClass: "bg-gray-100",
          icon: "📅",
        },
        {
          title: "Upcoming Events",
          value: stats.events.upcomingEventsThisMonth,
          gradientClass: "bg-gray-100",
          icon: "📅",
        },
        {
          title: "Past Events",
          value: stats.events.pastEventsThisMonth,
          gradientClass: "bg-gray-100",
          icon: "📅",
        },
      ])}

      {renderStatSection(
        "Ticket Stats",
        [
          {
            title: "Tickets Sold",
            value: stats.tickets.ticketsSoldThisMonth,
            gradientClass: "bg-yellow-50",
            icon: "🎟️",
          },
          {
            title: "Tickets Available",
            value: stats.tickets.ticketsAvailableThisMonth,
            gradientClass: "bg-yellow-50",
            icon: "🎟️",
          },
          {
            title: "Check-ins",
            value: stats.tickets.checkinsThisMonth,
            gradientClass: "bg-yellow-50",
            icon: "🎟️",
          },
          {
            title: "Attendance Rate",
            value: `${stats.tickets.attendanceRateThisMonth}%`,
            gradientClass: "bg-yellow-50",
            icon: "🎟️",
          },
        ],
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4",
      )}

      {renderStatSection(
        "Revenue Stats",
        [
          {
            title: "Revenue This Month",
            value: `€${stats.finance.revenueThisMonth}`,
            gradientClass:
              "bg-gradient-to-r from-green-200 to-green-400 text-gray-900",
            icon: "💶",
          },
          {
            title: "Total Revenue",
            value: `€${stats.finance.revenueTotal}`,
            gradientClass:
              "bg-gradient-to-r from-green-200 to-green-400 text-gray-900",
            icon: "💶",
          },
          {
            title: "Top Earning Event",
            value: stats.finance.highestEarningEvent.name,
            subtitle: `€${stats.finance.highestEarningEvent.revenue}`,
            gradientClass:
              "bg-gradient-to-r from-green-200 to-green-400 text-gray-900",
            icon: "💶",
          },
        ],
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      )}
    </main>
  );
}
