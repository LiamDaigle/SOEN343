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
import axios from "axios";

const Simulation = (props: any) => {
  const [isSimulationOn, setSimulationOn] = useState(() => {
    const savedState = localStorage.getItem("simulationOn");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [timeSpeed, setTimeSpeed] = useState(() => {
    const savedSpeed = localStorage.getItem("timeSpeed");
    return savedSpeed ? parseFloat(savedSpeed) : 1;
  });
  const [contextDialogOpen, setContextDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(
    props.userData.profile.location
  );
  const [selectUserModal, setSelectUserModal] = useState(false);
  const [date, setDate] = useState<string>(() => {
    const storedDate = localStorage.getItem("date");
    if (storedDate) {
      return storedDate;
    } else {
      return "1/1/2023";
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
      return "10";
    }
  });
  const [simulationSettings] = useState<string>(() => {
    const storedDate = localStorage.getItem("date") || "2023-01-01";
    const storedTime = localStorage.getItem("time") || "00:00";
    const storedTemperature = localStorage.getItem("temperature") || "10";
    return `${storedDate}, ${storedTime}, ${storedTemperature}`;
  });

  useEffect(() => {
    // Save state to local storage whenever isSimulationOn changes
    localStorage.setItem("simulationOn", JSON.stringify(isSimulationOn));
  }, [isSimulationOn]);

  useEffect(() => {
    // Save state to local storage whenever timeSpeed changes
    localStorage.setItem("timeSpeed", String(timeSpeed));
  }, [timeSpeed]);

  useEffect(() => {
    // Update time every second if simulation is on
    let interval: any = null;
    if (isSimulationOn) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const [hoursStr, minutesStr, secondsStr] = prevTime
            .split(":")
            .map((str) => parseInt(str));
          let hours = hoursStr || 0;
          let minutes = minutesStr || 0;
          let seconds = secondsStr || 0;

          // Calculate next time based on time speed
          let increment = Math.max(Math.floor(1 * timeSpeed), 1); // Ensure there's at least 1 second per interval
          seconds += increment;

          // Adjust minutes and hours if needed
          if (seconds >= 60) {
            seconds -= 60;
            minutes += 1;
          }
          if (minutes >= 60) {
            minutes -= 60;
            hours += 1;
          }
          if (hours >= 24) {
            hours -= 24;
          }

          // Format time
          const nextTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

          // Update the time state
          localStorage.setItem("time", nextTime);
          return nextTime;
        });
      }, 1000 / timeSpeed); // Adjust the interval based on timeSpeed
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isSimulationOn, timeSpeed]);

  useEffect(() => {
    const storedTime = localStorage.getItem("time");
    if (storedTime) {
      setTime(storedTime);
    } else {
      setTime("00:00");
    }
  }, []);

  const toggleSimulation = () => {
    const newValue = !isSimulationOn;
    setSimulationOn(newValue);
    // Call API to update isOpen in the database
    axios
      .put(`http://localhost:8080/api/simulation/0/toggle`, { isOn: newValue })
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error toggling simulation:", error));
  };

  const handleTimeSpeedChange = (value: number) => {
    const roundedValue = Math.round(value * 10) / 10;

    setTimeSpeed(value);
    // Call API to update speed in the database
    axios
      .patch(`http://localhost:8080/api/simulation/0/speed`, value, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error updating speed:", error));
  };

  const openContextDialog = () => {
    setContextDialogOpen(true);
  };

  const closeContextDialog = () => {
    setContextDialogOpen(false);
  };

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
          style={{
            cursor: "pointer",
            display: isSimulationOn ? "block" : "none",
          }}
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
