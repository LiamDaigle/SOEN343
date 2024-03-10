import React, { useState } from "react";
import "./TabComponent.css";

const TabComponent = () => {
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
        {activeTab === 0 && <p>Content of SHS Tab</p>}
        {activeTab === 1 && <p>Content of SHH Tab</p>}
        {activeTab === 2 && <p>Content of SHC Tab</p>}
        {activeTab === 3 && <p>Content of SHP Tab</p>}
      </div>
    </div>
  );
};

export default TabComponent;
