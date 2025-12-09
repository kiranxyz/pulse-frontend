import axios from "axios";
import { useEffect, useState } from "react";

import EventSearchFilter from "../components/Search/EventSearchFilter";
import EventCard from "../components/ui/EventCard";
import type { EventType } from "../types/EventType";

const apiBase = import.meta.env.VITE_PULSE_BACKEND_API_URL;

const HomePage = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false); 



  useEffect(() => {
    axios
      .get(`${apiBase}/api/events`)
      .then((res) => {
        const data = res.data;

        let eventsData = Array.isArray(data)
          ? data
          : Array.isArray(data.events)
          ? data.events
          : [];

        setEvents(eventsData);
        setFilteredEvents(eventsData);
      })
      .catch(console.error);
  }, []);

  const handleFilterChange = (filters: any) => {
    const { search, topic, category, location, minPrice, maxPrice, date } = filters;

    const filtered = events.filter((event: any) => {
      return (
        (!search || event.title.toLowerCase().includes(search.toLowerCase())) &&
        (!topic || event.topic?.toLowerCase().includes(topic.toLowerCase())) &&
        (!category || event.category?.toLowerCase().includes(category.toLowerCase())) &&
        (!location || event.location?.toLowerCase().includes(location.toLowerCase())) &&
        (!minPrice || event.price >= Number(minPrice)) &&
        (!maxPrice || event.price <= Number(maxPrice)) &&
        (!date || new Date(event.date).toDateString() === new Date(date).toDateString())
      );
    });

    setFilteredEvents(filtered);
  };

  return (
    <div className="min-h-screen"> 
      <h1 className="text-3xl md:text-4xl text-black font-medium text-center md:text-left p-3">
        Find Your Perfect Event
      </h1>

      {/* Search Bubble */}
{!showFilters && (
  <div className="max-w-xl mx-auto w-full px-4">
    <input
      type="text"
      placeholder="Search events..."
      className="w-full p-4 rounded-full shadow-md bg-black text-white "
      onFocus={() => setShowFilters(true)}
      onClick={() => setShowFilters(true)}
    />
  </div>
)}

{/* Filter Wrapper */}
<div
  className={`
    transition-all duration-500 overflow-hidden 
    ${showFilters ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0"}
  `}
>
  <EventSearchFilter onFilterChange={handleFilterChange} />
</div>




      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <p className="text-center text-white mt-6">No events found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredEvents.map((event: any) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
