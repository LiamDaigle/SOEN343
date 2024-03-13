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

const Simulation = (props: any) => {
  const [isSimulationOn, setSimulationOn] = useState(false);
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [contextDialogOpen, setContextDialogOpen] = useState(false); 
  const [selectedRoom, setSelectedRoom] = useState("LivingRoom"); // Change the default room here

  const toggleSimulation = () => {
    setSimulationOn(!isSimulationOn);
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

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const storedDateTime = localStorage.getItem("dateTime");
    if (storedDateTime) {
      const { storedDate, storedTime } = JSON.parse(storedDateTime);
      setDate(storedDate);
      setTime(storedTime);
    } else {
      const currentDate = new Date().toISOString().split("T")[0];
      const currentTime = new Date().toISOString().split("T")[1].substring(0, 5);
      setDate(currentDate);
      setTime(currentTime);
    }
  }, [open]);

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
        <ModeEditIcon style={{ cursor: "pointer" }} onClick={openContextDialog} />
        <div className="user-profile-picture">
          {/* Open dialog on button click */}
          <img
            src="assets/defaultavatar.png"
            alt="profile picture"
            style={{ width: "100%", borderRadius: "50%", cursor: "pointer" }}
            onClick={openContextDialog}
          />
          <p>{props.userData.profile.role}</p>
        </div>
        <div className="user-location">
          <p>Location:</p>
          <p>{selectedRoom}</p>
        </div>
        <div className="outside-temperature">
          <p>Outside Temperature:</p>
          <p>15C</p>
        </div>{" "}
        {/* TODO: change temperature */}
        <div className="data-and-time">
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
          userId={props.userData.id}
          profileId={props.userData.profile.id}
        />
      </Modal>
    </div>
  );
};

export default Simulation;
