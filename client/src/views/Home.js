import { Carousel } from "flowbite-react";
import React from "react";
import { NavLink } from "react-router-dom";
import "../Home.css";
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
      <div className="flex-col text-center mt-20 mb-20 mx-12">
        <NavLink
          to="/expeditions"
          className="font-mono font-bold text-2xl no-underline hover:underline hover:text-cyan-600"
        >
          remote island expeditions
        </NavLink>
        <p className="font-mono">off the beaten track islands</p>
      </div>

      <div className="saturate-50 m-10 h-56 sm:h-64 xl:h-80 2xl:h-96 lg:mx-40">
        <Carousel slideInterval={3000}>
          <img src={Nicobar_Islands01} alt="Nicobar Island" />
          <img src={Revillagigedo01} alt="Revillagigedo Island" />
          <img src={Pitcairn_Island01} alt="Pitcairn Island" />
          <img src={Socotra01} alt="Socotra Island" />
          <img src={South_Georgia01} alt="South Georgia Island" />
          <img src={Easter_Island01} alt="Easter Island" />
          <img src={Svalbard01} alt="Svalbard Island" />
        </Carousel>
      </div>
    </>
  );
}

export default Home;
