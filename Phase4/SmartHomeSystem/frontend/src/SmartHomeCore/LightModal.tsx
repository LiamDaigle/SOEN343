import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import data from "../assets/exampleHouseLayout.json";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ControlsModalStyle.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import LightOffCommand from "../AxiosCommands/Command Design Pattern/commands/LightOffCommand";
import LightOnCommand from "../AxiosCommands/Command Design Pattern/commands/LightOnCommand";
import SHCInvoker from "../AxiosCommands/Command Design Pattern/SHCInvoker";
import GetAllLightsCommand from "../AxiosCommands/Command Design Pattern/commands/GetAllLightsCommand";
import { timestamp } from "../Common/getTime";
import LightGetByIdCommand from "../AxiosCommands/Command Design Pattern/commands/LightGetByIdCommand";
import RoomFindAllCommand from "../AxiosCommands/Command Design Pattern/commands/RoomFindAllCommand";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const LightModal: React.FC<FormDialogProps> = ({ open, onClose, userData }) => {
  const [roomsLights, setRoomsLights] = useState<any[]>([]);
  const [autoToggle, setAutoToggle] = useState<boolean>(false);

  // Ensure userData and its properties are defined before accessing
  const profileId = userData.id || "";
  const profileName = userData.name || "";
  const profileRole = userData.role || "";

  useEffect(() => {
    fetchLightsByRoom();
  }, []);

  const fetchLightsByRoom = async () => {
    const invoker = new SHCInvoker(new RoomFindAllCommand());
    const allRooms = await invoker.executeCommand();

    const finalRooms: { id: string; name: string }[] = allRooms.map((room) => ({
      id: room.id,
      name: room.name,
    }));

    console.log(finalRooms);

    const roomsLights: any[] = [];

    for (const room of finalRooms) {
      try {
        const getAllLightsCommand = new GetAllLightsCommand(room);
        const invoker = new SHCInvoker(getAllLightsCommand);
        const lightsResponse: Array<object> = await invoker.executeCommand();

        const roomName = room.name;

        roomsLights.push({
          roomId: room.id,
          roomName: roomName,
          lights: lightsResponse.map((light: any) => ({
            id: light.id,
            on: light.on,
          })),
        });
      } catch (error) {
        console.error(`Error fetching lights for room ${room}:`, error);
      }
    }

    setRoomsLights(roomsLights);
  };

  const toggleLight = async (
    roomId: string,
    roomName: string,
    lightId: number,
    newStatus: boolean
  ) => {
    try {
      const light = {
        id: lightId,
        room: {
          id: roomId,
        },
        on: newStatus,
      };

      // Call open light command
      const invoker = new SHCInvoker(new LightGetByIdCommand(light.id));
      const result = await invoker.executeCommand();
      const fetchLight = result.data;

      if (newStatus) {
        const invoker = new SHCInvoker(new LightOnCommand(fetchLight));
        const lightOpened = await invoker.executeCommand();
        console.log(lightOpened);
        writeLightOnToFile(roomName, lightId);
      }
      // Call close light command
      else if (!newStatus) {
        const invoker = new SHCInvoker(new LightOffCommand(fetchLight));
        const lightClosed = await invoker.executeCommand();
        console.log(lightClosed);
        writeLightOffToFile(roomName, lightId);
      }

      // Update the state accordingly
      const updatedRoomsLights = roomsLights.map((roomLights) => {
        if (roomLights.roomId === roomId) {
          const updatedLights = roomLights.lights.map((light: any) => {
            if (light.id === lightId) {
              return { ...light, on: newStatus };
            }
            return light;
          });
          return { ...roomLights, lights: updatedLights };
        }
        return roomLights;
      });
      setRoomsLights(updatedRoomsLights);
    } catch (error) {
      console.error("Error toggling light:", error);
    } finally {
      location.reload();
    }
  };

  // Handler function for auto toggle
  const handleAutoToggle = () => {
    setAutoToggle((prevState) => !prevState);
  };

  const writeLightOnToFile = async (roomName, lightId) => {
    try {
      await axios.post("http://localhost:8080/api/files/write", {
        data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Turn On Light\nEvent Description: User Just Turned On Light Id ${lightId} in ${roomName}\nend`,
      });
    } catch (error) {
      console.error("Error writing Light On data to file:", error);
    }
  };

  const writeLightOffToFile = async (roomName, lightId) => {
    try {
      await axios.post("http://localhost:8080/api/files/write", {
        data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Turn Off Light\nEvent Description: User Just Turned Off Light Id ${lightId} in ${roomName}\nend`,
      });
    } catch (error) {
      console.error("Error writing Light Off data to file:", error);
    }
  };

  const writeAutoLightOnToFile = async (roomName, lightId) => {
    try {
      await axios.post("http://localhost:8080/api/files/write", {
        data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Auto Mode Light On\nEvent Description: Auto Mode Turned On Light Id ${lightId} in ${roomName}\nend`,
      });
    } catch (error) {
      console.error("Error writing Auto Mode Light On data to file:", error);
    }
  };

  const writeAutoLightOffToFile = async (roomName, lightId) => {
    try {
      await axios.post("http://localhost:8080/api/files/write", {
        data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Turn Off Light\nEvent Description: Auto Mode Turned Off Light Id ${lightId} in ${roomName}\nend`,
      });
    } catch (error) {
      console.error("Error writing Auto Mode Light Off data to file:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="dialog-container custom controls-modal">
        <DialogContentText className="dialog-subheading custom">
          All Lights
        </DialogContentText>
        <ToggleButtonGroup
          value={autoToggle ? "auto" : "manual"}
          exclusive
          onChange={handleAutoToggle}
        >
          <ToggleButton value="auto">Auto</ToggleButton>
          <ToggleButton value="manual">Manual</ToggleButton>
        </ToggleButtonGroup>
        <div>
          {roomsLights.map((roomLights) => (
            <div key={roomLights.roomId}>
              <h2>{roomLights.roomName}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Light ID</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roomLights.lights.map((light: any) => (
                    <tr key={light.id}>
                      <td>{`Light ${light.id}`}</td>
                      <td>{light.on ? "On" : "Off"}</td>
                      <td>
                        <button
                          disabled={
                            (userData.role === "Children" ||
                              userData.role === "Guest") &&
                            userData.location != roomLights.roomName
                          }
                          className={`common-btn ${
                            (userData.role === "Children" ||
                              userData.role === "Guest") &&
                            userData.location != roomLights.roomName
                              ? "disabled-button"
                              : "common-btn"
                          }`}
                          onClick={() =>
                            toggleLight(
                              roomLights.roomId,
                              roomLights.roomName,
                              light.id,
                              !light.on
                            )
                          }
                        >
                          {light.on ? "Turn Off" : "Turn On"}
                        </button>
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

export default LightModal;
