import "./index.css"
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Expeditions from "./views/Expeditions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./views/Login";
import DetailExpedition from "./views/DetailExpedition";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="expeditions" element={<Expeditions />} />
        <Route path="expeditions/:id" element={<DetailExpedition />} />
        <Route path="login" element={<Login />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
