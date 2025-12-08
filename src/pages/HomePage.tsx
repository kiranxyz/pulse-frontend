import axios from "axios";
import { useEffect, useState } from "react";

import EventCard from "../components/ui/EventCard";
import type { EventType } from "../types/EventType";

const apiBase = import.meta.env.VITE_PULSE_BACKEND_API_URL;

const HomePage = () => {
  const [events, setEvents] = useState<EventType[]>([]);

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

  // const handleAttend = (id: string) => {
  //   console.log("Attend clicked for event:", id);
  // };

  return (
    <div className="container mx-auto grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        events.map((event) => (
          <EventCard event={event} key={event._id} />
          //   key={event._id}
          //   id={event._id}
          //   title={event.title}
          //   description={event.description}
          //   image={event.image}
          //   address={event.address}
          //   date={event.date}
          //   time={event.time}
          //   totalSeats={event.totalSeats}
          //   seatsBooked={event.seatsBooked || 0}
          //   discount={event.discount}
          //   price={event.price}
          //   onAttend={() => handleAttend(event.id || event._id)}
          // />
        ))
      )}
    </div>
  );
};

export default HomePage;
