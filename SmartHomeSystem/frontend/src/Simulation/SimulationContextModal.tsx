import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import "./SimulationContextModal.css";
import exampleLayout from "../assets/exampleHouseLayout.json";
import axios from "axios";
import RoomReceiver from "../AxiosCommands/Command Design Pattern/receivers/RoomReceiver";

interface SimulationContextModalProps {
  open: boolean;
  onClose: () => void;
  inhabitant: string;
  currentRoom: string;
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>
  userId: any;
  profileId: any;
  settings: string
}

const SimulationContextModal: React.FC<SimulationContextModalProps> = ({
  open,
  onClose,
  inhabitant,
  currentRoom,
  setCurrentRoom,
  userId,
  profileId,
  settings
}) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [windowBlocked, setWindowBlocked] = useState<boolean>(false);
  const [selectedWindowRoom, setSelectedWindowRoom] = useState<string>("");
  const [selectedTempRoom, setSelectedTempRoom] = useState<string>(currentRoom);
  const [simulationSettings, setSimulationSettings] = useState<string>(settings);
  const [csvData, setCSVData] = useState<string[][]>([]);

  useEffect(() => {
    fetchLayout();
    fetchCSVData();
  }, []);

  const fetchLayout = () => {
    try {
      const layout = exampleLayout.layout;
      setRooms(getRoomsFromLayout(layout));
      setSelectedWindowRoom(getRoomsWithWindowsFromLayout(layout)[0] || "");
    } catch (error) {
      console.error("Error fetching layout:", error);
    }
  };

  const getRoomsFromLayout = (layout: string[][]) => {
    const rooms: string[] = [];
    layout.forEach((row) => {
      row.forEach((room) => {
        if (room && !rooms.includes(room)) {
          rooms.push(room);
        }
      });
    });
    return rooms;
  };

  const getRoomsWithWindowsFromLayout = (layout: string[][]) => {
    const roomsWithWindows: string[] = [];
    layout.forEach((row) => {
      row.forEach((room) => {
        if (room && !roomsWithWindows.includes(room) && hasWindow(room)) {
          roomsWithWindows.push(room);
        }
      });
    });
    return roomsWithWindows;
  };

  const hasWindow = (room: string) => {
    const roomData = exampleLayout[room as keyof typeof exampleLayout];
    return roomData && 'windows' in roomData && roomData.windows > 0;
  };

  const handleBlockWindow = async () => {
    console.log(`Blocking window in ${selectedWindowRoom}`);
    
    try {
      // Retrieve the window ID based on the selected room
      const windowIdResponse = await RoomReceiver.findByName({ name: selectedWindowRoom });
      const windowId = windowIdResponse.id;
  
      // Make PATCH request to block the window
      await axios.patch(
        `http://localhost:8080/api/windows/${windowId}`,
        { isBlocked: true }
      );
  
      console.log("Window blocked successfully");
      onClose();
    } catch (error) {
      console.error("Error blocking window:", error);
      alert("Failed to block window. Please try again.");
    }
  };

  const handlePlaceInhabitant = async () => {
    console.log(`Placing ${inhabitant} in ${selectedTempRoom}`);
    localStorage.setItem("currentLocation", JSON.stringify(selectedTempRoom));
  
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/users/${userId}/profiles/${profileId}`,
        selectedTempRoom, 
        {
          headers: {
            "Content-Type": "text/plain",
          }
        }
      );
      console.log("Location updated successfully:", response.data);
      setCurrentRoom(selectedTempRoom); // Update parent state with selected room
      onClose();
    } catch (error: any) {
      console.error("Error updating location:", error.response?.data || error.message);
      alert("Failed to update location. Please try again.");
    }
    location.reload();
  };

  const fetchCSVData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/files/csvData");
      setCSVData(response.data);
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    }
  };

  const handleSave = () => {
    // Split the selected value into date/time and temperature
    const [selectedDate, selectedTime, selectedTemperature] = simulationSettings.split(", ");

    // Save the selected date, time, and temperature to local storage
    localStorage.setItem("date", selectedDate);
    localStorage.setItem("time", selectedTime);

    localStorage.setItem("temperature", selectedTemperature);

    // 

    location.reload()
  };

  if (!open) return null;

  return (
    <div className="simulation-context-modal">
      <h2>Edit Simulation Context</h2>
      <div>
        <label>Inhabitant: {inhabitant}</label>
      </div>
      <div>
        <FormControl fullWidth variant="standard" margin="dense">
          <InputLabel>Select Date/Time and Outside Temperature:</InputLabel>
          <Select 
            value={simulationSettings} 
            onChange={(e) => setSimulationSettings(e.target.value as string)}>
            {csvData.map((data, index) => (
              <MenuItem key={index} value={data.join(", ")}>
                {data.join(", ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <button className="modal-buttons" onClick={handleSave}>
        Save
      </button>
      <div>
        <FormControl fullWidth variant="standard" margin="dense">
          <InputLabel>Select Room:</InputLabel>
          <Select
            value={selectedTempRoom}
            onChange={(e) => setSelectedTempRoom(e.target.value as string)}
          >
            {rooms.map((room) => (
              <MenuItem key={room} value={room} disabled={room === selectedTempRoom}>
                {room}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <button className="modal-buttons" onClick={handlePlaceInhabitant}>
        Place Inhabitant
      </button>
      <label className="block-window">
        Do you want to block a window?
        <input
          type="checkbox"
          checked={windowBlocked}
          onChange={() => setWindowBlocked(!windowBlocked)}
        />
      </label>
      <div className={`block-window-in ${windowBlocked ? "" : "invisible"}`}>
        <label>Block Window in the:</label>
        <FormControl fullWidth variant="standard" margin="dense">
          <InputLabel>Select Room:</InputLabel>
          <Select
            value={selectedWindowRoom}
            onChange={(e) => setSelectedWindowRoom(e.target.value as string)}
          >
            {getRoomsWithWindowsFromLayout(exampleLayout.layout).map((room) => (
              <MenuItem key={room} value={room}>
                {room}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <button className="modal-buttons" onClick={onClose}>
        Close
      </button>
      <button
        className={`modal-buttons ${!windowBlocked ? "invisible" : ""}`}
        onClick={handleBlockWindow}
        disabled={!windowBlocked}
      >
        {windowBlocked ? "Block Window" : ""}
      </button>
    </div>
  );
};

export default SimulationContextModal;