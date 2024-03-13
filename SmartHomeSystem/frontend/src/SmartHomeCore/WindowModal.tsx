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
        fetchWindowsByRoom();
    }, []);

    const fetchWindowsByRoom = async () => {

        const fetchRoomsId = ["0", "1", "2", "3", "4"];
        const fetchRoomNames = ["Backyard", "Garage", "Entrance", "Bedroom", "LivingRoom"];
        const finalRooms: { id: string; name: string }[] = fetchRoomsId.map((roomId, index) => ({
            id: roomId,
            name: fetchRoomNames[index],
        }));

        const roomsWindows: any[] = [];

        for (const room of finalRooms) {
            try {
                const WindowsResponse = await axios.post(
                    "http://localhost:8080/api/rooms/findAllWindows",
                    {
                        id: room.id,
                    }
                );

                const roomName = room.name;

                roomsWindows.push({
                    roomId: room.id,
                    roomName: roomName,
                    Windows: WindowsResponse.data.map((window: any) => ({
                        id: window.id,
                        open: window.open
                    }))
                });

            } catch (error) {
                console.error(`Error fetching Windows for room ${room}:`, error);
            }
        }
        setRoomsWindows(roomsWindows);
    }

    const toggleWindow = async (roomId: string, windowId: number, newStatus: boolean) => {
        try {
            const window = {
                "room": {
                    "id": roomId,
                },
                "open": newStatus

            }
            const response = await axios.put(
                `http://localhost:8080/api/windows/${windowId}`, window

            );


            // update the state accordingly
            const updatedRoomsWindows = roomsWindows.map(roomWindows => {
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
            console.error('Error toggling window:', error);
        }
    };

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
                                                <button onClick={() => toggleWindow(roomWindows.roomId, window.id, !window.open)}>
                                                    {window.open ? 'Open window' : 'Close window'}
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
