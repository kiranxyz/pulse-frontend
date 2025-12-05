import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { EventType } from "../types/EventType";

const apiBase = import.meta.env.VITE_API_URL;

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventType | null>(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`${apiBase}/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!event) return <p className="text-center mt-20 text-gray-500">Loading event details...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{event.title}</h1>
        <p className="text-gray-500 text-lg">{new Date(event.date).toLocaleDateString()} | {event.time}</p>
      </div>

      {/* Image */}
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-80 object-cover rounded-xl mb-6 shadow-md hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-80 flex items-center justify-center bg-gray-200 rounded-xl mb-6 text-gray-400 font-semibold">
          No Image Available
        </div>
      )}

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p><span className="font-semibold">Address:</span> {event.address || "Not provided"}</p>
        <p><span className="font-semibold">Price:</span> €{event.price}</p>
        <p><span className="font-semibold">Seats:</span> {event.seatsBooked}/{event.totalSeats}</p>
        {event.discount && (
          <p className="text-green-600 font-semibold">
            {event.discount.percent}% OFF for first {event.discount.firstN} attendees
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mt-6 text-gray-800 leading-relaxed">
        <h2 className="text-2xl font-semibold mb-3">About this event</h2>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetails;
