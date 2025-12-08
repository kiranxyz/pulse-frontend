import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex gap-4 bg-gray-800 p-4 text-white">
      <Link to="/" className="hover:text-yellow-400">
        Home
      </Link>
      <Link to="/admin" className="hover:text-yellow-400">
        Admin
      </Link>
      <Link to="/create-event" className="hover:text-yellow-400">
        Create Event
      </Link>
    </nav>
  );
};

export default Navbar;
