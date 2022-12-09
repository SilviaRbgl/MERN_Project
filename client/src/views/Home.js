import { Carousel } from "flowbite-react";
import React from "react";
import { NavLink } from "react-router-dom";
import "../Home.css";
import Diego_Garcia01 from "../images/Diego_Garcia01.jpg";
import Easter_Island01 from "../images/Easter_Island01.jpg";
import Nicobar_Islands01 from "../images/Nicobar_Islands01.jpg";
import Pitcairn_Island01 from "../images/Pitcairn_Island01.jpg";
import Revillagigedo01 from "../images/Revillagigedo01.jpg";
import South_Georgia01 from "../images/South_Georgia01.jpg";
import Svalbard01 from "../images/Svalbard01.jpg";
import Socotra01 from "../images/Socotra01.jpg";

function Home() {
  return (
    <>
      <div className="flex-col text-center mt-40 mb-20 mx-12">
        <NavLink
          to="/expeditions"
          className="font-mono font-bold text-2xl no-underline hover:underline hover:text-cyan-600"
        >
          remote island expeditions
        </NavLink>
        {/* <svg
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="#06b6d4"
          strokeWidth="3"
          d="M365 23c-10.094 0-13.036 10-26.071 10-13.036 0-13.036-10-26.072-10s-13.036 10-26.071 10c-13.036 0-13.036-10-26.072-10-13.035 0-13.035 10-26.071 10-13.036 0-13.036-10-26.072-10-13.035 0-13.035 10-26.071 10-13.036 0-13.036-10-26.071-10-13.036 0-13.036 10-26.072 10s-13.036-10-26.071-10C91.25 23 91.25 33 78.214 33 65.18 33 65.18 23 52.143 23 39.107 23 39.107 33 26.07 33 13.036 33 10 23 0 23M390 3c-10.094 0-13.036 10-26.071 10-13.036 0-13.036-10-26.072-10s-13.036 10-26.071 10C298.75 13 298.75 3 285.714 3c-13.035 0-13.035 10-26.071 10-13.036 0-13.036-10-26.072-10-13.035 0-13.035 10-26.071 10-13.036 0-13.036-10-26.071-10-13.036 0-13.036 10-26.072 10S142.321 3 129.286 3c-13.036 0-13.036 10-26.072 10C90.18 13 90.18 3 77.143 3 64.107 3 64.107 13 51.07 13 38.036 13 35 3 25 3"
        />
      </svg> */}
      </div>

      <div className="saturate-50 m-10 h-56 sm:h-64 xl:h-80 2xl:h-96 l:mx-40">
        <Carousel slideInterval={2000}>
          <img src={Nicobar_Islands01} alt="Nicobar Island" />
          <img src={Revillagigedo01} alt="Revillagigedo Island" />
          <img src={Pitcairn_Island01} alt="Pitcairn Island" />
          <img src={Socotra01} alt="Easter Island" />
          <img src={South_Georgia01} alt="Diego Garcia Island" />
          <img src={Easter_Island01} alt="Easter Island" />
          <img src={Svalbard01} alt="Pitcairn Island" />
        </Carousel>
      </div>
    </>
  );
}

export default Home;
