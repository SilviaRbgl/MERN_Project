import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Expeditions from "./views/Expeditions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="expeditions" element={<Expeditions />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
