<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router-dom";

import type { EventType } from "../../types/EventType";
import JoinEvent from "../rsvp/JoinEvent";

const EventCard = ({ event }: { event: EventType }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.startsWith("/admin");
  //const percentageBooked = (event.seatsBooked / event.totalSeats) * 100;
  //const hurryUp = event.options?.showHurryUp && percentageBooked >= 80;

  const handleClick = () => {
    //navigate(`/events/${id}`);
=======
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  date: string;
  totalSeats: number;
  seatsBooked: number;
  discount?: { firstN: number; percent: number };
  description: string;
  image: string;
  price: number;
  options?: { showHurryUp: boolean; sendReminder: boolean };
}

const EventCard: React.FC<Props> = ({
  id,
  title,
  date,
  totalSeats,
  seatsBooked,
  discount,
  description,
  image,
  price,
  options = { showHurryUp: false, sendReminder: false },
}) => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const isAdmin = location.pathname.startsWith("/admin");
  const percentageBooked = (seatsBooked / totalSeats) * 100;
  const hurryUp = options.showHurryUp && percentageBooked >= 80;

  const handleClick = () => {
    navigate(`/events/${id}`);
>>>>>>> 477b8005b61a7dddf08ae8144054443d56f815e6
  };

  return (
    <div
<<<<<<< HEAD
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
=======
      className="card bg-base-100 shadow-md p-4 flex flex-row gap-4 items-start cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      {/* Event Image */}
      <div className="w-32 h-32 rounded overflow-hidden flex-shrink-0">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Event Info */}
      <div className="flex flex-col flex-grow">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
        <p className="mt-1 text-sm">Seats: {seatsBooked}/{totalSeats}</p>
        {hurryUp && <p className="text-red-600 text-sm font-semibold">Hurry up! Almost full.</p>}
        {discount?.firstN > 0 && (
          <p className="text-green-600 text-sm">
            {discount.percent}% OFF for first {discount.firstN} attendees
          </p>
        )}
        <p className="mt-2 text-sm line-clamp-3">{description}</p>
        <p className="text-lg font-semibold mt-2">€{price}</p>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation(); 
              console.log("Attend clicked");
            }}
          >
            Attend
          </button>

          {isAdmin && (
            <Link
              to={`/admin/dashboard/edit/${id}`}
              className="btn btn-outline btn-sm"
              onClick={(e) => e.stopPropagation()} 
            >
              Edit
            </Link>
          )}
>>>>>>> 477b8005b61a7dddf08ae8144054443d56f815e6
        </div>
      </div>
    </div>
  );
};

export default EventCard;
