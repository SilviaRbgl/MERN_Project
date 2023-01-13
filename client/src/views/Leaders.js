import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Spinner } from "flowbite-react";

function Leaders() {
  const [leader, setLeader] = useState([]);
  const { loading, setLoading, server } = useContext(AuthContext);

  const fetchLeaders = async () => {
    const response = await fetch(`${server}/api/leaders/all/`);
    const result = await response.json();
    console.log("result", result);
    setLeader(result.allLeaders);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchLeaders();
    }, 1200);
  }, []);

  return (
    <>
      <div className="background grid gap-10 md:grid-rows-2 lg:grid-rows-3 lg:mx-40">
        {!loading ? (
          leader.map((leader, index) => {
            return (
              <div className="rounded-xl card" key={index}>
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
                  Expeditions:
                </p>
                {leader.expeditions.map((expedition, index) => {
                  return (
                    <div className="ml-2" key={index}>
                      <button className="btn-reverse p-2 mb-2">
                        {expedition.island}
                      </button>
                    </div>
                  );
                })}

                <div className="card bg-gradient-to-r from-amber-100 to-cyan-100">
                  <p className="font-mono mb-2">
                    Do you know a remote island and want to show it to a group
                    of travellers? On our website we give you the opportunity to
                    become a tour guide and create your own expedition to a
                    remote island. Do you want to know more? Then...
                  </p>
                  <Link className="btn mb-10" to="/register">
                    Register as Leader
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="absolute inset-x-1/2 inset-y-1/3">
            <Spinner color="warning" size="xl" />
          </div>
        )}
      </div>
    </>
  );
}

export default Leaders;
