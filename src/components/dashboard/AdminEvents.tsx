import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { EventType } from "../../types/EventType";
import EventCard from "../ui/EventCard";

const apiBase = import.meta.env.VITE_API_URL;

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);

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
            // key={event._id || event.id}
            // id={event._id || event.id}
            // title={event.title}
            // date={event.date}
            // totalSeats={event.totalSeats}
            // seatsBooked={event.seatsBooked || 0}
            // price={event.price}
            // discount={event.discount}
            // description={event.description}
            // image={event.image || null}
            // options={{ showHurryUp: true, sendReminder: true }}
            // onEdit={() =>
            //   window.location.assign(
            //     `/admin/dashboard/edit/${event._id || event.id}`,
            //   )
            // }
            ///>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
