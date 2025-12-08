<<<<<<< HEAD
import React from "react";
import { Link } from "react-router";
=======
import { Link } from "react-router-dom";
>>>>>>> 373e4acaf322a3f9cf590ac294066775ef2e96bf

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
