import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/ui/EventCard";

const apiBase = import.meta.env.VITE_API_URL;

const EventsPage = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${apiBase}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Upcoming Events</h1>

      {events.length === 0 && (
        <p className="text-gray-500">No events available.</p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
