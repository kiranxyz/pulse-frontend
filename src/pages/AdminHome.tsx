import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EventCard from "../components/ui/EventCard";
import type { Event } from "../types";

const AdminHome: React.FC = () => {
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard event={event} key={event.id || event._id} />
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
