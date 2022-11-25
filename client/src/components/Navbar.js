import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <ul className="flex justify-evenly py-5 bg-gradient-to-r from-cyan-200 to-cyan-500 font-mono text-white">
        <Link to="/" className="no-underline hover:underline">Home </Link>
        <Link to="/expeditions" className="no-underline hover:underline">Expeditions </Link>
        <Link to="/login" className="no-underline hover:underline">Log in </Link>
      </ul>
    </div>
  );
}

export default Navbar;
