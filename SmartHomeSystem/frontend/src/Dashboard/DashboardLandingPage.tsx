import React from "react";
import UserProfile from "../UserProfile/UserProfile";
import TabComponent from "./TabComponent";
import "./DashboardLandingPage.css";
import HouseLayoutGrid from "../HouseLayoutGrid/HouseLayoutGrid";

const DashboardLandingPage = (props: any) => {
  console.log(props);

  return (
    <div>
      <h1>Smart Home Simulator</h1>

      <div className="dashboard-content-container">
        <UserProfile userData={props.userData} />
        <TabComponent onLogout={props.onLogout} userData={props.userData} />
        <HouseLayoutGrid />
      </div>
    </div>
  );
};

export default DashboardLandingPage;
