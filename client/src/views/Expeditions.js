import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Expeditions() {

  const [expedition, setExpedition] = useState([]);

  const fetchExpeditions = async () => {
    const response = await fetch("http://localhost:5000/api/expeditions/all/");
    const results = await response.json();
    setExpedition(results.allExpeditions);
    // console.log("expeditions >", results.allExpeditions[0].images[0]);
    // console.log(
    //   "dates expeditions >",
    //   typeof results.allExpeditions[1].date.beginDate
    // );
    // console.log(
    //   new Date(results.allExpeditions[1].date.beginDate).toLocaleDateString()
    // );
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
    <div className="background grid md:grid-cols-3 gap-10">
      {expedition.map((expedition, index) => {
        return ( 
          <div className="card hover:shadow-lg" key={index}>
            <p className="font-mono font-bold">{expedition.island}</p>
            <p className="font-mono">{expedition.country}</p>
            <p className="font-mono">Dates: {getDates(expedition.date.beginDate)} - {getDates(expedition.date.endDate)}</p>
            <img className="mb-2" src={expedition?.images && expedition.images[0]} alt="expedition image" />
            <button className="btn" onClick={()=> goDetailExpedition(expedition)}>More</button>
          </div>
        );
      })}
    </div>
  );
}

export default Expeditions;
