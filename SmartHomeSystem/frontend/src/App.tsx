import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLandingPage from "./Dashboard/DashboardLandingPage";
import Simulation from "./Simulation/Simulation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLandingPage />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
