import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Spinner } from "flowbite-react";

function Expeditions() {
  const { expedition, setExpedition, loading, setLoading, server } =
    useContext(AuthContext);

  const fetchExpeditions = async () => {
    const response = await fetch(`${server}/api/expeditions/all/`);
    const results = await response.json();
    setExpedition(results.allExpeditions);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchExpeditions();
    }, 1200);
  }, []);

  const getDates = (date) => {
    let myDate = new Date(date).toLocaleDateString();
    return myDate;
  };

  const clickMore = useNavigate();
  const goDetailExpedition = (expedition) => {
    clickMore(`${expedition.island}`, { state: expedition });
  };

  return (
    <div className="background mb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10 static">
      {!loading ? (
        expedition.map((expedition, index) => {
          return (
            <div className="card hover:shadow-lg space-y-1" key={index}>
              <p className="font-mono font-bold">{expedition.island}</p>
              <p className="font-mono">{expedition.country}</p>
              <p className="font-mono">
                Dates: {getDates(expedition.date.beginDate)} -{" "}
                {getDates(expedition.date.endDate)}
              </p>
              <img
                src={expedition?.images && expedition.images[0]}
                alt="expedition image"
              />
              <button
                className="btn"
                onClick={() => goDetailExpedition(expedition)}
              >
                More
              </button>
            </div>
          );
        })
      ) : (
        <div className="absolute inset-x-1/2 inset-y-1/3">
          <Spinner color="warning" size="xl" />
        </div>
      )}
    </div>
  );
}

export default Expeditions;
