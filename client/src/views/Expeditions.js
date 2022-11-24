import React, { useEffect, useState } from "react";
import CardExpedition from "../components/CardExpedition";

function Expeditions() {
  
  const [expedition, setExpedition] = useState([]);

  const getExpeditions = async () => {
    const response = await fetch("http://localhost:5000/api/expeditions/all/");
    const results = await response.json();
    setExpedition(results.allExpeditions)
    console.log("expeditions >", results);
  };

  useEffect(() => {
    getExpeditions();
  }, []);

  return(
        <div className="bg-slate-50">
            {expedition.map((expedition, index) => {
                return <CardExpedition key={index} expedition={expedition} />
                // return (
                //     <p>{expedition.island}</p>
                // )
            })}
        </div>


  )
}

export default Expeditions;
