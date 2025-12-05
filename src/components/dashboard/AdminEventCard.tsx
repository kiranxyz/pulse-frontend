import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  date: string;
  totalSeats: number;
  seatsBooked: number;
  image: string;
}

const AdminEventCard: React.FC<Props> = ({
  id,
  title,
  date,
  totalSeats,
  seatsBooked,
  image,
}) => {
  return (
    <div className="card bg-base-100 flex flex-row items-start gap-4 p-4 shadow-md">
      <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-grow flex-col">
        <h2 className="text-xl font-bold">{title}</h2>

        <p className="text-sm text-gray-500">
          {new Date(date).toLocaleDateString()}
        </p>

        <p className="mt-1 text-sm">
          Seats: {seatsBooked}/{totalSeats}
        </p>

        <Link
          to={`/admin/dashboard/edit/${id}`}
          className="btn btn-outline btn-sm mt-4"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default AdminEventCard;
