import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Dropdown from "./Dropdown";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <ul className="navbar">
        <Link to="/" className="link-navbar">
          Home{" "}
        </Link>
        <Link to="/expeditions" className="link-navbar">
          Expeditions{" "}
        </Link>
        <Link to="/leaders" className="link-navbar">
          Leaders{" "}
        </Link>
        {user ? (
          <Dropdown />
        ) : (
          <Link to="/login" className="link-navbar">
            Log in
          </Link>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
