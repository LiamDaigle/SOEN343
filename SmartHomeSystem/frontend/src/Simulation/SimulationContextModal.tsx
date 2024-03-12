import React, { useState } from "react";
import Button from "../Common/Button";
import "./SimulationContextModal.css";


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

enum Item {
  PLANT = "Plant",
  TABLE = "Table",
  CHAIR = "Chair",
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
  const [selectedWindowRoom, setSelectedWindowRoom] = useState<Room>(Room.LIVING_ROOM);
  const [selectedWindowItem, setSelectedWindowItem] = useState<Item>(Item.PLANT);


  const handlePlaceInhabitant = () => {
    // Logic to place the selected inhabitant in the selected room
    console.log(`Placing ${selectedInhabitant} in ${selectedRoom}`);
  };

  const handleBlockWindow = () => {
    // Logic to block the window in the selected room with the selected item
    console.log(`Placing ${selectedInhabitant} in ${selectedRoom}`);
  }


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
      <button
        className="modal-buttons"
        onClick={handlePlaceInhabitant}> 
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
      <div className={`block-window-in ${windowBlocked ? '' : 'invisible'}`}>
        <label>Block Window in the:</label>
          <select
            value={selectedWindowRoom}
            onChange={(e) => setSelectedWindowRoom(e.target.value as Room)}
          >
            {Object.values(Room).map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
      </div>
      <div className={`block-window-with ${windowBlocked ? '' : 'invisible'}`}>
        <label>Block Window with :</label>
          <select
            value={selectedWindowItem}
            onChange={(e) => setSelectedWindowItem(e.target.value as Item)}
          >
            {Object.values(Item).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
      </div>
      <button
        className="modal-buttons"
        onClick={onClose}
        > 
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
