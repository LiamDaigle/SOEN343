import React, { useState, useEffect } from "react";
import "./SimulationContextModal.css";
import exampleLayout from "../assets/exampleHouseLayout.json"

interface SimulationContextModalProps {
  open: boolean;
  onClose: () => void;
  inhabitant: string;
  currentRoom: string;
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
}

// interface LayoutData {
//   layout: string[][];
// }

const SimulationContextModal: React.FC<SimulationContextModalProps> = ({
  open,
  onClose,
  inhabitant,
  currentRoom,
  setCurrentRoom,
}) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [windowBlocked, setWindowBlocked] = useState<boolean>(false);
  const [selectedWindowRoom, setSelectedWindowRoom] = useState<string>("");;

  useEffect(() => {
    fetchLayout();
  }, []);

  // const fetchLayout = async () => {
  //   try {
  //     const response = await fetch("../assets/exampleLayout.json");
  //     const data: LayoutData = await response.json();
  //     setRooms(getRoomsFromLayout(data.layout));
  //   } catch (error) {
  //     console.error("Error fetching layout:", error);
  //   }
  // };
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
        if (room && !rooms.includes(room) && room !== currentRoom ) {
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
  
  const handlePlaceInhabitant = () => {
    console.log(`Placing ${inhabitant} in ${currentRoom}`);
  };

  const handleBlockWindow = () => {
    console.log(`Blocking window in ${selectedWindowRoom}`);
  };

  if (!open) return null;

  return (
    <div className="simulation-context-modal">
      <h2>Edit Simulation Context</h2>
      <div>
        <label>Inhabitant: {inhabitant}</label>
      </div>
      <div>
        <label>Select Room:</label>
        <select
          value={currentRoom}
          onChange={(e) => setCurrentRoom(e.target.value)}
        >
          {rooms.map((room) => (
            <option key={room} value={room} disabled={room === currentRoom}>
              {room}
            </option>
          ))}
        </select>
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
        <select
          value={selectedWindowRoom}
          onChange={(e) => setSelectedWindowRoom(e.target.value)}
        >
          {getRoomsWithWindowsFromLayout(exampleLayout.layout).map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
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
