import Dialog from "@mui/material/Dialog";
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
        
            const fetchRoomsId = ["0", "1", "2", "3", "4"];
            const fetchRoomNames = ["Backyard", "Garage", "Entrance", "Bedroom", "LivingRoom"];
    
            const finalRooms: { id: string; name: string }[] = fetchRoomsId.map((roomId, index) => ({
                id: roomId,
                name: fetchRoomNames[index],
            }));

            const roomsDoors: any[] = [];

            for (const room of finalRooms) {
                try {
                    const doorsResponse = await axios.post(
                        "http://localhost:8080/api/rooms/findAllDoors",
                        {
                            id: room.id,
                        }
                    );

                    const roomName = room.name;

                    roomsDoors.push({
                        roomId: room.id,
                        roomName: roomName,
                        doors: doorsResponse.data.map((door: any) => ({
                            id: door.id,
                            open: door.open
                        }))
                    });

                } catch (error) {
                    console.error(`Error fetching doors for room ${room}:`, error);
                }
            }

            setRoomsDoors(roomsDoors);
        }

        fetchDoorsByRoom();
    }, []);

    const toggleDoor = async (roomId: string, doorId: number, newStatus: boolean) => {
        try {
            const door = {
                "room": {
                    "id":roomId,
                },
                "open": newStatus

              }
            const response = await axios.put(
                `http://localhost:8080/api/doors/${doorId}`, door
                
            );

          // Update the state accordingly
          const updatedRoomsDoors = roomsDoors.map(roomDoors => {
            if (roomDoors.roomId === roomId) {
              const updatedDoors = roomDoors.doors.map((door: any) => {
                if (door.id === doorId) {
                  return { ...door, open: newStatus };
                }
                return door;
              });
              return { ...roomDoors, doors: updatedDoors };
            }
            return roomDoors;
          });
          setRoomsDoors(updatedRoomsDoors);
        } catch (error) {
          console.error('Error toggling door:', error);
        }
    };
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
                                                <button onClick={() => toggleDoor(roomDoors.roomId, door.id, !door.open)}>
                                                    {door.open ? 'Close Door' : 'Open Door'}
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
