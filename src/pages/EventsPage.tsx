import axios from "axios";
import { useEffect, useState } from "react";

import EventCard from "../components/ui/EventCard";
import EventSearchFilter from "../components/Search/EventSearchFilter"; 
import type { EventType } from "../types/EventType";

const apiBase = import.meta.env.VITE_API_URL;

const EventsPage = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]); 

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${apiBase}/api/events`);
      setEvents(res.data);
      setFilteredEvents(res.data); 
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };


  const handleFilterChange = (filters: any) => {
    let temp = [...events];

    if (filters.search)
      temp = temp.filter((e) =>
        e.title?.toLowerCase().includes(filters.search.toLowerCase())
      );

    if (filters.topic)
      temp = temp.filter((e) =>
        e.topic?.toLowerCase().includes(filters.topic.toLowerCase())
      );

    if (filters.category)
      temp = temp.filter((e) =>
        e.category?.toLowerCase().includes(filters.category.toLowerCase())
      );

    if (filters.location)
      temp = temp.filter((e) =>
        e.location?.toLowerCase().includes(filters.location.toLowerCase())
      );

    if (filters.minPrice)
      temp = temp.filter((e) => e.price >= Number(filters.minPrice));

    if (filters.maxPrice)
      temp = temp.filter((e) => e.price <= Number(filters.maxPrice));

    if (filters.date)
      temp = temp.filter((e) => e.date?.slice(0, 10) === filters.date);

    setFilteredEvents(temp);
  };

  return (
    <div className="container mx-auto p-6">

      <EventSearchFilter onFilterChange={handleFilterChange} />

      <h1 className="mb-6 text-3xl font-bold">Upcoming Events</h1>

      {filteredEvents.length === 0 && (
        <p className="text-gray-500">No events available.</p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard 
          key={event._id} 
          event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
