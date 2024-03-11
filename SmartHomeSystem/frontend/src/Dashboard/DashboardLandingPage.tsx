import React from "react";
import UserProfile from "../UserProfile/UserProfile";
import TabComponent from "./TabComponent";
import "./DashboardLandingPage.css";
import HouseLayoutGrid from "../HouseLayoutGrid/HouseLayoutGrid";

const DashboardLandingPage = () => {
  return (
    <div>
      <h1>Smart Home Simulator</h1>

      <div className="dashboard-content-container">
        <UserProfile />
        <TabComponent />
        <HouseLayoutGrid />
      </div>
    </div>
  );
};

export default DashboardLandingPage;
