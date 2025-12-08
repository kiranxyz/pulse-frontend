import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EventCard from "../components/ui/EventCard";
import type { EventType } from "../types/EventType";

const AdminHome: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

  useEffect(() => {
    fetch(`${API_URL}/events`)
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
