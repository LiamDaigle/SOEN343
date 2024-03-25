import React, { useEffect, useState } from "react";
import { FaDoorClosed } from "react-icons/fa"; //closed door
import { FaDoorOpen } from "react-icons/fa"; //open door
import { GiWindow } from "react-icons/gi"; //open window
import { GiWindowBars } from "react-icons/gi"; //closed window
import { TbWindowOff } from "react-icons/tb";
import { BsPerson } from "react-icons/bs"; //Nobody in room
import { FaRegLightbulb } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs"; // person
import { BsFillPeopleFill } from "react-icons/bs"; // people for if there is more than one person in the room
import { TbAirConditioning } from "react-icons/tb";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { GiGrass } from "react-icons/gi"; //Grass for representing outside
import SHCInvoker from "../../AxiosCommands/Command Design Pattern/SHCInvoker";
import LightOffCommand from "../../AxiosCommands/Command Design Pattern/commands/LightOffCommand";
import FindRoomCommand from "../../AxiosCommands/Command Design Pattern/commands/FindRoomCommand";
import DoorCloseCommand from "../../AxiosCommands/Command Design Pattern/commands/DoorCloseCommand";
import GetAllDoorsCommand from "../../AxiosCommands/Command Design Pattern/commands/GetAllDoorsCommand";
import DoorOpenCommand from "../../AxiosCommands/Command Design Pattern/commands/DoorOpenCommand";
import GetAllWindowsCommand from "../../AxiosCommands/Command Design Pattern/commands/GetAllWindowsCommand";
import WindowCloseCommand from "../../AxiosCommands/Command Design Pattern/commands/WindowCloseCommand";
import WindowOpenCommand from "../../AxiosCommands/Command Design Pattern/commands/WindowOpenCommand";
import GetAllLightsCommand from "../../AxiosCommands/Command Design Pattern/commands/GetAllLightsCommand";
import LightOnCommand from "../../AxiosCommands/Command Design Pattern/commands/LightOnCommand";
import axios from "axios";
import RoomUpdateHvacCommand from "../../AxiosCommands/Command Design Pattern/commands/RoomUpdateHvacCommand";
import { Button } from "@mui/material";
import WindowBlockedCommand from "../../AxiosCommands/Command Design Pattern/commands/WindowBlockedCommand";

interface Props {
  isEmpty: boolean;
  name: string;
  css: string;
  windows: number;
  doors: number;
  lights: number;
  autoLockDoors: 1;
  user: any;
}

interface Profile {
  id: string;
  name: string;
  location: string;
}

const HouseLayoutGridElement = (props: Props) => {
  const isEmpty = props.isEmpty;
  const name = props.name;
  const css = props.css;
  const windows = props.windows;
  const doors = props.doors;
  const lights = props.lights;
  const autoLockDoors = props.autoLockDoors;

  const [windowOpen, setWindowOpen] = useState(false);
  const [windowBlocked, setWindowBlocked] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [isOccupied, setIsOccupied] = useState(false); // New state to indicate if the room is occupied
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roomsDoors, setRoomsDoors] = useState<any[]>([]);
  const [heatingOn, setHeatingOn] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profilesResponse = await axios.get<Profile[]>(
          `http://localhost:8080/api/users/${props.user.id}/profiles`
        );
        setProfiles(profilesResponse.data);
        // Check if any profile's location matches the room name
        const occupied = profilesResponse.data.some(
          (profile) => profile.location === name
        );
        setIsOccupied(occupied);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        // Handle error if necessary
      }
    };

    fetchData();
  }, [props.user.id]);

  useEffect(() => {
    const fetchDoorsByRoom = async () => {
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
              open: door.open,
            })),
          });
        } catch (error) {
          console.error(`Error fetching doors for room ${room}:`, error);
        }
      }

      setRoomsDoors(roomsDoors);
    };

    fetchDoorsByRoom();
  }, []);

  return (
    <td key={name} className={css}>
      <div className="icon-row">
        <h4 className="roomName">{name}</h4>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {windowBlocked ? (
          <Button
            style={{ alignSelf: "flex-end" }}
            onClick={async () => {
              console.log("Window Unblocked");
              setWindowBlocked(false);

              const findRoomCommand = new FindRoomCommand({ name: name });
              const invoker = new SHCInvoker(findRoomCommand);
              const room = await invoker.executeCommand();
              const roomId = room.id;
              console.log(roomId);

              const getAllWindowsCommand = new GetAllWindowsCommand(room);
              invoker.setCommand(getAllWindowsCommand);
              const windowList: Array<object> = await invoker.executeCommand();

              windowList.forEach((window) => {
                console.log(window);
                const updateWindow = new WindowBlockedCommand(window.id, false);
                invoker.setCommand(updateWindow);
                invoker.executeCommand();
              });
            }}
          >
            Unblock Window
          </Button>
        ) : (
          <Button
            style={{ alignSelf: "flex-end" }}
            onClick={async () => {
              console.log("Window Blocked");
              setWindowBlocked(true);

              const findRoomCommand = new FindRoomCommand({ name: name });
              const invoker = new SHCInvoker(findRoomCommand);
              const room = await invoker.executeCommand();
              const roomId = room.id;
              console.log(roomId);

              const getAllWindowsCommand = new GetAllWindowsCommand(room);
              invoker.setCommand(getAllWindowsCommand);
              const windowList: Array<object> = await invoker.executeCommand();

              windowList.forEach((window) => {
                console.log(window);
                const updateWindow = new WindowBlockedCommand(window.id, true);
                invoker.setCommand(updateWindow);
                invoker.executeCommand();
              });
            }}
          >
            Block Window
          </Button>
        )}
      </div>
      {isEmpty ? (
        <div className="icon-row">
          <GiGrass size={50} className="icon" />
        </div>
      ) : (
        <>
          <div className="icon-row">
            {doorOpen ? (
              <FaDoorOpen
                onClick={async () => {
                  console.log("Door Closed");
                  setDoorOpen(false);

                  const findRoomCommand = new FindRoomCommand({ name: name });
                  const invoker = new SHCInvoker(findRoomCommand);
                  const room = await invoker.executeCommand();

                  const getAllDoorsCommand = new GetAllDoorsCommand(room);
                  invoker.setCommand(getAllDoorsCommand);
                  const doorList: Array<object> =
                    await invoker.executeCommand();

                  doorList.forEach((door) => {
                    console.log(door);
                    const updateDoor = new DoorCloseCommand(door);
                    invoker.setCommand(updateDoor);
                    invoker.executeCommand();
                  });
                }}
                size={50}
                className="icon"
              />
            ) : (
              <FaDoorClosed
                onClick={async () => {
                  console.log("Door Opened");
                  setDoorOpen(true);

                  const findRoomCommand = new FindRoomCommand({ name: name });
                  const invoker = new SHCInvoker(findRoomCommand);
                  const room = await invoker.executeCommand();

                  const getAllDoorsCommand = new GetAllDoorsCommand(room);
                  invoker.setCommand(getAllDoorsCommand);
                  const doorList: Array<object> =
                    await invoker.executeCommand();

                  doorList.forEach((door) => {
                    console.log(door);
                    const updateDoor = new DoorOpenCommand(door);
                    invoker.setCommand(updateDoor);
                    invoker.executeCommand();
                  });
                }}
                size={50}
                className="icon"
              />
            )}
            {windowOpen ? (
              <GiWindow
                onClick={async () => {
                  console.log("Window Closed");
                  setWindowOpen(false);

                  const findRoomCommand = new FindRoomCommand({ name: name });
                  const invoker = new SHCInvoker(findRoomCommand);
                  const room = await invoker.executeCommand();

                  const getAllWindowsCommand = new GetAllWindowsCommand(room);
                  invoker.setCommand(getAllWindowsCommand);
                  const windowList: Array<object> =
                    await invoker.executeCommand();

                  windowList.forEach((window) => {
                    console.log(window);
                    const updateWindow = new WindowCloseCommand(window);
                    invoker.setCommand(updateWindow);
                    invoker.executeCommand();
                  });
                }}
                size={50}
                className="icon"
              />
            ) : (
              <></>
            )}
            {!windowOpen && !windowBlocked ? (
              <GiWindowBars
                onClick={async () => {
                  console.log("Window Opened");
                  setWindowOpen(true);

                  const findRoomCommand = new FindRoomCommand({ name: name });
                  const invoker = new SHCInvoker(findRoomCommand);
                  const room = await invoker.executeCommand();

                  const getAllWindowsCommand = new GetAllWindowsCommand(room);
                  invoker.setCommand(getAllWindowsCommand);
                  const windowList: Array<object> =
                    await invoker.executeCommand();

                  windowList.forEach((window) => {
                    console.log(window);
                    const updateWindow = new WindowOpenCommand(window);
                    invoker.setCommand(updateWindow);
                    invoker.executeCommand();
                  });
                }}
                size={50}
                className="icon"
              />
            ) : (
              <></>
            )}
            {!windowOpen && windowBlocked ? (
              <TbWindowOff
                size={50}
                className="icon"
                onClick={() => setWindowOpen(true)}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="icon-row">
            {lightOn ? (
              <FaRegLightbulb
                onClick={async () => {
                  console.log("Turned Light Off");
                  setLightOn(false);

                  const findRoomCommand = new FindRoomCommand({ name: name });
                  const invoker = new SHCInvoker(findRoomCommand);
                  const room = await invoker.executeCommand();

                  const getAllLightsCommand = new GetAllLightsCommand(room);
                  invoker.setCommand(getAllLightsCommand);
                  const lightList: Array<object> =
                    await invoker.executeCommand();

                  lightList.forEach((light) => {
                    console.log(light);
                    const updateLight = new LightOffCommand(light);
                    invoker.setCommand(updateLight);
                    invoker.executeCommand();
                  });
                }}
                size={50}
                className="icon"
              />
            ) : (
              <FaLightbulb
                onClick={async () => {
                  console.log("Turned Light On");
                  setLightOn(true);

                  const findRoomCommand = new FindRoomCommand({ name: name });
                  const invoker = new SHCInvoker(findRoomCommand);
                  const room = await invoker.executeCommand();

                  const getAllLightsCommand = new GetAllLightsCommand(room);
                  invoker.setCommand(getAllLightsCommand);
                  const lightList: Array<object> =
                    await invoker.executeCommand();

                  lightList.forEach((light) => {
                    console.log(light);
                    const updateLight = new LightOnCommand(light);
                    invoker.setCommand(updateLight);
                    invoker.executeCommand();
                  });
                }}
                size={50}
                className="icon"
              />
            )}
            {isOccupied ? (
              <BsPersonFill size={50} className="icon" /> // Using BsPersonFill when room is occupied
            ) : (
              <BsPerson size={50} className="icon" />
            )}
            {heatingOn ? (
              <TbAirConditioning
                size={50}
                className="icon"
                onClick={async () => {
                  const isSHHOn = localStorage.getItem("SHH_on");
                  if (isSHHOn === "false") {
                    console.log("Cannot modify heating, SHH is turned off.");
                    return;
                  }
                  console.log("Set heating to off");
                  setHeatingOn(false);

                  const findRoomCommand = new FindRoomCommand({ name: name });
                  const invoker = new SHCInvoker(findRoomCommand);
                  const room = await invoker.executeCommand();
                  const roomId = room.id;
                  console.log(roomId);

                  invoker.setCommand(new RoomUpdateHvacCommand(roomId, false));
                  const result = await invoker.executeCommand();
                  console.log(result);
                }}
              />
            ) : (
              <TbAirConditioningDisabled
                size={50}
                className="icon"
                onClick={async () => {
                  const isSHHOn = localStorage.getItem("SHH_on");
                  if (isSHHOn === "false") {
                    console.log("Cannot modify heating, SHH is turned off.");
                    return;
                  }
                  console.log("Set heating to on");
                  setHeatingOn(true);

                  const findRoomCommand = new FindRoomCommand({ name: name });
                  const invoker = new SHCInvoker(findRoomCommand);
                  const room = await invoker.executeCommand();
                  const roomId = room.id;
                  console.log(roomId);

                  invoker.setCommand(new RoomUpdateHvacCommand(roomId, true));
                  const result = await invoker.executeCommand();
                  console.log(result);
                }}
              />
            )}
          </div>
        </>
      )}
    </td>
  );
};

export default HouseLayoutGridElement;
