import { useLocation } from "react-router-dom";

function DetailExpedition() {
  const singleExpedition = useLocation();
  console.log("singleExpedition :>> ", singleExpedition);

  return (
    <div className="background">
      <div className="card">
        <p className="font-mono font-bold">{singleExpedition.state.island}</p>
        <p className="font-mono"></p>
      </div>
    </div>
  );
}

export default DetailExpedition;
