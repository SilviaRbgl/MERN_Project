import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Expeditions from "./views/Expeditions";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="expeditions" element={<Expeditions />} />
      </Routes>
    </div>
  );
}

export default App;
