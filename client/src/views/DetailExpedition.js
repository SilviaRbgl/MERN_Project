import { useLocation } from "react-router-dom";
// import { MdClose } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import DetailExpeditionAuth from "../components/DetailExpeditionAuth";
import { Carousel } from "flowbite-react";
import Modal from "../components/Modal";

function DetailExpedition() {
  const singleExpedition = useLocation();
  const { user, modal, setModal } = useContext(AuthContext);

  const getDates = (date) => {
    let myDate = new Date(date).toLocaleDateString();
    return myDate;
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  // if (modal) {
  //   document.body.classList.add("active-modal");
  // } else {
  //   document.body.classList.remove("active-modal");
  // }

  return (
    <div className="background mb-10 lg:mx-40">
      {user ? (
        <DetailExpeditionAuth />
      ) : (
        <>
          <div className="card space-y-1 mb-10">
            <div className="saturate-50 mb-4 h-56 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel slideInterval={3000}>
                <img
                  src={
                    singleExpedition.state?.images &&
                    singleExpedition.state.images[0]
                  }
                  alt="island"
                />
                <img
                  src={
                    singleExpedition.state?.images &&
                    singleExpedition.state.images[1]
                  }
                  alt="island"
                />
                <img
                  src={
                    singleExpedition.state?.images &&
                    singleExpedition.state.images[2]
                  }
                  alt="island"
                />
              </Carousel>
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
              Leader: {singleExpedition.state.leader[0].name}
            </p>
            <p className="font-mono">Price: {singleExpedition.state.price}</p>
            <button className="btn" onClick={toggleModal}>
              Reserve
            </button>
            <Modal />
            {/* {modal && (
              <div className="modal">
                <div className="overlay"></div>
                <div className="modal-content">
                  <p className="font-mono font-bold text-center">OOPS!</p>
                  <p className="font-mono text-center">
                    If you want to book an expedition, you have to log in first.
                  </p>
                  <button className="modal-close" onClick={toggleModal}>
                    <MdClose />
                  </button>
                </div>
              </div>
            )} */}
          </div>
          <div className="space-y-5">
            <p className="font-mono font-bold uppercase">Itinerary</p>
            <p className="font-mono">{singleExpedition.state.itinerary}</p>
            <p className="font-mono font-bold uppercase">What is included</p>
            <p className="font-mono">{singleExpedition.state.itinerary}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailExpedition;
