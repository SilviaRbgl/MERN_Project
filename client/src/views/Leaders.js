import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Leaders() {
  const [leader, setLeader] = useState([]);

  const fetchLeaders = async () => {
    const response = await fetch("http://localhost:5000/api/leaders/all/");
    const results = await response.json();
    setLeader(results.allLeaders);
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  return (
    <div className="background grid gap-10">
      {leader.map((leader, index) => {
        return (
          <div
            className="rounded-xl card  md:grid-cols-2 lg:grid-cols-3"
            key={index}
          >
            <img
              className="mb-2 rounded-xl"
              src={leader.image}
              alt="leader of the expedition"
            ></img>
            <p className="font-mono font-bold uppercase p-2 text-start text-xl">
              {leader.name}
            </p>
            <p className="font-mono p-2 mb-2 text-start ">
              {leader.description}
            </p>
          </div>
        );
      })}
      <div className="card bg-gradient-to-r from-amber-100 to-cyan-100">
        <p className="font-mono mb-2">
          Do you know a remote island and want to show it to a group of
          travelers? On our website we give you the opportunity to become a tour
          leader and create your own expedition to a remote island. You want to
          know more? Then...
        </p>
        <Link className="btn mb-10" to="/register">
          Register as Leader
        </Link>
      </div>
    </div>
  );
}

export default Leaders;
