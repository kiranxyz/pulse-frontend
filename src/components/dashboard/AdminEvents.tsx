import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import type { EventType } from "../../types/EventType";
import EventCard from "../ui/EventCard";

const apiBase = import.meta.env.VITE_PULSE_BACKEND_API_URL;

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${apiBase}/api/events`);
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link to="/admin/dashboard/create">
          <button className="btn btn-primary">Create Event</button>
        </Link>
      </div>

      {events.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
