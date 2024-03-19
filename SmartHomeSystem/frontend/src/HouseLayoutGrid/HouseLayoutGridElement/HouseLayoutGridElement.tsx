import React, { useState } from "react";
import { FaDoorClosed } from "react-icons/fa"; //closed door
import { FaDoorOpen } from "react-icons/fa"; //open door
import { GiWindow } from "react-icons/gi"; //open window
import { GiWindowBars } from "react-icons/gi"; //closed window
import { BsPerson } from "react-icons/bs"; //Nobody in room
import { FaRegLightbulb } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs"; // person
import { BsFillPeopleFill } from "react-icons/bs"; // people for if there is more than one person in the room
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

interface Props {
  isEmpty: boolean;
  name: string;
  css: string;
  windows: number;
  doors: number;
  lights: number;
  autoLockDoors: 1;
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
  const [doorOpen, setDoorOpen] = useState(false);
  const [lightOn, setLightOn] = useState(false);

  return (
    <td key={name} className={css}>
      <div className="icon-row">
        <h4 className="roomName">{name}</h4>
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
            <BsPerson size={50} className="icon" />
          </div>
        </>
      )}
    </td>
  );
};

export default HouseLayoutGridElement;