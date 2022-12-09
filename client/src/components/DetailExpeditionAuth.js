import { useLocation } from "react-router-dom";
import { MdFavoriteBorder, MdOutlineBatteryChargingFull } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function DetailExpeditionAuth() {
  const singleExpedition = useLocation();

  const { user, setUser } = useContext(AuthContext);
  console.log("user favourites >> ", user.favourites);
  console.log("expeditionID", singleExpedition.state._id);

  const getDates = (date) => {
    let myDate = new Date(date).toLocaleDateString();
    return myDate;
  };

  const isFavourite = (expeditionID) => {
    // console.log("expeditionId :>> ", expeditionID);
    // console.log("user.favourites :>> ", user.favourites);
    if (user.favourites.length > 0 && user.favourites.includes(expeditionID)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="card mb-4">
        <div className="slideshow-images">
          <img
            className="mb-2"
            src={
              singleExpedition.state?.images && singleExpedition.state.images[1]
            }
            alt="expedition image"
          />
          {/* <img className="mb-2" src={singleExpedition.state?.images && singleExpedition.state.images[1]} alt="expedition image" /> */}
        </div>

        <p className="font-mono font-bold">
          {singleExpedition.state.island}, {singleExpedition.state.country}
        </p>
        <p className="font-mono">Dates:</p>
        <p className="font-mono">
          {getDates(singleExpedition.state.date.beginDate)} -{" "}
          {getDates(singleExpedition.state.date.endDate)}
        </p>
        <p className="font-mono">
          Leader: {singleExpedition.state.leader.name}
        </p>
        <p className="font-mono">Price: {singleExpedition.state.price}</p>
        <p className="font-mono"></p>
        <button
          className={
            isFavourite(singleExpedition.state._id)
              ? " btn-favorite-clicked"
              : "btn-favorite"
          }
        >
          {/* {isFavourite(expeditionId) ? color rojo : color azul}  comprueba , en cada boton, si el resultado de la funcion es true or false, y cambias el color con un ternary operator */}
          {console.log(
            "isFavorite>>>",
            isFavourite(singleExpedition.state._id)
          )}
          <MdFavoriteBorder />
        </button>
        <br />
        <button className="btn">Reserve</button>
      </div>
      <p className="font-mono font-bold uppercase mb-2">Itinerary</p>
      <p className="font-mono mb-10">{singleExpedition.state.itinerary}</p>
      <p className="font-mono font-bold uppercase mb-2">What is included</p>
      <p className="font-mono mb-10">{singleExpedition.state.itinerary}</p>

      <div className="container-comment" action="">
        <p className="font-mono font-bold uppercase mb-2">
          Travellers opinions
        </p>
        <input
          className="rounded border-2 border-cyan-500 w-full pt-2 pl-2 pr-14 pb-14 font-mono outline-1 outline-cyan-600"
          type="text"
          placeholder="Write your opinion"
          name="message"
          required
        />
        <label htmlFor="message"></label>
        <br></br>
        <button className="btn" type="submit">
          Submit opinion
        </button>
      </div>
      {/* </div> */}
    </>
  );
}

export default DetailExpeditionAuth;
