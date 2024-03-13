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

const WindowModal: React.FC<FormDialogProps> = ({
    open,
    onClose,
}) => {

    const [roomsWindows, setRoomsWindows] = useState<any[]>([]);

    useEffect(() => {
        const fetchWindowsByRoom = async () => {
            
            const fetchWindows = ["0", "1", "2"];
            const roomsWindows: any[] = [];

            for (const roomId of fetchWindows) {
                try {
                    const WindowsResponse = await axios.post(
                        "http://localhost:8080/api/rooms/findAllWindows",
                        {
                            id: roomId,
                        }
                    );

                    const roomName = WindowsResponse.data.length > 0 ? WindowsResponse.data[0].room.name : "";

                    roomsWindows.push({
                        roomId: roomId,
                        roomName: roomName,
                        Windows: WindowsResponse.data.map((window: any) => ({
                            id: window.id,
                            open: window.open
                        }))
                    });

                    console.log(`Windows for room ${roomId}:`, WindowsResponse.data);
                } catch (error) {
                    console.error(`Error fetching Windows for room ${roomId}:`, error);
                }
            }

            setRoomsWindows(roomsWindows);
        }

        fetchWindowsByRoom();
    }, []); // Empty dependency array to execute only once when component mounts

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent className="dialog-container custom controls-modal">
                <DialogContentText className="dialog-subheading custom">
                    All Windows
                </DialogContentText>
                <div>
                    {roomsWindows.map(roomWindows => (
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
                                            <td>{window.open ? 'Opened' : 'Closed'}</td>
                                            <td>
                                                <button>
                                                    {window.on ? 'Open window' : 'Close window'}
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
