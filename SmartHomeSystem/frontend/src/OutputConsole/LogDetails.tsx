// LogDetails.js

import React from "react";
import "./LogDetails.css";

const LogDetails = ({ logs }) => {
  console.log(logs);

  return (
    <div>
      {logs.map((log, index) => {
        // Split the log string into lines
        const lines = log.split("\n");
        // Extract details from each line
        const details = lines.map((line) => {
          const [key, value] = line.split(": ");
          return { key, value };
        });

        return (
          <div key={index} className="log-details-container">
            {details.map((detail, detailIndex) => (
              <div key={detailIndex} className="log-detail">
                <strong>{detail.key}:</strong> {detail.value}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default LogDetails;
