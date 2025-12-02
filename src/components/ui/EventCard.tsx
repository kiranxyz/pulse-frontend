import { useLocation, } from "react-router-dom";

import type { EventType } from "../../types/EventType";
import JoinEvent from "../rsvp/JoinEvent";

type EventCardProps = {
  event: EventType;
  onEdit?: (id: string) => void;
};

const EventCard: React.FC<EventCardProps> = ({ event, onEdit }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const handleClick = () => {
    if (isAdmin && onEdit) {
      onEdit(event._id); // call edit only for admin
    }
    // normal user navigation can go here
  };
  return (
    <div
      className="card bg-base-100 flex cursor-pointer flex-row items-start gap-4 p-4 shadow-md transition hover:shadow-lg"
      onClick={handleClick}
    >
      {/* Event Image */}
      <div className="h-32 w-32 shrink-0 overflow-hidden rounded">
        {/* {event.image && event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )} */}
        <p>No Image</p>
      </div>

      {/* Event Info */}
      <div className="flex grow flex-col">
        <h2 className="text-xl font-bold">{event?.title}</h2>
        <p className="text-sm text-gray-500">
          {new Date(event?.date).toLocaleDateString()}
        </p>
        <p className="mt-1 text-sm">
          Seats: {event?.seatsBooked}/{event?.totalSeats}
        </p>
        {/* {hurryUp && (
          <p className="text-sm font-semibold text-red-600">
            Hurry up! Almost full.
          </p>
        )} */}
        {event?.discount && event?.discount.firstN > 0 && (
          <p className="text-sm text-green-600">
            {event.discount.percent}% OFF for first {event?.discount.firstN}{" "}
            attendees
          </p>
        )}
        <p className="mt-2 line-clamp-3 text-sm">{event?.description}</p>
        <p className="mt-2 text-lg font-semibold">€{event?.price}</p>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <JoinEvent event={event} key={event._id} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
