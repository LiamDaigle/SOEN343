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

interface MotionDetectorModalProps {
  open: boolean;
  onClose: () => void;
}

const MotionDetectorModal: React.FC<MotionDetectorModalProps> = ({
  open,
  onClose,
}) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const invoker = new SHCInvoker(new RoomFindAllCommand());
      const result = await invoker.executeCommand();

      console.log(result);
      setRooms(result);
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
                onClick={() => {
                  const invoker = new SHCInvoker(
                    new RoomUpdateMotionDetectorsCommand(room.id, false)
                  );
                  invoker.executeCommand();
                  location.reload();
                }}
              >
                Remove Motion Detector
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const invoker = new SHCInvoker(
                    new RoomUpdateMotionDetectorsCommand(room.id, true)
                  );
                  invoker.executeCommand();
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
