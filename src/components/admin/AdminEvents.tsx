// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import EventCard from "../ui/EventCard";
// import type { EventType } from "../types/EventType";

// const AdminEvents: React.FC = () => {
//   const [events, setEvents] = useState<EventType[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:8080/api/events")
//       .then(res => res.json())
//       .then(data => setEvents(data))
//       .catch(console.error);
//   }, []);

//   const handleEdit = (id: string) => {
//     navigate(`/admin/dashboard/edit/${id}`);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Events</h1>
//         <Link to="/admin/dashboard/create">
//           <button className="btn btn-primary">Create Event</button>
//         </Link>
//       </div>

//       {events.length === 0 ? (
//         <p>No events created yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {events.map(event => (
//             <EventCard
//               key={event.id || event._id }
//               event={event}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminEvents;
