import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonLinesFill } from "react-icons/bs";

function Dropdown() {

    const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleMenuOne = () => {
    console.log('clicked one');
    setOpen(false);
  };

  const handleMenuTwo = () => {
    console.log('clicked two');
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
            <button onClick={handleMenuOne}>My account</button>
          </li>
          <li className="menu-item">
            <button onClick={handleMenuTwo}>Log out</button>
          </li>
        </ul>
      ) : null}
        {open ? <div>Is Open</div> : <div>Is Closed</div>}

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
