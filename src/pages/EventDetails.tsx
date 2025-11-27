import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Event } from "../types";

const apiBase = import.meta.env.VITE_API_URL;

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`${apiBase}/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      {event.image && <img src={event.image} alt={event.title} className="mb-4 w-full h-64 object-cover rounded" />}
      <p className="mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p className="mb-2"><strong>Time:</strong> {event.time}</p>
      <p className="mb-2"><strong>Address:</strong> {event.address}</p>
      <p className="mb-2"><strong>Price:</strong> €{event.price}</p>
      <p className="mb-2"><strong>Seats:</strong> {event.seatsBooked}/{event.totalSeats}</p>
      {event.discount && <p className="mb-2 text-green-600">{event.discount.percent}% OFF for first {event.discount.firstN} attendees</p>}
      <p className="mt-4">{event.description}</p>
    </div>
  );
};

export default EventDetails;
