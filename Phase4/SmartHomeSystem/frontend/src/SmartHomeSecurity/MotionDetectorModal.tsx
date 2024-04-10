import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RoomFindAllCommand from "../AxiosCommands/Command Design Pattern/commands/RoomFindAllCommand";
import SHCInvoker from "../AxiosCommands/Command Design Pattern/SHCInvoker";
import RoomUpdateMotionDetectorsCommand from "../AxiosCommands/Command Design Pattern/commands/RoomUpdateMotionDetectors";
import { getUserData } from "../Common/userData";
import { timestamp } from "../Common/getTime";
import axios from "axios";

interface MotionDetectorModalProps {
  open: boolean;
  onClose: () => void;
}

const MotionDetectorModal: React.FC<MotionDetectorModalProps> = ({
  open,
  onClose,
}) => {
  const [rooms, setRooms] = useState([]);
  const userData = getUserData();
  console.log(userData);

  useEffect(() => {
    const fetchData = async () => {
      const invoker = new SHCInvoker(new RoomFindAllCommand());
      const result = await invoker.executeCommand();

      console.log(result);
      setRooms(result);
      console.log(rooms);
    };

    fetchData();
    setTimeout(() => {}, 1000);
  }, []);

  return (
    <Dialog fullWidth onClose={onClose} open={open}>
      <DialogTitle>Motion Detectors</DialogTitle>
      <DialogContent>
        {rooms.map((room) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingRight: "2vw",
              paddingLeft: "2vw",
            }}
            key={room.name}
          >
            <DialogContentText>{room.name}</DialogContentText>
            {room.hasMotionDetector ? (
              <Button
                onClick={async () => {
                  const invoker = new SHCInvoker(
                    new RoomUpdateMotionDetectorsCommand(room.id, false)
                  );
                  invoker.executeCommand();
                  try {
                    await axios.post("http://localhost:8080/api/files/write", {
                      data: `Timestamp: ${timestamp} \nProfile ID: ${userData.profile.id}\nProfile Name: ${userData.profile.name}\nRole: ${userData.profile.id}\nEvent Type: Motion Detectors\nEvent Description: User Removed Motion Detector From ${room.name}\n`,
                    });
                  } catch (error) {
                    console.error("Error writing  SHP data to file:", error);
                  }
                  location.reload();
                }}
              >
                Remove Motion Detector
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  const invoker = new SHCInvoker(
                    new RoomUpdateMotionDetectorsCommand(room.id, true)
                  );
                  invoker.executeCommand();
                  try {
                    await axios.post("http://localhost:8080/api/files/write", {
                      data: `Timestamp: ${timestamp} \nProfile ID: ${userData.profile.id}\nProfile Name: ${userData.profile.name}\nRole: ${userData.profile.id}\nEvent Type: Motion Detectors\nEvent Description: User Added Motion Detector From ${room.name}\n`,
                    });
                  } catch (error) {
                    console.error("Error writing  SHP data to file:", error);
                  }
                  location.reload();
                }}
              >
                Add Motion Detector
              </Button>
            )}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default MotionDetectorModal;
