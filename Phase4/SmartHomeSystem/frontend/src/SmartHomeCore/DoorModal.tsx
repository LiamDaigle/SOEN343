import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ControlsModalStyle.css";
import DoorOpenCommand from "../AxiosCommands/Command Design Pattern/commands/DoorOpenCommand";
import SHCInvoker from "../AxiosCommands/Command Design Pattern/SHCInvoker";
import DoorCloseCommand from "../AxiosCommands/Command Design Pattern/commands/DoorCloseCommand";
import GetAllDoorsCommand from "../AxiosCommands/Command Design Pattern/commands/GetAllDoorsCommand";
import { timestamp } from "../Common/getTime";
import DoorGetByIdCommand from "../AxiosCommands/Command Design Pattern/commands/DoorGetByIdCommand";
import RoomFindAllCommand from "../AxiosCommands/Command Design Pattern/commands/RoomFindAllCommand";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const DoorModal: React.FC<FormDialogProps> = ({ open, onClose, userData }) => {
  const [roomsDoors, setRoomsDoors] = useState<any[]>([]);

  // Ensure userData and its properties are defined before accessing
  const profileId = userData.id || "";
  const profileName = userData.name || "";
  const profileRole = userData.role || "";

  useEffect(() => {
    const fetchDoorsByRoom = async () => {
      const invoker = new SHCInvoker(new RoomFindAllCommand());
      const allRooms = await invoker.executeCommand();

      const finalRooms: { id: string; name: string }[] = allRooms.map(
        (room) => ({
          id: room.id,
          name: room.name,
        })
      );

      const roomsDoors: any[] = [];

      for (const room of finalRooms) {
        try {
          const getAllDoorsCommand = new GetAllDoorsCommand(room);
          const invoker = new SHCInvoker(getAllDoorsCommand);
          const doorsResponse: Array<object> = await invoker.executeCommand();

          const roomName = room.name;

          roomsDoors.push({
            roomId: room.id,
            roomName: roomName,
            doors: doorsResponse.map((door: any) => ({
              id: door.id,
              open: door.open,
            })),
          });
        } catch (error) {
          console.error(`Error fetching doors for room ${room}:`, error);
        }
      }

      setRoomsDoors(roomsDoors);
    };

    fetchDoorsByRoom();
  }, []);

  const toggleDoor = async (
    roomId: string,
    roomName: string,
    doorId: number,
    newStatus: boolean,
    autoLock: boolean
  ) => {
    try {
      const door = {
        id: doorId,
        room: {
          id: roomId,
        },
        open: newStatus,
        autoLock: autoLock,
      };

      const SHPOn = localStorage.getItem("SHP_on") == "true";
      if (SHPOn) return;
      const invoker = new SHCInvoker(new DoorGetByIdCommand(door.id));
      const result = await invoker.executeCommand();
      const fetchDoor = result.data;
      // Call open door command
      if (newStatus) {
        const invoker = new SHCInvoker(new DoorOpenCommand(fetchDoor));
        const doorOpened = await invoker.executeCommand();
        console.log(doorOpened);
        writeOpenDoorToFile(roomName, doorId);
      }
      // Call close door command
      else if (!newStatus) {
        const invoker = new SHCInvoker(new DoorCloseCommand(fetchDoor));
        const doorClosed = await invoker.executeCommand();
        console.log(doorClosed);
        writeCloseDoorToFile(roomName, doorId);
      }

      // Update the state accordingly
      const updatedRoomsDoors = roomsDoors.map((roomDoors) => {
        if (roomDoors.roomId === roomId) {
          const updatedDoors = roomDoors.doors.map((door: any) => {
            if (door.id === doorId) {
              return { ...door, open: newStatus, autoLock: autoLock };
            }
            return door;
          });
          return { ...roomDoors, doors: updatedDoors };
        }
        return roomDoors;
      });
      setRoomsDoors(updatedRoomsDoors);
    } catch (error) {
      console.error("Error toggling door:", error);
    } finally {
      location.reload();
    }
  };

  const writeOpenDoorToFile = async (roomName, doorId) => {
    try {
      await axios.post("http://localhost:8080/api/files/write", {
        data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Open Door\nEvent Description: User Just Opened Door Id ${doorId} in ${roomName}\nend`,
      });
    } catch (error) {
      console.error("Error writing Open Door data to file:", error);
    }
  };

  const writeCloseDoorToFile = async (roomName, doorId) => {
    try {
      await axios.post("http://localhost:8080/api/files/write", {
        data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Close Door\nEvent Description: User Just Closed Door Id ${doorId} in ${roomName}\nend`,
      });
    } catch (error) {
      console.error("Error writing Close Door data to file:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="dialog-container custom controls-modal">
        <DialogContentText className="dialog-subheading custom">
          All Doors
        </DialogContentText>
        <div>
          {roomsDoors.map((roomDoors) => (
            <div key={roomDoors.roomId}>
              <h2>{roomDoors.roomName}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Door ID</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>AutoLock</th>
                  </tr>
                </thead>
                <tbody>
                  {roomDoors.doors.map((door: any) => (
                    <tr key={door.id}>
                      <td>{`Door ${door.id}`}</td>
                      <td>{door.open ? "Opened" : "Closed"}</td>
                      <td>
                        <button
                          disabled={
                            (userData.role === "Children" ||
                              userData.role === "Guest") &&
                            userData.location != roomDoors.roomName
                          }
                          className={`common-btn ${
                            (userData.role === "Children" ||
                              userData.role === "Guest") &&
                            userData.location != roomDoors.roomName
                              ? "disabled-button"
                              : "common-btn"
                          }`}
                          onClick={() =>
                            toggleDoor(
                              roomDoors.roomId,
                              roomDoors.roomName,
                              door.id,
                              !door.open,
                              door.autoLock
                            )
                          }
                        >
                          {door.open ? "Close Door" : "Open Door"}
                        </button>
                      </td>
                      <td>
                        <label className="toggle">
                          <input
                            type="checkbox"
                            checked={door.autoLock}
                            onChange={() =>
                              toggleDoor(
                                roomDoors.roomId,
                                roomDoors.roomName,
                                door.id,
                                door.open,
                                !door.autoLock
                              )
                            }
                          />
                          <span className="slider round"></span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DoorModal;
