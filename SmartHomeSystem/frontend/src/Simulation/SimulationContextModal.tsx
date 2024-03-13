import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'; // Import necessary MUI components
import "./SimulationContextModal.css";
import exampleLayout from "../assets/exampleHouseLayout.json";
import axios from "axios";

interface SimulationContextModalProps {
  open: boolean;
  onClose: () => void;
  inhabitant: string;
  currentRoom: string;
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>
  userId: any;
  profileId: any;
}

const SimulationContextModal: React.FC<SimulationContextModalProps> = ({
  open,
  onClose,
  inhabitant,
  currentRoom,
  setCurrentRoom,
  userId,
  profileId
}) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [windowBlocked, setWindowBlocked] = useState<boolean>(false);
  const [selectedWindowRoom, setSelectedWindowRoom] = useState<string>("");

  useEffect(() => {
    fetchLayout();
  }, []);

  console.log(currentRoom)

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

  // const handlePlaceInhabitant = () => {
  //   console.log(`Placing ${inhabitant} in ${currentRoom}`);
  // };

  const handleBlockWindow = () => {
    console.log(`Blocking window in ${selectedWindowRoom}`);
  };

  const handlePlaceInhabitant = async () => {
    console.log(`Placing ${inhabitant} in ${currentRoom}`);
  
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/users/${userId}/profiles/${profileId}`,
        {
          currentRoom
        }
      );
      console.log(currentRoom)
      console.log("Location updated successfully:", response.data);
      onClose(); // Close the modal after updating the location
    } catch (error: any) {
      console.error("Error updating location:", error.response?.data || error.message);
      alert("Failed to update location. Please try again.");
    }
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
          <InputLabel>Select Room:</InputLabel>
          <Select
            value={currentRoom}
            onChange={(e) => setCurrentRoom(e.target.value as string)}
          >
            {rooms.map((room) => (
              <MenuItem key={room} value={room} disabled={room === currentRoom}>
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
