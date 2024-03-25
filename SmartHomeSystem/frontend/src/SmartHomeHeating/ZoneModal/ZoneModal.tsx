import React, { useEffect } from "react";
import "./ZoneModal.css";
import { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import SHCInvoker from "../../AxiosCommands/Command Design Pattern/SHCInvoker";
import RoomFindAllCommand from "../../AxiosCommands/Command Design Pattern/commands/RoomFindAllCommand";
import ZoneFindAllCommand from "../../AxiosCommands/Command Design Pattern/commands/ZoneFindAllCommand";
import ZoneAddZoneCommand from "../../AxiosCommands/Command Design Pattern/commands/ZoneAddZoneCommand";

interface ZoneModalProps {
  open: boolean;
  onClose: () => void;
}

interface ZoneProps {
  name: string;
}

const ZoneModal: React.FC<ZoneModalProps> = ({ open, onClose }) => {
  const [addingZone, setAddingZone] = useState(false);
  const [chosenRooms, setChosenRooms] = useState(Array<string>);
  const [rooms, setRooms] = useState([]);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const invoker = new SHCInvoker(new RoomFindAllCommand());
      const roomResults = await invoker.executeCommand();
      setRooms(roomResults);

      invoker.setCommand(new ZoneFindAllCommand());
      const zoneResults = await invoker.executeCommand();
      setZones(zoneResults);
      console.log("Zones:");
      console.log(zoneResults);
      setTimeout(() => {}, 1000);
    };

    fetchRooms();
    console.log(rooms);
  }, []);

  const Zone: React.FC<ZoneProps> = ({ name }) => {
    return (
      <DialogContentText style={{ marginBottom: "5vh" }}>
        {name}
      </DialogContentText>
    );
  };

  interface RoomProps {
    name: string;
  }

  const Room = ({ name }: RoomProps) => {
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
      const isSelectedLocalStorage = localStorage.getItem(`${name}_selected`);
      isSelectedLocalStorage === "true"
        ? setIsSelected(true)
        : setIsSelected(false);
    }, [name]);

    const onClick = () => {
      const newRooms: Array<string> = [];
      if (!isSelected) {
        setIsSelected(true);
        localStorage.setItem(`${name}_selected`, "true");
        console.log(`${name} has been selected!`);

        chosenRooms.forEach((room) => newRooms.push(room));
        newRooms.push(name);
        setChosenRooms(newRooms);
      } else {
        setIsSelected(false);
        localStorage.setItem(`${name}_selected`, "false");
        console.log(`${name} has been de-selected!`);

        chosenRooms.forEach((room) => {
          if (room !== name) newRooms.push(room);
        });
        setChosenRooms(newRooms);
      }
    };

    return (
      <div onClick={onClick} className={isSelected ? "room-selected" : "room"}>
        {name}
      </div>
    );
  };

  const ViewZones = () => {
    return (
      <>
        <DialogTitle style={{ color: "black", alignSelf: "center" }}>
          Zones
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setAddingZone(true)}>Add Zone</Button>
        </DialogActions>
        <DialogContent>
          {zones.map((zone) => (
            <Zone name={zone.name} key={zone.name} />
          ))}
        </DialogContent>
      </>
    );
  };

  const AddZones = () => {
    const [zoneName, setZoneName] = useState("");
    const [temperature, setTemperature] = useState(10);
    const [desiredTemperature, setDesiredTemperature] = useState(10);

    const onSubmit = async () => {
      let roomString = "";
      for (let i = 0; i < chosenRooms.length; i++) {
        console.log("iteration");
        if (i === chosenRooms.length - 1)
          roomString = roomString.concat(chosenRooms[i]);
        else {
          roomString = roomString.concat(chosenRooms[i] + ",");
        }
      }
      const requestBody = {
        name: zoneName,
        rooms: roomString,
        temperature: temperature,
        desiredTemperature: desiredTemperature,
        isHvacWorking: true,
      };

      console.log(requestBody);
      const invoker = new SHCInvoker(new ZoneAddZoneCommand(requestBody));
      const result = await invoker.executeCommand();
      console.log(result);
    };

    return (
      <>
        <DialogTitle style={{ color: "black", alignSelf: "center" }}>
          Add Zone
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setAddingZone(false)}>Cancel</Button>
        </DialogActions>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <Container style={{ display: "flex", flexDirection: "row" }}>
            <Container>
              <DialogContentText>Chosen Rooms:</DialogContentText>
              <ul>
                {chosenRooms.map((room) => (
                  <li key={room}>{room}</li>
                ))}
              </ul>
            </Container>
            <Container>
              {rooms.map((room) => (
                <Room name={room.name} key={room.name} />
              ))}
            </Container>
          </Container>
          <TextField
            onChange={(e) => setZoneName(e.target.value)}
            style={{ alignSelf: "center", marginBottom: "2vh" }}
            placeholder="Zone name..."
          />
          <Container>
            <TextField
              onChange={(e) =>
                setTemperature(Number.parseFloat(e.target.value))
              }
              style={{ alignSelf: "center", marginBottom: "2vh" }}
              placeholder="Temperature..."
            />
            <TextField
              onChange={(e) =>
                setDesiredTemperature(Number.parseFloat(e.target.value))
              }
              style={{ alignSelf: "center", marginBottom: "2vh" }}
              placeholder="Desired temperature..."
            />
          </Container>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogContent>
      </>
    );
  };

  return (
    <Dialog fullWidth onClose={onClose} open={open}>
      {!addingZone ? <ViewZones /> : <AddZones />}
    </Dialog>
  );
};

export default ZoneModal;
