import axios from "axios";
import React, { useEffect, useState } from "react";

import EventCard from "../components/ui/EventCard";

const apiBase = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [events, setEvents] = useState<any[]>([]);

  /* useEffect(() => {
    axios.get(`${apiBase}/api/events`)
      .then(res => setEvents(res.data))
      .catch(console.error);
  }, []);*/

  useEffect(() => {
    axios
      .get(`${apiBase}/api/events`)
      .then((res) => {
        const data = res.data;

        // Ensure it's an array
        if (Array.isArray(data)) {
          setEvents(data);
        } else if (Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          console.error("Invalid events format:", data);
          setEvents([]); // fallback
        }
      })
      .catch(console.error);
  }, []);

  const handleAttend = (id: string) => {
    console.log("Attend clicked for event:", id);
  };

  return (
    <div className="container mx-auto grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        events.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            title={event.title}
            image={event.image}
            address={event.address}
            date={event.date}
            time={event.time}
            totalSeats={event.totalSeats}
            seatsBooked={event.seatsBooked || 0}
            discount={event.discount}
            price={event.price}
            onAttend={handleAttend}
          />
        ))
      )}
    </div>
  );
};

export default HomePage;
