import React, { useState } from "react";
import "./TabComponent.css";
import SHSLandingPage from "../SmartHomeSimulator/SHSLandingPage";
import SHCLandingPage from "../SmartHomeCore/SHCLandingPage";
import SHHLandingPage from "../SmartHomeHeating/SHHLandingPage";

const TabComponent = (props: any) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  
  return (
    <div className="tab-container">
      <div className="tab-header">
        {["SHS", "SHH", "SHC", "SHP"].map((tabName, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tabName}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {/*TODO: put the components for each tab here*/}
        {activeTab === 0 && (
          <SHSLandingPage onLogout={props.onLogout} userData={props.userData} onLogin={props.onLogin}/>
        )}
        {activeTab === 1 && (<SHHLandingPage userData={props.userData}/>)}
        {activeTab === 2 && (<SHCLandingPage userData={props.userData}/>)}
        {activeTab === 3 && <p>Content of SHP Tab</p>}
      </div>
    </div>
  );
};

export default TabComponent;
