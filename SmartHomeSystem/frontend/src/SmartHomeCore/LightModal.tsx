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

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const LightModal: React.FC<FormDialogProps> = ({ open, onClose, userData }) => {
  const [roomsLights, setRoomsLights] = useState<any[]>([]);
  const [autoToggle, setAutoToggle] = useState<boolean>(false);

  useEffect(() => {

    fetchLightsByRoom();
  }, []);

  const fetchLightsByRoom = async () => {
    const fetchRoomsId = ["0", "1", "2", "3", "4"];
    const fetchRoomNames = [
      "Backyard",
      "Entrance",
      "Garage",
      "LivingRoom",
      "Bedroom",
    ];

    const finalRooms: { id: string; name: string }[] = fetchRoomsId.map(
      (roomId, index) => ({
        id: roomId,
        name: fetchRoomNames[index],
      })
    );

    const roomsLights: any[] = [];

    for (const room of finalRooms) {
      try {
        const getAllLightsCommand = new GetAllLightsCommand({id:room.id});
        const invoker = new SHCInvoker(getAllLightsCommand);
        const lightsResponse: Array<object> =
          await invoker.executeCommand();

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
      if (newStatus){
        console.log(light)
        const lightOnCommand = new LightOnCommand(light)
        const invoker = new SHCInvoker(lightOnCommand);
        const lightOpened = await invoker.executeCommand();
      }
      // Call close light command
      else if(!newStatus){
        console.log(light)
        const lightOffCommand = new LightOffCommand(light)
        const invoker = new SHCInvoker(lightOffCommand);
        const lightClosed = await invoker.executeCommand();
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
    }
  };

  // Handler function for auto toggle
  const handleAutoToggle = () => {
    setAutoToggle((prevState) => !prevState);
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
                            toggleLight(roomLights.roomId, light.id, !light.on)
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
