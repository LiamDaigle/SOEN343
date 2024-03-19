import React from "react";
import UserProfile from "../UserProfile/UserProfile";
import Simulation from "../Simulation/Simulation";
import TabComponent from "./TabComponent";
import "./DashboardLandingPage.css";
import HouseLayoutGrid from "../HouseLayoutGrid/HouseLayoutGrid";
import OutputConsoleLandingPage from "../OutputConsole/OutputConsoleLandingPage";

const DashboardLandingPage = (props: any) => {
  return (
    <div>
      <h1>Smart Home Simulator</h1>
      <div className="dashboard-content-container">
        <Simulation userData={props.userData} onLogin={props.onLogin} />
        <div className="tab-and-output">
          <TabComponent
            onLogout={props.onLogout}
            userData={props.userData}
            onLogin={props.onLogin}
          />
          <OutputConsoleLandingPage />
        </div>
        <HouseLayoutGrid user={props.userData} />
      </div>
    </div>
  );
};

export default DashboardLandingPage;
