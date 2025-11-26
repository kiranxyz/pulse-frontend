import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/ui/EventCard";

const apiBase = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${apiBase}/api/events`)
      .then(res => setEvents(res.data))
      .catch(console.error);
  }, []);

  const handleAttend = (id: string) => {
    console.log("Attend clicked for event:", id);
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.length === 0 ? <p>No events found</p> :
        events.map(event => (
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
      }
    </div>
  );
};

export default HomePage;
