import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ControlsModalStyle.css";
import GetAllWindowsCommand from "../AxiosCommands/Command Design Pattern/commands/GetAllWindowsCommand";
import WindowCloseCommand from "../AxiosCommands/Command Design Pattern/commands/WindowCloseCommand";
import WindowOpenCommand from "../AxiosCommands/Command Design Pattern/commands/WindowOpenCommand";
import SHCInvoker from "../AxiosCommands/Command Design Pattern/SHCInvoker";

import { timestamp } from "../Common/getTime";
import WindowGetByIdCommand from "../AxiosCommands/Command Design Pattern/commands/WindowGetByIdCommand";
import RoomFindAllCommand from "../AxiosCommands/Command Design Pattern/commands/RoomFindAllCommand";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const WindowModal: React.FC<FormDialogProps> = ({
  open,
  onClose,
  userData,
}) => {
  const [roomsWindows, setRoomsWindows] = useState<any[]>([]);

  // Ensure userData and its properties are defined before accessing
  const profileId = userData.id || "";
  const profileName = userData.name || "";
  const profileRole = userData.role || "";

  useEffect(() => {
    fetchWindowsByRoom();
  }, []);

  const fetchWindowsByRoom = async () => {
    const invoker = new SHCInvoker(new RoomFindAllCommand());
    const allRooms = await invoker.executeCommand();

    const finalRooms: { id: string; name: string }[] = allRooms.map((room) => ({
      id: room.id,
      name: room.name,
    }));

    const roomsWindows: any[] = [];

    for (const room of finalRooms) {
      try {
        const getAllWindowsCommand = new GetAllWindowsCommand(room);
        const invoker = new SHCInvoker(getAllWindowsCommand);
        const WindowsResponse: Array<object> = await invoker.executeCommand();

        const roomName = room.name;

        roomsWindows.push({
          roomId: room.id,
          roomName: roomName,
          Windows: WindowsResponse.map((window: any) => ({
            id: window.id,
            open: window.open,
          })),
        });
      } catch (error) {
        console.error(`Error fetching Windows for room ${room}:`, error);
      }
    }
    setRoomsWindows(roomsWindows);
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
        open: newStatus,
      };

      const invoker = new SHCInvoker(new WindowGetByIdCommand(window.id));
      const result = await invoker.executeCommand();
      const fetchWindow = result.data;
      // Call open window command
      if (newStatus) {
        const invoker = new SHCInvoker(new WindowOpenCommand(fetchWindow));
        const windowOpened = await invoker.executeCommand();
        console.log(windowOpened);
        writeOpenWindowToFile(roomName, windowId);
      }
      // Call close window command
      else if (!newStatus) {
        const invoker = new SHCInvoker(new WindowCloseCommand(fetchWindow));
        const windowClosed = await invoker.executeCommand();
        console.log(windowClosed);
        writeCloseWindowToFile(roomName, windowId);
      }

      // update the state accordingly
      const updatedRoomsWindows = roomsWindows.map((roomWindows) => {
        if (roomWindows.roomId === roomId) {
          const updatedWindows = roomWindows.Windows.map((window: any) => {
            if (window.id === windowId) {
              return { ...window, open: newStatus };
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
    } finally {
      location.reload();
    }
  };

  const writeOpenWindowToFile = async (roomName, windowId) => {
    try {
      await axios.post("http://localhost:8080/api/files/write", {
        data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Open Window\nEvent Description: User Just Opened Window Id ${windowId} in ${roomName}\nend`,
      });
    } catch (error) {
      console.error("Error writing Open Window data to file:", error);
    }
  };

  const writeCloseWindowToFile = async (roomName, windowId) => {
    console.log(windowId.toString(), " and ", roomName);
    try {
      await axios.post("http://localhost:8080/api/files/write", {
        data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Close Window\nEvent Description: User Just Closed Window Id ${windowId} in ${roomName}\nend`,
      });
    } catch (error) {
      console.error("Error writing Close Window data to file:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
                      <td>{window.open ? "Opened" : "Closed"}</td>
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
                              !window.open
                            )
                          }
                        >
                          {window.open ? "Close window" : "Open window"}
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

export default WindowModal;
