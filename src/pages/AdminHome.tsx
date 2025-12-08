import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EventCard from "../components/ui/EventCard";
import type { EventType } from "../types/EventType";

const AdminHome: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

  useEffect(() => {
<<<<<<< HEAD
    fetch("http://localhost:8080/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
=======
    fetch(`${API_URL}/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
>>>>>>> 373e4acaf322a3f9cf590ac294066775ef2e96bf
      .catch(console.error);
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/dashboard/edit/${id}`);
  };

  const goToDashboard = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">Admin Overview</h1>

      <button className="btn btn-primary mb-6" onClick={goToDashboard}>
        Go to Dashboard
      </button>

      {events.length === 0 && <p>No events created yet.</p>}

<<<<<<< HEAD
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard event={event} key={event.id || event._id} />
=======
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard
            key={event.id || event._id}
            id={event.id || event._id}
            title={event.title}
            date={event.date}
            totalSeats={event.totalSeats}
            seatsBooked={event.seatsBooked}
            discount={event.discount}
            description={event.description}
            image={event.image ?? null}
            price={event.price}
            options={{ showHurryUp: true, sendReminder: false }}
            onEdit={() => handleEdit(event.id || event._id)}
          />
>>>>>>> 373e4acaf322a3f9cf590ac294066775ef2e96bf
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
