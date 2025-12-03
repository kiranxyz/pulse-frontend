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
  image
}) => {
  return (
    <div className="card bg-base-100 shadow-md p-4 flex flex-row gap-4 items-start">
      
      <div className="w-32 h-32 rounded overflow-hidden shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col grow">
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
