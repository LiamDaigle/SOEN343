import React, { useEffect, useState } from "react";
import "./OutputConsoleLandingPage.css";
import LogDetails from "./LogDetails";

const OutputConsoleLandingPage = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend API
        const response = await fetch("http://localhost:8080/api/files/read");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Set logs state with the fetched data
        setLogs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when the component mounts
    fetchData();

    // Establish SSE connection to receive real-time updates
    const eventSource = new EventSource("http://localhost:8080/api/files/stream");

    eventSource.onmessage = function(event) {
      const newLog = event.data;
      // Update logs state with new log
      setLogs(prevLogs => [...prevLogs, newLog]);
    };

    return () => {
      eventSource.close();
    };
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
