import { useEffect, useState } from "react";

export default function CheckInPage() {
  const [ticketId, setTicketId] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const base = import.meta.env.VITE_PULSE_BACKEND_API_URL;

  type UserProfile = {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
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
  const handleCheckIn = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!ticketId.trim()) {
      setStatus("Please enter a ticket ID.");
      return;
    }
    setStatus("");
    setLoading(true);
    try {
      const res = await fetch(`${base}/checker/${user?._id}/checkin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ticketId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(`Error: ${data.error || "Unable to check in"}`);
      } else {
        setStatus(`Checked: ${data.message || ticketId}`);
      }
    } catch (err) {
      setStatus(`Network error: ${String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto mt-8 max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Check In Ticket</h1>
      <form onSubmit={handleCheckIn} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Ticket ID</span>
          <input
            className="input w-full"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="Enter ticket ID"
          />
        </label>
        <button
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Checking…" : "Check In"}
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </main>
  );
}
