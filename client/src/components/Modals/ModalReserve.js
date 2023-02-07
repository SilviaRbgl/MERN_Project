import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";

function ModalReserve() {
  const { modal, setModal } = useContext(AuthContext);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <p className="font-mono font-bold text-center">HURRAH!</p>
            <p className="font-mono text-center">
              Thank you for your interest in this expedition, you will receive
              an email with all the booking details!
            </p>
            <button className="modal-close" onClick={toggleModal}>
              <MdClose />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalReserve;
