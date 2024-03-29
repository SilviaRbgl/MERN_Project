import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";

function Dropdown() {
  const { getProfile, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const redirectTo = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const submitAccount = () => {
    getProfile();
    redirectTo("/account");
    setOpen(false);
  };

  const submitLogOut = () => {
    logOut();
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={handleOpen}>
        <BsFillPersonLinesFill />
      </button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button onClick={submitAccount}>My account</button>
          </li>
          <li className="menu-item">
            <button onClick={submitLogOut}>Log out</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default Dropdown;
