import React from "react";
import UserProfile from "./UserProfile";
import TabComponent from "./TabComponent";
import "./DashboardLandingPage.css";
import HouseLayout from "./HouseLayout";

const DashboardLandingPage = () => {
  return (
    <div>
      <h1>Smart Home Simulator</h1>

      <div className="dashboard-content-container">
        <UserProfile />
        <TabComponent />
        <HouseLayout />
      </div>
    </div>
  );
};

export default DashboardLandingPage;
