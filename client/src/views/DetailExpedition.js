import { useLocation } from "react-router-dom";

function DetailExpedition() {
  const singleExpedition = useLocation();
  console.log("singleExpedition :>> ", singleExpedition);

  const getDates = (date) => {
    let myDate = new Date(date).toLocaleDateString();
    return myDate;
  };

  return (
    <div className="background">
      <div className="card mb-4">
        <p className="font-mono font-bold">
          {singleExpedition.state.island}, {singleExpedition.state.country}
        </p>
        <p className="font-mono">Dates:</p>
        <p className="font-mono">
          {getDates(singleExpedition.state.date.beginDate)} -{" "}
          {getDates(singleExpedition.state.date.endDate)}
        </p>
        <p className="font-mono">Leader: {singleExpedition.state.leader.name}</p>
        <p className="font-mono">Price: {singleExpedition.state.price}</p>
        <p className="font-mono"></p>
        <button className="btn">Reserve</button>
      </div>

      <p className="font-mono font-bold uppercase mb-2">Itinerary</p>
      <p className="font-mono mb-10">{singleExpedition.state.itinerary}</p>
      <p className="font-mono font-bold uppercase mb-2">What is included</p>
      <p className="font-mono">{singleExpedition.state.itinerary}</p>
    </div>
  );
}

export default DetailExpedition;
