
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/" className="hover:text-yellow-400">Home</Link>
      <Link to="/admin" className="hover:text-yellow-400">Admin</Link>
      <Link to="/create-event" className="hover:text-yellow-400">Create Event</Link>
    </nav>
  );
};

export default Navbar;
