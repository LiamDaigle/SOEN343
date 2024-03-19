// OutputConsoleLandingPage.js

import React, { useEffect, useState } from "react";
import "./OutputConsoleLandingPage.css";
import LogDetails from "./LogDetails";

const OutputConsoleLandingPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/files/read");
        if (!response.ok) {
          throw new Error("Failed to fetch logs");
        }
        const logs = await response.json();
        setLogs(logs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="output-console-container">
      <h3>Output Console</h3>
      {/* Pass logs to LogDetails component */}
      <LogDetails logs={logs} />
    </div>
  );
};

export default OutputConsoleLandingPage;
