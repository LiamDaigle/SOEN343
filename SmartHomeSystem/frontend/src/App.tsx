import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLandingPage from "./Dashboard/DashboardLandingPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLandingPage />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
