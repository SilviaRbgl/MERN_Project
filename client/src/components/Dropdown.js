import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonLinesFill } from "react-icons/bs";

function Dropdown() {

  const [open, setOpen] = useState(false);
  const redirectTo = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleMenuAccount = () => {
    console.log('clicked account');
    redirectTo("/account")
    setOpen(false);
  };

  const handleMenuLogout = () => {
    console.log('clicked logout');
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
            <button onClick={handleMenuAccount}>My account</button>
          </li>
          <li className="menu-item">
            <button onClick={handleMenuLogout}>Log out</button>
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
