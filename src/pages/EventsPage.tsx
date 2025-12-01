import axios from "axios";
import { useEffect, useState } from "react";

import EventCard from "../components/ui/EventCard";
import type { EventType } from "../types/EventType";

const apiBase = import.meta.env.VITE_API_URL;

const EventsPage = () => {
  const [events, setEvents] = useState<EventType[] | []>([]);

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
          <EventCard
            key={event._id}
            event={event}
            // id={event._id}
            // title={event.title}
            // date={event.date}
            // totalSeats={event.totalSeats}
            // seatsBooked={event.seatsBooked || 0}
            // image={event.image}
            // description={event.description}
            // price={event.price}
            // discount={event.discount}
            // options={{ showHurryUp: true, sendReminder: false }}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
