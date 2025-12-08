import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../ui/EventCard";
import type { EventType } from "../../types/EventType";

const API_URL = import.meta.env.VITE_PULSE_BACKEND_API_URL;

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  //const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data.events))
      .catch(console.error);
  }, []);

  // const handleEdit = (id: string) => {
  //   navigate(`/admin/dashboard/edit/${id}`);
  // };

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
            <EventCard event={event} key={event._id} />
            //   key={event.id || event._id}
            //   id={event.id || event._id}
            //   title={event.title}
            //   date={event.date}
            //   totalSeats={event.totalSeats}
            //   seatsBooked={event.seatsBooked}
            //   discount={event.discount}
            //   description={event.description}
            //   image={event.image || ""}
            //   price={event.price}
            //   options={{ showHurryUp: true, sendReminder: false }}
            //   onEdit={() => handleEdit(event.id || event._id)}
            // />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
