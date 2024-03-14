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
                onClick={() => {
                  console.log("Door Closed");
                  setDoorOpen(false);
                }}
                size={50}
                className="icon"
              />
            ) : (
              <FaDoorClosed
                onClick={() => {
                  console.log("Door Opened");
                  setDoorOpen(true);
                }}
                size={50}
                className="icon"
              />
            )}
            {windowOpen ? (
              <GiWindow
                onClick={() => {
                  console.log("Window Closed");
                  setWindowOpen(false);
                }}
                size={50}
                className="icon"
              />
            ) : (
              <GiWindowBars
                onClick={() => {
                  console.log("Window Opened");
                  setWindowOpen(true);
                }}
                size={50}
                className="icon"
              />
            )}
          </div>
          <div className="icon-row">
            {lightOn ? (
              <FaRegLightbulb
                onClick={() => {
                  console.log("Turned Light Off");
                  setLightOn(false);
                }}
                size={50}
                className="icon"
              />
            ) : (
              <FaLightbulb
                onClick={() => {
                  console.log("Turned Light On");
                  setLightOn(true);
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
