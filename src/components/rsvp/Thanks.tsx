import { useLocation, useNavigate } from "react-router";

const apiBase = import.meta.env.VITE_API_URL;

if (!apiBase) {
  throw new Error(
    "Missing API base key (VITE_API_URL) key in environment variables",
  );
}

const Thanks = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  //console.log("State in Thanks:", state);
  const ticketUrl = `${apiBase}/api/ticket/${state.ticketCode}`; // Replace with actual ticket URL or route
  const calendarLink = () => {
    const title = encodeURIComponent("Event Title");
    const details = encodeURIComponent("Event Details");
    const location = encodeURIComponent("Event Location");
    const start = new Date();
    const end = new Date();
    end.setHours(start.getHours() + 1);

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(start)}/${formatDate(
      end,
    )}&details=${details}&location=${location}&sf=true&output=xml`;

    return calendarUrl;
  };

  // Helper to format date in YYYYMMDDTHHmmssZ
  const formatDate = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d+/g, "");

  const viewTicket = async () => {
    try {
      const res = await fetch(ticketUrl);

      if (!res.ok) throw new Error("Failed to fetch ticket");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Open PDF in new tab instead of downloading
      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
      alert("Could not open ticket.");
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-4 text-center">
      <h1 className="text-6xl text-green-500">🎉 Thank You!</h1>
      <p>Your payment was successful.</p>

      <div className="space-x-4 text-center">
        <button onClick={() => navigate("/")} className="btn btn-info">
          Back to Home
        </button>

        <button onClick={viewTicket} className="btn btn-secondary">
          View Ticket
        </button>

        {/* <a
          href={calendarLink()}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "10px 20px",
            textDecoration: "none",
            color: "white",
            backgroundColor: "#007bff",
            borderRadius: 4,
            display: "inline-block",
          }}
        >
          Add to Calendar
        </a> */}
      </div>
    </div>
  );
};

export default Thanks;
