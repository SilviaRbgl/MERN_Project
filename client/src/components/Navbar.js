import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Dropdown from "./Dropdown";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <ul className="flex justify-evenly py-5 bg-gradient-to-r from-cyan-200 to-cyan-500 font-mono text-white">
        <Link to="/" className="no-underline hover:underline active:underline">
          Home{" "}
        </Link>
        <Link
          to="/expeditions"
          className="no-underline hover:underline active:underline"
        >
          Expeditions{" "}
        </Link>
        <Link
          to="/leaders"
          className="no-underline hover:underline active:underline"
        >
          Leaders{" "}
        </Link>
        {user ? (
          <Dropdown />
        ) : (
          <Link
            to="/login"
            className="no-underline hover:underline active:underline"
          >
            Log in
          </Link>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
