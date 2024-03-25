import React, { useState, useEffect } from "react";
import "../UserProfile/UserProfile.css";
import "./Simulation.css";
import Button from "../Common/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Modal from "@mui/material/Modal";
import SimulationContextModal from "./SimulationContextModal";
import ProfileSelection from "../SmartHomeSimulator/ProfileSelection";

const Simulation = (props: any) => {
  const [isSimulationOn, setSimulationOn] = useState(false);
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [contextDialogOpen, setContextDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(props.userData.profile.location);
  const [selectUserModal, setSelectUserModal] = useState(false);

  const toggleSimulation = () => {
    setSimulationOn(!isSimulationOn);
    localStorage.setItem("simulationToggle", JSON.stringify(!isSimulationOn));
  };

  const handleTimeSpeedChange = (value: number) => {
    setTimeSpeed(value);
  };

  const openContextDialog = () => {
    setContextDialogOpen(true);
  };

  const closeContextDialog = () => {
    setContextDialogOpen(false);
  };

  const [date, setDate] = useState<string>(() => {
    const storedDate = localStorage.getItem("date");
    if (storedDate) {
      return storedDate;
    } else {
      return "2023-01-01";
    }
  });
  const [time, setTime] = useState<string>(() => {
    const storedTime = localStorage.getItem("time");
    if (storedTime) {
      return storedTime;
    } else {
      return "00:00";
    }
  });
  const [temperature, setTemperature] = useState<string>(() => {
    const storedTemperature = localStorage.getItem("temperature");
    if (storedTemperature) {
      return storedTemperature;
    } else {
      return "-10";
    }
  });

  const [simulationSettings, setSimulationSettings] = useState<string>(() => {
    const storedDate = localStorage.getItem("date") || "2023-01-01";
    const storedTime = localStorage.getItem("time") || "00:00";
    const storedTemperature = localStorage.getItem("temperature") || "-10";
    return `${storedDate}, ${storedTime}, ${storedTemperature}`;
});

  useEffect(() => {
    // Retrieve stored simulation toggle state
    const storedSimulationToggle = localStorage.getItem("simulationToggle");
    if (storedSimulationToggle) {
      const storedIsSimulationOn = JSON.parse(storedSimulationToggle);
      setSimulationOn(storedIsSimulationOn);
    }

    // Retrieve stored current location
    const storedCurrentLocation = localStorage.getItem("currentLocation");
    if (storedCurrentLocation) {
      const storedSelectedRoom = JSON.parse(storedCurrentLocation);
      setSelectedRoom(storedSelectedRoom);
    }

    const storedDate = localStorage.getItem("date");
    if (storedDate) {
      setTemperature(storedDate);
    }

    const storedTime = localStorage.getItem("time");
    if (storedTime) {
      setTemperature(storedTime);
    }

    const storedTemperature = localStorage.getItem("temperature");
    if (storedTemperature) {
      setTemperature(storedTemperature);
    }

    if (storedDate && storedTime) {
      // Parse stored date and time as UTC
      const storedDateTimeUTC = new Date(`${storedDate}T${storedTime}Z`);
      console.log(storedDateTimeUTC)
    
      // Initialize counter
      let counter = 0;

      const interval = setInterval(() => {
        // Increment the counter by 1 second (1000 milliseconds)
        counter += 1000;

        // Calculate the simulated time by adding the counter to the storedDateTimeUTC
        const simulatedTime = new Date(storedDateTimeUTC.getTime() + counter * timeSpeed);

        // Update date and time states
        setDate(simulatedTime.toISOString().split("T")[0]);
        setTime(simulatedTime.toISOString().split("T")[1].substring(0, 5));
      }, 1000); // Update every second

      return () => clearInterval(interval);
    }
    

    // If data is not available, set defaults
    setDate("2023-01-01");
    setTime("00:00");
    setTemperature("-10");

  }, [isSimulationOn, timeSpeed]); 

  return (
    <div className="simulation-container">
      <div className="simulation-controls">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Off</Typography>
          <Switch
            checked={isSimulationOn}
            onChange={toggleSimulation}
            inputProps={{ "aria-label": "ant design" }}
          />
          <Typography>On</Typography>
        </Stack>
        <ModeEditIcon
          style={{ cursor: "pointer", display: isSimulationOn ? "block" : "none" }}
          onClick={openContextDialog}
        />
        <div className="user-profile-picture">
          {/* Open dialog on button click */}
          <img
            src="assets/defaultavatar.png"
            alt="profile picture"
            style={{ width: "100%", borderRadius: "50%", cursor: "pointer" }}
            onClick={openContextDialog}
          />
          <p
            className="user-role-text"
            onClick={() => setSelectUserModal(true)}
          >
            {props.userData.profile.role}
          </p>
        </div>
        <div className="user-location">
          <p>Location:</p>
          <p>{selectedRoom}</p>
        </div>
        <div
          className="outside-temperature"
          style={{ display: isSimulationOn ? "block" : "none" }}
        >
          <p>Outside Temperature:</p>
          <p>{temperature}</p>
        </div>{" "}
        {/* TODO: change temperature */}
        <div
          className="data-and-time"
          style={{ display: isSimulationOn ? "block" : "none" }}
        >
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <div className="time-speed-control">
          <label>Time Speed:</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={timeSpeed}
            onChange={(e) => handleTimeSpeedChange(parseFloat(e.target.value))}
          />
          <span>{timeSpeed}x</span>
        </div>
      </div>
      <Modal open={contextDialogOpen} onClose={closeContextDialog}>
        <SimulationContextModal
          open={contextDialogOpen}
          onClose={closeContextDialog}
          inhabitant={props.userData.profile.role}
          currentRoom={selectedRoom}
          setCurrentRoom={setSelectedRoom}
          userData={props.userData}
          settings={simulationSettings} // to change
        />
      </Modal>
      <ProfileSelection
        open={selectUserModal}
        onClose={() => setSelectUserModal(false)}
        user={props.userData}
        profile={props.userData.profile}
        onLogin={props.onLogin}
      />
    </div>
  );
};

export default Simulation;