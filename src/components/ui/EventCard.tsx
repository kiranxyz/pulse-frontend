import { useLocation, useNavigate, Link } from "react-router";
import type { EventType } from "../../types/EventType";
import JoinEvent from "../rsvp/JoinEvent";

const EventCard = ({ event }: { event: EventType }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.startsWith("/admin");
  const percentageBooked = (event.seatsBooked / event.totalSeats) * 100;
  const hurryUp = event.options?.showHurryUp && percentageBooked >= 80;

  const handleClick = () => {
    navigate(`/events/${event._id}`);
  };

  return (
    <div className="card bg-base-100 flex cursor-pointer flex-row items-start gap-4 p-4 shadow-md transition hover:shadow-lg">
      {/* Event Image */}
      <div className="h-32 w-32 shrink-0 overflow-hidden rounded">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover"
            onClick={handleClick}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Event Info */}
      <div className="flex grow flex-col">
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p className="text-sm text-gray-500">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="mt-1 text-sm">
          Seats: {event.seatsBooked}/{event.totalSeats}
        </p>
        {hurryUp && (
          <p className="text-sm font-semibold text-red-600">
            Hurry up! Almost full.
          </p>
        )}
        {event.discount?.firstN && event.discount.firstN > 0 && (
          <p className="text-sm text-green-600">
            {event.discount?.percent}% OFF for first {event.discount.firstN}{" "}
            attendees
          </p>
        )}
        <p className="mt-2 line-clamp-3 text-sm">{event.description}</p>
        <p className="mt-2 text-lg font-semibold">€{event.price}</p>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <JoinEvent event={event} />

          {isAdmin && (
            <Link
              to={`/admin/dashboard/edit/${event._id}`}
              className="btn btn-outline btn-sm"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   onEdit?.();
              // }}
            >
              Edit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;