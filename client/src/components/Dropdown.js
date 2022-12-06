import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    console.log('clicked account');
    getProfile();
    redirectTo("/account")
    setOpen(false);
  };

  const submitLogOut = () => {
    console.log('clicked logout');
    logOut()
    redirectTo("/")
    setOpen(false);
  };

    
  return (
    <div className="dropdown">
      <button onClick={handleOpen} className="dropbtn">
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
        {/* {open ? <div>Is Open</div> : <div>Is Closed</div>} */}

      {/* <div class="dropdown">
        <ul>
          <li>My account</li>
          <li>Log out</li>
        </ul>
      </div> */}
    </div>
  );
}

export default Dropdown;
