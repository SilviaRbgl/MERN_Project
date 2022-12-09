import { useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import DetailExpeditionAuth from "../components/DetailExpeditionAuth";

function DetailExpedition() {
  const singleExpedition = useLocation();
  const { user, setUser } = useContext(AuthContext);
  // console.log("singleExpedition :>> ", singleExpedition);
  // console.log("images singleExpedition >>", singleExpedition.state.images);
  const [modal, setModal] = useState(false);

  const getDates = (date) => {
    let myDate = new Date(date).toLocaleDateString();
    return myDate;
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="background">
      {Object.keys(user).length !== 0 ? ( // we do this, not to receive a user as an empty object.
        <DetailExpeditionAuth />
      ) : (
        <>
          <div className="card mb-4">
            <div className="slideshow-images">
              <img
                className="mb-2"
                src={
                  singleExpedition.state?.images &&
                  singleExpedition.state.images[1]
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
            {/* <p className="font-mono"></p>
        <button className="btn-favorite">
          <MdFavoriteBorder />
        </button>
        <br /> */}
            <button className="btn" onClick={toggleModal}>
              Reserve
            </button>
            {modal && (
              <div className="modal">
                <div className="overlay"></div>
                <div className="modal-content">
                  <p className="font-mono font-bold text-center">OOPS!</p>
                  <p className="font-mono text-center">
                    If you want to book an expedition, <br />
                    you have to log in first.
                  </p>
                  <button className="close-modal" onClick={toggleModal}>
                    <MdClose />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            <p className="font-mono font-bold uppercase mb-2">Itinerary</p>
            <p className="font-mono mb-10">
              {singleExpedition.state.itinerary}
            </p>
            <p className="font-mono font-bold uppercase mb-2">
              What is included
            </p>
            <p className="font-mono">{singleExpedition.state.itinerary}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailExpedition;
