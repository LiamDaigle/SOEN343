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

const LightModal: React.FC<FormDialogProps> = ({
    open,
    onClose,
}) => {

    const [roomsLights, setRoomsLights] = useState<any[]>([]);

    useEffect(() => {
        const fetchLightsByRoom = async () => {
    
            const fetchRooms = ["0", "1", "2"];
            const roomsLights: any[] = [];

            for (const roomId of fetchRooms) {
                try {
                    const lightsResponse = await axios.post(
                        "http://localhost:8080/api/rooms/findAllLights",
                        {
                            id: roomId,
                        }
                    );

                    const roomName = lightsResponse.data.length > 0 ? lightsResponse.data[0].room.name : "";

                    roomsLights.push({
                        roomId: roomId,
                        roomName: roomName,
                        lights: lightsResponse.data.map((light: any) => ({
                            id: light.id,
                            on: light.on
                        }))
                    });

                } catch (error) {
                    console.error(`Error fetching lights for room ${roomId}:`, error);
                }
            }

            setRoomsLights(roomsLights);
        }

        fetchLightsByRoom();
    }, []); // Empty dependency array to execute only once when component mounts

    //TODO: implement toggle functionality
    // const toggleLight = async (roomId: string, lightId: number, newStatus: boolean) => {
    //     try {
    //         const light = {
    //             "room": {
    //                 "id":0,
    //                 "name": "backyard"
    //             },
    //             "on": true

    //           }
    //         const response = await axios.put(
    //             `http://localhost:8080/api/lights/${id}/${light}`,
                
    //         );
    //       // Assuming successful toggling, update the state accordingly
    //       const updatedRoomsLights = roomsLights.map(roomLights => {
    //         if (roomLights.roomId === roomId) {
    //           const updatedLights = roomLights.lights.map((light: any) => {
    //             if (light.id === lightId) {
    //               return { ...light, on: newStatus };
    //             }
    //             return light;
    //           });
    //           return { ...roomLights, lights: updatedLights };
    //         }
    //         return roomLights;
    //       });
    //       setRoomsLights(updatedRoomsLights);
    //     } catch (error) {
    //       console.error('Error toggling light:', error);
    //     }
    // };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent className="dialog-container custom controls-modal">
                <DialogContentText className="dialog-subheading custom">
                    All Lights
                </DialogContentText>
                <div>
                    {roomsLights.map(roomLights => (
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
                                            <td>{light.on ? 'On' : 'Off'}</td>
                                            <td>
                                                <button>
                                                    {light.on ? 'Turn Off' : 'Turn On'}
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
