import React from "react";
import { FaDoorClosed } from "react-icons/fa"; //closed door
import { FaDoorOpen } from "react-icons/fa"; //open door
import { GiWindow } from "react-icons/gi"; //open window
import { GiWindowBars } from "react-icons/gi"; //closed window
import { BsPerson } from "react-icons/bs"; //Nobody in room
import { BsPersonFill } from "react-icons/bs"; // person
import { BsFillPeopleFill } from "react-icons/bs"; // people for if there is more than one person in the room
import { GiGrass } from "react-icons/gi"; //Grass for representing outside

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
            <FaDoorOpen size={50} className="icon" />
            <GiWindow size={50} className="icon" />
          </div>
          <div className="icon-row">
            <BsPerson size={50} className="icon" />
          </div>
        </>
      )}
    </td>
  );
};

export default HouseLayoutGridElement;
