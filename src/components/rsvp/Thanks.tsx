import { useNavigate } from "react-router";

const Thanks = () => {
  const navigate = useNavigate();
  const ticketUrl = "/path-to-ticket"; // Replace with actual ticket URL or route
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

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-4 text-center">
      <h1 className="text-6xl text-green-500">🎉 Thank You!</h1>
      <p>Your payment was successful.</p>

      <div className="">
        <button
          onClick={() => navigate("/ticket")}
          className="btn btn-secondary"
        >
          View Ticket
        </button>

        <button onClick={() => navigate("/")} className="btn btn-info">
          Back to Home
        </button>

        <a
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
        </a>
      </div>
    </div>
  );
};

export default Thanks;
