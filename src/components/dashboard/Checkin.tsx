import { useState } from "react";

const BASE_URL = import.meta.env.VITE_PULSE_BACKEND_API_URL;

export default function CheckInPage() {
  const [ticketId, setTicketId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  if (!BASE_URL) {
    console.error("Missing VITE_PULSE_BACKEND_API_URL");
  }

  const handleCheckIn = async () => {
    if (!ticketId.trim()) {
      return setStatus("Please enter a ticket ID.");
    }

    setStatus("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/admin/dashboard/check-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ticketId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(`Error: ${data.error || "Unable to check in"}`);
      } else {
        setStatus(`Successfully checked in: ${data.message || ticketId}`);
      }
    } catch (err) {
      setStatus(`Network error: ${String(err)}`);
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 p-6">
      <div className="w-full max-w-md animate-[fadeIn_0.7s_ease-out] rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Event Check-In
        </h1>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-white/80">
            Ticket ID
          </label>
          <input
            type="text"
            className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/40 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          />
        </div>

        <button
          onClick={handleCheckIn}
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition active:scale-95 disabled:bg-blue-400"
        >
          {loading ? "Checking..." : "Check In"}
        </button>

        {status && (
          <p className="mt-4 animate-[slideUp_0.4s_ease-out] text-center text-sm text-white/90">
            {status}
          </p>
        )}
      </div>
    </main>
  );
}
