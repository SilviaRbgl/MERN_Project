import React, { useEffect, useState } from "react";
import { MdOutlineBatteryChargingFull } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function Leaders() {
  const [leader, setLeader] = useState([]);
  // const [expeditions, setExpeditions] = useState([]);
  console.log("leader", leader);

  // const singleExpedition = useLocation();
  // console.log("singleExpedition", singleExpedition);

  const fetchLeaders = async () => {
    const response = await fetch("http://localhost:5000/api/leaders/all/");
    const result = await response.json();
    console.log("result", result);
    setLeader(result.allLeaders);
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  return (
    <div className="background grid gap-10 md:grid-rows-2 lg:grid-rows-3">
      {leader.map((leader, leaderIndex) => {
        const expeditions = leader;

        return (
          <div className="rounded-xl card" key={leaderIndex}>
            <img
              className="mb-2 rounded-xl"
              src={leader.image}
              alt="leader of the expedition"
            ></img>
            <p className="font-mono font-bold uppercase p-2 text-start text-xl">
              {leader.name}
            </p>
            <p className="font-mono p-2 mb-2 text-start">
              {leader.description}
            </p>
            <p className="font-mono font-bold p-2 mb-2 text-start">
              Expeditions
            </p>
            <p>{leader.expeditions[0].island}</p>
            <p>{leader.expeditions[1].island}</p>
          </div>
        );
      })}
      {leader.map((expedition, expeditionIndex) => {
        return (
          <div key={expeditionIndex}>
            <p>{expedition.expeditions[0].island}</p>
            <p>{expedition.expeditions[1].island}</p>
            <p>{expedition.expeditions.island}</p>
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
