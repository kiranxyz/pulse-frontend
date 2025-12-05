import { useState } from "react";

const BASE_URL = import.meta.env.VITE_PULSE_BACKEND_API_URL;

type CheckInResponse = {
  message?: string;
  error?: string;
};

export default function CheckInPage() {
  const [ticketId, setTicketId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  if (!BASE_URL) console.error("Missing VITE_PULSE_BACKEND_API_URL");

  const handleCheckIn = async () => {
    if (!ticketId.trim()) {
      setStatus("Please enter a ticket ID.");
      return;
    }

    setStatus("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/checkin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ticketId }),
      });

      const data: CheckInResponse = await res.json();

      if (!res.ok) {
        setStatus(`Error: ${data.error || "Unable to check in"}`);
      } else {
        setStatus(`Successfully checked in: ${data.message || ticketId}`);
      }
    } catch (err) {
      setStatus(`Network error: ${String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Ticket Check-In</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckIn();
        }}
        className="flex flex-col gap-4"
      >
        <div>
          <label
            htmlFor="ticketId"
            className="mb-2 block font-medium text-gray-700"
          >
            Ticket ID
          </label>
          <input
            id="ticketId"
            type="text"
            className="input input-bordered w-full rounded-lg border-gray-300 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary w-full rounded-lg py-2 ${loading ? "loading" : ""}`}
        >
          {loading ? "Checking..." : "Check In"}
        </button>
        {status && (
          <p className="mt-4 animate-[slideUp_0.4s_ease-out] text-sm text-gray-700">
            {status}
          </p>
        )}
      </form>
    </main>
  );
}
