import React, { useState } from "react";
import Button from "../Common/Button";

interface SimulationContextModalProps {
  open: boolean;
  onClose: () => void;
}

enum Inhabitant {
  PARENT = "Parent",
  CHILD = "Child",
  GUEST = "Guest",
  STRANGER = "Stranger",
}

enum Room {
  LIVING_ROOM = "Living Room",
  BEDROOM = "Bedroom",
  KITCHEN = "Kitchen",
  OUTSIDE = "Outside",
}

const SimulationContextModal: React.FC<SimulationContextModalProps> = ({
  open,
  onClose,
}) => {
  const [selectedInhabitant, setSelectedInhabitant] = useState<Inhabitant>(
    Inhabitant.PARENT
  );
  const [selectedRoom, setSelectedRoom] = useState<Room>(Room.LIVING_ROOM);
  const [windowBlocked, setWindowBlocked] = useState<boolean>(false);

  const handlePlaceInhabitant = () => {
    // Logic to place the selected inhabitant in the selected room
    console.log(`Placing ${selectedInhabitant} in ${selectedRoom}`);
  };

  const handleBlockWindow = () => {
    setWindowBlocked(true);
  };

  if (!open) return null;

  return (
    <div className="simulation-context-modal">
      <h2>Edit Simulation Context</h2>
      <div>
        <label>Select Inhabitant:</label>
        <select
          value={selectedInhabitant}
          onChange={(e) =>
            setSelectedInhabitant(e.target.value as Inhabitant)
          }
        >
          {Object.values(Inhabitant).map((inhabitant) => (
            <option key={inhabitant} value={inhabitant}>
              {inhabitant}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Room:</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value as Room)}
        >
          {Object.values(Room).map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={handlePlaceInhabitant}>Place Inhabitant</Button>
      <div>
        <label>
          Block Window:{" "}
          <input
            type="checkbox"
            checked={windowBlocked}
            onChange={() => setWindowBlocked(!windowBlocked)}
          />
        </label>
      </div>
      <Button onClick={handleBlockWindow}>
        {windowBlocked ? "Window Blocked" : "Block Window"}
      </Button>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default SimulationContextModal;
