import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EventCard from "../ui/EventCard";

const apiBase = import.meta.env.VITE_API_URL;

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${apiBase}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link to="/admin/dashboard/create">
          <button className="btn btn-primary">Create Event</button>
        </Link>
      </div>

      
      {events.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <EventCard
              key={event._id || event.id}
              id={event._id || event.id}
              title={event.title}
              date={event.date}
              totalSeats={event.totalSeats}
              seatsBooked={event.seatsBooked || 0}
              price={event.price}
              discount={event.discount}
              description={event.description}
              image={event.image || null}
              options={{ showHurryUp: true, sendReminder: true }}
              onEdit={() => window.location.assign(`/admin/dashboard/edit/${event._id || event.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
