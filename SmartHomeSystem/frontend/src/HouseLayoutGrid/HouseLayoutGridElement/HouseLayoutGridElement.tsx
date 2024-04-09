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
import { MdSensors } from "react-icons/md";
import { MdSensorsOff } from "react-icons/md";
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
import OutputWriteReceiver from "../../AxiosCommands/Command Design Pattern/receivers/OutputWriteReceiver";

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
  const [hasMotionDetector, setHasMotionDetector] = useState(false);
  const [motionDetected, setMotionDetected] = useState(false);

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
        setMotionDetected(occupied);
        if (occupied) {
          OutputWriteReceiver.write(
            "Motion Detected",
            `Motion detected in ${name}`
          );
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
        // Handle error if necessary
      }
    };

    const fetchRoomData = async () => {
      const invoker = new SHCInvoker(new FindRoomCommand({ name: name }));
      const room = await invoker.executeCommand();

      const result = await axios.get(
        `http://localhost:8080/api/rooms/${room.id}/hasMotionDetectors`
      );
      setHasMotionDetector(result.data);

      invoker.setCommand(new GetAllDoorsCommand(room));
      const doors = await invoker.executeCommand();

      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];
        if (door.open == true) {
          setDoorOpen(true);
          break;
        }
      }

      invoker.setCommand(new GetAllWindowsCommand(room));
      const windows = await invoker.executeCommand();

      for (let i = 0; i < windows.length; i++) {
        const window = windows[i];
        if (window.open == true) {
          setWindowOpen(true);
          break;
        }
      }

      invoker.setCommand(new GetAllLightsCommand(room));
      const lights = await invoker.executeCommand();

      for (let i = 0; i < lights.length; i++) {
        const light = lights[i];
        if (light.on == true) {
          setLightOn(true);
          break;
        }
      }
    };

    fetchData();
    fetchRoomData();
  }, [props.user.id]);

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
              OutputWriteReceiver.write(
                "Unblock Window",
                `User unblocked window in ${name}`
              );
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

              OutputWriteReceiver.write(
                "Block Window",
                `User Blocked window in ${name}`
              );
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
              <FaDoorOpen size={50} className="icon" />
            ) : (
              <FaDoorClosed size={50} className="icon" />
            )}
            {windowOpen ? <GiWindow size={50} className="icon" /> : <></>}
            {!windowOpen && !windowBlocked ? (
              <GiWindowBars size={50} className="icon" />
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
            {hasMotionDetector && motionDetected ? (
              <MdSensors size={50} className="icon" />
            ) : (
              <></>
            )}
            {hasMotionDetector && !motionDetected ? (
              <MdSensorsOff size={50} className="icon" />
            ) : (
              <></>
            )}
          </div>
          <div className="icon-row">
            {lightOn ? (
              <FaRegLightbulb size={50} className="icon" />
            ) : (
              <FaLightbulb size={50} className="icon" />
            )}
            {isOccupied ? (
              <BsPersonFill size={50} className="icon" /> // Using BsPersonFill when room is occupied
            ) : (
              <BsPerson size={50} className="icon" />
            )}
            {heatingOn ? (
              <TbAirConditioning size={50} className="icon" />
            ) : (
              <TbAirConditioningDisabled size={50} className="icon" />
            )}
          </div>
        </>
      )}
    </td>
  );
};

export default HouseLayoutGridElement;
