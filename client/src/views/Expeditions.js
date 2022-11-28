import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Expeditions() {

  const [expedition, setExpedition] = useState([]);

  const fetchExpeditions = async () => {
    const response = await fetch("http://localhost:5000/api/expeditions/all/");
    const results = await response.json();
    setExpedition(results.allExpeditions);
    console.log("expeditions >", results);
    console.log(
      "dates expeditions >",
      typeof results.allExpeditions[1].date.beginDate
    );
    console.log(
      new Date(results.allExpeditions[1].date.beginDate).toLocaleDateString()
    );
  };

  useEffect(() => {
    fetchExpeditions();
  }, []);

  const getDates = (date) => {
    let myDate =new Date(date).toLocaleDateString();
      return myDate;
  }
  
  const clickMore = useNavigate();
  const goDetailExpedition = (expedition) => {
    
    clickMore(`${expedition.island}`,{state:expedition}); 
  }

  return (
    <div className="background grid lg:grid-cols-3 gap-10">
      {expedition.map((expedition, index) => {
        return ( 
          <div className="card hover:shadow-lg" key={index}>
            <p className="font-mono font-bold">{expedition.island}</p>
            <p className="font-mono">{expedition.country}</p>
            <p className="font-mono">Dates: {getDates(expedition.date.beginDate)} - {getDates(expedition.date.endDate)}</p>
            <p className="font-mono">Leader: {expedition.leader}</p>
            <button className="btn" onClick={()=> goDetailExpedition(expedition)}>More</button>
            {/* <Link to={`${expedition.island}`}className="btn" state={expedition}>More</Link> */}
          </div>
        );
      })}
    </div>
  );
}

export default Expeditions;
