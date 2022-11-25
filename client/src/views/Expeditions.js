import React, { useEffect, useState } from "react";

function Expeditions() {
  const [expedition, setExpedition] = useState([]);

  const getExpeditions = async () => {
    const response = await fetch("http://localhost:5000/api/expeditions/all/");
    const results = await response.json();
    setExpedition(results.allExpeditions);
    console.log("expeditions >", results);
  };

  useEffect(() => {
    getExpeditions();
  }, []);

  return (
    <div className="bg-slate-50 p-10 grid lg:grid-cols-3 gap-10">
      {expedition.map((expedition) => {
        return (
          // <div className="grid lg:grid-cols-3 gap-10">
          <div className="card">
            <p className="font-mono font-bold">{expedition.island}</p>
            <p className="font-mono">{expedition.country}</p>
            <p className="font-mono">Dates: {expedition.date.beginDate} - {expedition.date.beginDate}</p>
            <p className="font-mono">Leader: {expedition.leader}</p>
          </div>
          // </div>
        );
      })}
    </div>
  );
}

export default Expeditions;
