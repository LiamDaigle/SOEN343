import React from "react";
import "./HouseLayoutGrid.css";
import data from "../assets/exampleHouseLayout.json";
import HouseLayoutGridElement from "./HouseLayoutGridElement/HouseLayoutGridElement";
import { HouseLayoutParser } from "./HouseLayoutParser";

const HouseLayoutGrid = () => {
  HouseLayoutParser.parseJSON(data);
  const houseLayout: string[][] = HouseLayoutParser.getLayout();
  const rows: JSX.Element[] = [];
  let key = 0;

  const renderRow = (cssClass: string, houseRow: string[]) => {
    const rowSize = houseRow.length;

    return (
      <tr>
        {houseRow.map((element, index) =>
          index == rowSize - 1 ? (
            <HouseLayoutGridElement
              key={key++}
              isEmpty={!element ? true : false}
              name={element}
              css={cssClass + "-last"}
              windows={
                element ? HouseLayoutParser.getRoomByName(element).windows : -1
              }
              doors={
                element ? HouseLayoutParser.getRoomByName(element).doors : -1
              }
              lights={
                element ? HouseLayoutParser.getRoomByName(element).lights : -1
              }
              autoLockDoors={
                element
                  ? HouseLayoutParser.getRoomByName(element).autoLockDoors
                  : -1
              }
            />
          ) : (
            <HouseLayoutGridElement
              key={key++}
              isEmpty={!element}
              name={element}
              css={cssClass}
              windows={
                element ? HouseLayoutParser.getRoomByName(element).windows : -1
              }
              doors={
                element ? HouseLayoutParser.getRoomByName(element).doors : -1
              }
              lights={
                element ? HouseLayoutParser.getRoomByName(element).lights : -1
              }
              autoLockDoors={
                element
                  ? HouseLayoutParser.getRoomByName(element).autoLockDoors
                  : -1
              }
            />
          )
        )}
      </tr>
    );
  };

  //Render the rows into the rows array with the proper css depending on the row of the house
  houseLayout.forEach((houseRow: string[], index) => {
    if (index == 0) {
      rows.push(renderRow("first-row-el", houseRow));
    } else {
      rows.push(renderRow("row-el", houseRow));
    }
  });

  return (
    <table cellPadding="0" cellSpacing="0">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default HouseLayoutGrid;
