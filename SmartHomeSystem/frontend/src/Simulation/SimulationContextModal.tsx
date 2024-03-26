import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText
} from "@mui/material";
import "./SimulationContextModal.css";
import axios from "axios";
import GetAllWindowsCommand from "../AxiosCommands/Command Design Pattern/commands/GetAllWindowsCommand";
import WindowBlockCommand from "../AxiosCommands/Command Design Pattern/commands/WindowBlockCommand";
import WindowUnblockCommand from "../AxiosCommands/Command Design Pattern/commands/WindowUnblockCommand";
import SHCInvoker from "../AxiosCommands/Command Design Pattern/SHCInvoker";

import { timestamp } from "../Common/getTime";


interface SimulationContextModalProps {
  open: boolean;
  onClose: () => void;
  inhabitant: string;
  currentRoom: string;
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
  userData: any;
  settings: string;
}

const SimulationContextModal: React.FC<SimulationContextModalProps> = ({
  open,
  onClose,
  inhabitant,
  currentRoom,
  setCurrentRoom,
  userData,
  settings,
}) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [roomsWindows, setRoomsWindows] = useState<any[]>([]);
  const [selectedTempRoom, setSelectedTempRoom] = useState<string>(currentRoom);
  const [simulationSettings, setSimulationSettings] =
    useState<string>(settings);
  const [csvData, setCSVData] = useState<string[][]>([]);
  const [showWindowDialog, setShowWindowDialog] = useState(false);

  // Ensure userData and its properties are defined before accessing
  const userId = userData.id || "";
  const profileId = userData.profile?.id || "";
  const profileName = userData.profile?.name || "";
  const profileRole = userData?.profile?.role || "";

  useEffect(() => {
    fetchWindowsRooms();
    fetchCSVData();
  }, []);

  const fetchWindowsRooms = async () => {
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

    setRooms(fetchRoomNames);

    const roomsWindows: any[] = [];

    for (const room of finalRooms) {
      try {
      
        const getAllWindowsCommand = new GetAllWindowsCommand({id:room.id});
          const invoker = new SHCInvoker(getAllWindowsCommand);
          const WindowsResponse: Array<object> =
            await invoker.executeCommand();

        const roomName = room.name;

        roomsWindows.push({
          roomId: room.id,
          roomName: roomName,
          Windows: WindowsResponse.map((window: any) => ({
            id: window.id,
            isBlocked: window.isBlocked,
          })),
        });
      } catch (error) {
        console.error(`Error fetching Windows for room ${room}:`, error);
      }
    }
    setRoomsWindows(roomsWindows);
    console.log(roomsWindows)
  };

  const fetchCSVData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/files/csvData"
      );
      setCSVData(response.data);
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    }
  };

  const toggleWindow = async (
    roomId: string,
    roomName: string,
    windowId: number,
    newStatus: boolean
  ) => {
    try {
      const window = {
        id: windowId,
        room: {
          id: roomId,
        },
        blocked: newStatus,
      };

      console.log(newStatus)

      // Call block window command 
      if (newStatus){
        const windowBlockCommand = new WindowBlockCommand(window)
        const invoker = new SHCInvoker(windowBlockCommand);
        const windowBlocked = await invoker.executeCommand();
        writeBlockWindowToFile(roomName, windowId);
      }
      // Call unblock window command
      else if(!newStatus){
        const windowUnblockCommand = new WindowUnblockCommand(window)
        const invoker = new SHCInvoker(windowUnblockCommand);
        const windowUnblocked = await invoker.executeCommand();
        writeUnblockWindowToFile(roomName, windowId);
      }

      // update the state accordingly
      const updatedRoomsWindows = roomsWindows.map((roomWindows) => {
        if (roomWindows.roomId === roomId) {
          const updatedWindows = roomWindows.Windows.map((window: any) => {
            if (window.id === windowId) {
              return { ...window, isBlocked: newStatus };
            }
            return window;
          });
          return { ...roomWindows, Windows: updatedWindows };
        }
        return roomWindows;
      });
      setRoomsWindows(updatedRoomsWindows);
    } catch (error) {
      console.error("Error toggling window:", error);
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
          },
        }
      );
      console.log("Location updated successfully:", response.data);
      setCurrentRoom(selectedTempRoom); 
      writePlaceInhabitantToFile();
      // onClose();
    } catch (error: any) {
      console.error(
        "Error updating location:",
        error.response?.data || error.message
      );
      alert("Failed to update location. Please try again.");
    }
    location.reload();
  };

  const handleSave = async () => {
    // Split the selected value into date/time and temperature
    const [selectedDate, selectedTime, selectedTemperature] =
      simulationSettings.split(", ");
    console.log(parseFloat(selectedTemperature));

    const response = await axios.post(
      "http://localhost:8080/api/temperature",
      parseFloat(selectedTemperature)
    );

    // Save the selected date, time, and temperature to local storage
    localStorage.setItem("date", selectedDate);
    localStorage.setItem("time", selectedTime);
    localStorage.setItem("temperature", selectedTemperature);

    writeSimulationSettingsToFile();

    location.reload();
  };

  const writePlaceInhabitantToFile = async () => {
    
    try {
      await axios.post(
        "http://localhost:8080/api/files/write",
        {
          data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Move Inhabitant\nEvent Description: User Just Moved Inhabitant to ${selectedTempRoom}\nend`,
        }
      );
    } catch (error) {
      console.error("Error writing Move Inhabitant data to file:", error);
    }
  }

  const writeBlockWindowToFile = async (roomName, windowId) => {
    
    try {
      await axios.post(
        "http://localhost:8080/api/files/write",
        {
          data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Block Window\nEvent Description: User Just Blocked Window Id ${windowId} in ${roomName}\nend`,
        }
      );
    } catch (error) {
      console.error("Error writing Block Window data to file:", error);
    }
  }

  const writeUnblockWindowToFile = async (roomName, windowId) => {

    try {
      await axios.post(
        "http://localhost:8080/api/files/write",
        {
          data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Unblock Window\nEvent Description: User Just Unblocked Window Id ${windowId} in ${roomName}\nend`,
        }
      );
    } catch (error) {
      console.error("Error writing Unblock Window data to file:", error);
    }
  }

  const writeSimulationSettingsToFile = async () => {
    
    try {
      await axios.post(
        "http://localhost:8080/api/files/write",
        {
          data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Edit Simulation Settings\nEvent Description: User Just Changed Simulation Date, Time, and Outside Temperature\nend`,
        }
      );
    } catch (error) {
      console.error("Error writing Simulation Settings data to file:", error);
    }
  }

  if (!open) return null;

  return (
    <>
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
            onChange={(e) => setSimulationSettings(e.target.value as string)}
          >
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
              <MenuItem
                key={room}
                value={room}
                disabled={room === selectedTempRoom}
              >
                {room}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <button className="modal-buttons" onClick={handlePlaceInhabitant}>
        Place Inhabitant
      </button>

      <div style={{ margin: "10px 0" }}></div>

      <label>Block/Unblock Windows Option</label>

      <div style={{ margin: "10px 0" }}></div>

      <button className="modal-buttons" onClick={() => setShowWindowDialog(true)}>
        Manage Windows 
      </button>

      <div style={{ margin: "10px 0" }}></div>

      <button className="modal-buttons" onClick={() => { onClose(); location.reload(); }}>
        Close
      </button>
    </div>

    <Dialog
      open={showWindowDialog}
      onClose={() => { setShowWindowDialog(false)}}
    >
      <DialogContent className="dialog-container custom controls-modal">
        <DialogContentText className="dialog-subheading custom">
          All Windows
        </DialogContentText>
        <div>
          {roomsWindows.map((roomWindows) => (
            <div key={roomWindows.roomId}>
              <h2>{roomWindows.roomName}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Window ID</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roomWindows.Windows.map((window: any) => (
                    <tr key={window.id}>
                      <td>{`window ${window.id}`}</td>
                      <td>{window.isBlocked ? "Blocked" : "Unblocked"}</td>
                      <td>
                        <button
                          disabled={
                            (userData.role === "Children" ||
                              userData.role === "Guest") &&
                            userData.location != roomWindows.roomName
                          }
                          className={`common-btn ${
                            (userData.role === "Children" ||
                              userData.role === "Guest") &&
                            userData.location != roomWindows.roomName
                              ? "disabled-button"
                              : "common-btn"
                          }`}
                          onClick={() =>
                            toggleWindow(
                              roomWindows.roomId,
                              roomWindows.roomName,
                              window.id,
                              !window.isBlocked
                            )
                          }
                        >
                          {window.isBlocked ? "Unblock window" : "Block window"}
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

    </>
  );
};

export default SimulationContextModal;