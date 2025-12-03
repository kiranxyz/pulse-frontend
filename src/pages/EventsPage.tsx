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
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      {events.length === 0 && (
        <p className="text-gray-500">No events available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            title={event.title}
            date={event.date}
            totalSeats={event.totalSeats}
            seatsBooked={event.seatsBooked || 0}
            image={event.image}
            description={event.description}
            price={event.price}
            discount={event.discount}
            options={{ showHurryUp: true, sendReminder: false }}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
