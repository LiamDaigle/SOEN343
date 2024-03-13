import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ControlsModalStyle.css";

interface FormDialogProps {
    open: boolean;
    onClose: () => void;
}

const DoorModal: React.FC<FormDialogProps> = ({
    open,
    onClose,
}) => {

    const [roomsDoors, setRoomsDoors] = useState<any[]>([]);

    useEffect(() => {
        const fetchDoorsByRoom = async () => {
        
            const fetchDoors = ["0", "1", "2"];
            const roomsDoors: any[] = [];

            for (const roomId of fetchDoors) {
                try {
                    const doorsResponse = await axios.post(
                        "http://localhost:8080/api/rooms/findAllDoors",
                        {
                            id: roomId,
                        }
                    );

                    const roomName = doorsResponse.data.length > 0 ? doorsResponse.data[0].room.name : "";

                    roomsDoors.push({
                        roomId: roomId,
                        roomName: roomName,
                        doors: doorsResponse.data.map((door: any) => ({
                            id: door.id,
                            open: door.open
                        }))
                    });

                    console.log(`Doors for room ${roomId}:`, doorsResponse.data);
                } catch (error) {
                    console.error(`Error fetching doors for room ${roomId}:`, error);
                }
            }

            setRoomsDoors(roomsDoors);
        }

        fetchDoorsByRoom();
    }, []); // Empty dependency array to execute only once when component mounts

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent className="dialog-container custom controls-modal">
                <DialogContentText className="dialog-subheading custom">
                    All Doors
                </DialogContentText>
                <div>
                    {roomsDoors.map(roomDoors => (
                        <div key={roomDoors.roomId}>
                            <h2>{roomDoors.roomName}</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Door ID</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roomDoors.doors.map((door: any) => (
                                        <tr key={door.id}>
                                            <td>{`Door ${door.id}`}</td>
                                            <td>{door.open ? 'Opened' : 'Closed'}</td>
                                            <td>
                                                <button>
                                                    {door.on ? 'Open Door' : 'Close Door'}
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

export default DoorModal;
