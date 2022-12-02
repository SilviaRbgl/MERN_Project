import React from "react";
import { Link } from "react-router-dom";

function Leaders() {
  return (
    <div className="background">
      <div className="card bg-gradient-to-r from-amber-100 to-cyan-100">
        <p className="font-mono font-bold uppercase mb-2 text-center">Silvia</p>
        <p className="font-mono font-bold uppercase mb-2 text-center">Sara</p>
        <p className="font-mono font-bold uppercase mb-2 text-center">Paula</p>
      </div>

      <div className="card bg-gradient-to-r from-amber-100 to-cyan-100">
      <p className="font-mono mb-2">Do you know a remote island and want to show it to a group of travelers? On our website we give you the opportunity to become a tour leader and create your own expedition to a remote island. You want to know more? Then...</p>
      <Link className="btn mb-10" to="/register">
            Register as Leader
          </Link>
      </div>
    </div>
  );
}

export default Leaders;
