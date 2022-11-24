import './App.css';
import { useEffect } from "react";

function App() {

  const getExpeditions = async () => {
    const response = await fetch("http://localhost:5000/api/expeditions/all/")
    const results = await response.json()
    console.log("expeditions >", results);
  }

  useEffect(() => {
    getExpeditions()
  }, [])
  
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
