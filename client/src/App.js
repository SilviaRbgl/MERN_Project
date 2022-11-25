import "./index.css"
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Expeditions from "./views/Expeditions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./views/Login";
import Register from "./views/Register";
import DetailExpedition from "./views/DetailExpedition";
import Leaders from "./views/Leaders";


function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="expeditions" element={<Expeditions />} />
        <Route path="expeditions/:island" element={<DetailExpedition />} />
        <Route path="leaders" element={<Leaders />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
