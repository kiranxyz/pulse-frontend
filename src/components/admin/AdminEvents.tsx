import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EventCard from "../ui/EventCard";
import type { Event } from "../types";

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/dashboard/edit/${id}`);
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id || event._id}
              id={event.id || event._id}
              title={event.title}
              date={event.date}
              totalSeats={event.totalSeats}
              seatsBooked={event.seatsBooked}
              discount={event.discount}
              description={event.description}
              image={event.image || ""}
              price={event.price}
              options={{ showHurryUp: true, sendReminder: false }}
              onEdit={() => handleEdit(event.id || event._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// export default AdminEvents;
