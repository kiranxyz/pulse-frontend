
import React from "react";
import { Link } from "react-router-dom";

export interface Event {
  id: string;
  title: string;
  date: string;
}

interface EventListProps {
  events: Event[];
  onDelete?: (id: string) => void; 
}

const EventList: React.FC<EventListProps> = ({ events, onDelete }) => {
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {events.map((event) => (
    <div key={event.id} className="shadow rounded-lg p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p className="text-gray-500">{event.date}</p>
      <div className="flex gap-2 mt-2">
         <Link to={`/admin/dashboard/edit/${event.id}`}>
         <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
         </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(event.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        )}
        <Link to={`/events/${event.id}`}>
          <button className="bg-gray-500 text-white px-2 py-1 rounded">View</button>
        </Link>
      </div>
    </div>
  ))}
</div>
  );
};

export default EventList;
