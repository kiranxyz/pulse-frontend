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
    <main className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Check In Ticket</h1>

      <section className="mb-4">
        <label className="mb-1 block font-medium">Ticket ID</label>
        <input
          type="text"
          className="input input-bordered w-full rounded-lg"
          placeholder="Enter ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
        />
      </section>

      <button
        onClick={handleCheckIn}
        disabled={loading}
        className="btn btn-primary w-full rounded-lg"
      >
        {loading ? "Checking..." : "Check In"}
      </button>

      {status && (
        <p className="mt-4 animate-[slideUp_0.4s_ease-out] text-sm text-gray-700">
          {status}
        </p>
      )}
    </main>
  );
}
