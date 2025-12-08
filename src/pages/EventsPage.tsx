<<<<<<< HEAD
import axios from "axios";
import { useEffect, useState } from "react";

import EventCard from "../components/ui/EventCard";
import type { EventType } from "../types/EventType";
=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/ui/EventCard";
>>>>>>> 477b8005b61a7dddf08ae8144054443d56f815e6

const apiBase = import.meta.env.VITE_API_URL;

const EventsPage = () => {
<<<<<<< HEAD
  const [events, setEvents] = useState<EventType[] | []>([]);
=======
  const [events, setEvents] = useState<any[]>([]);
>>>>>>> 477b8005b61a7dddf08ae8144054443d56f815e6

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${apiBase}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
<<<<<<< HEAD
      <h1 className="mb-6 text-3xl font-bold">Upcoming Events</h1>
=======
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
>>>>>>> 477b8005b61a7dddf08ae8144054443d56f815e6

      {events.length === 0 && (
        <p className="text-gray-500">No events available.</p>
      )}

<<<<<<< HEAD
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            // id={event._id}
            // title={event.title}
            // date={event.date}
            // totalSeats={event.totalSeats}
            // seatsBooked={event.seatsBooked || 0}
            // image={event.image}
            // description={event.description}
            // price={event.price}
            // discount={event.discount}
            // options={{ showHurryUp: true, sendReminder: false }}
=======
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            title={event.title}
            date={event.date}
            totalSeats={event.totalSeats}
            seatsBooked={event.seatsBooked || 0}
            image={event.image}
            description={event.description}
            price={event.price}
            discount={event.discount}
            options={{ showHurryUp: true, sendReminder: false }}
>>>>>>> 477b8005b61a7dddf08ae8144054443d56f815e6
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
