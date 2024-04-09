import React, { useEffect, useState } from "react";
import { Button, Switch, TextField, Typography } from "@mui/material";
import "../SmartHomeSimulator/Form.css";

import { timestamp } from "../Common/getTime";
import SHCInvoker from "../AxiosCommands/Command Design Pattern/SHCInvoker";
import SwitchIsAwayModeCommand from "../AxiosCommands/Command Design Pattern/commands/SwitchIsAwayModeCommand";
import RoomGetMotionDetectorsCommand from "../AxiosCommands/Command Design Pattern/commands/RoomGetMotionDetectors";
import RoomUpdateMotionDetectorsCommand from "../AxiosCommands/Command Design Pattern/commands/RoomUpdateMotionDetectors";
import MotionDetectorModal from "./MotionDetectorModal";
import HomeSetTimeCommands from "../AxiosCommands/Command Design Pattern/commands/HomeSetTimeCommand";
import axios from "axios";

const SHPLandingPage = (props: any) => {
  const [permissionMsg, setPermissionMsg] = useState("");
  const [isOn, setIsOn] = useState(true);
  const [motionDetectorModalOn, setMotionDetectorModalOn] = useState(false);
  const [awayModeTime, setAwayModeTime] = useState(180);
  const [awayModeTimeError, setAwayModeTimeError] = useState(false);
  const [renderTimeError, setRenderTimeError] = useState(false);

  // Ensure props.userData and its properties are defined before accessing
  const userId = props.userData?.user?.id || "";
  const profileId = props.userData?.profile?.id || "";
  const profileName = props.userData?.profile?.name || "";
  const profileRole = props.userData?.profile?.role || "";

  // Function to set permissions of SHP
  const setPermissions = async () => {
    if (profileRole === "Parent") {
      setPermissionMsg(
        "All permissions granted to operate the SHP from home, or remotely"
      );
      setIsOn(true);
    } else if (profileRole === "Stranger") {
      setPermissionMsg(
        "Non-identified users have no permissions no matter where they are located"
      );
      setIsOn(false);
    } else {
      setPermissionMsg(
        "No permissions are allowed no matter where they are located"
      );
      setIsOn(false);
    }
  };

  // Call setPermissionMessage only once after the initial render
  useEffect(() => {
    setPermissions();
  }, []);

  const submitTime = async () => {
    setRenderTimeError(awayModeTimeError);

    if (awayModeTimeError) return;
    const invoker = new SHCInvoker(new HomeSetTimeCommands(awayModeTime));
    invoker.executeCommand();
    try {
      await axios.post("http://localhost:8080/api/files/write", {
        data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Time To Call The Police\nEvent Description: User Just Set a Time To Call the Police in ${awayModeTime}\n`,
      });
    } catch (error) {
      console.error("Error writing  SHP data to file:", error);
    }
  };

  const actionDetail = isOn ? "Turned Off" : "Turned On";
  const logMessage = `
  Timestamp: ${timestamp}
  Profile ID: ${profileId}
  Profile Name: ${profileName}
  Role: ${profileRole}
  Event Type: Away Mode
  Event Description: User ${actionDetail} SHP
`;

  return (
    <div
      className="SHP-container"
      style={{
        backgroundColor: "white",
        border: "1px solid black",
        padding: "1rem",
      }}
    >
      {permissionMsg && <p style={{ color: "black" }}>{permissionMsg}</p>}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography style={{ color: "black" }}>Off</Typography>
        <Switch
          checked={isOn}
          onChange={async () => {
            localStorage.setItem("SHP_on", `${!isOn}`);
            setIsOn(!isOn);
            const invoker = new SHCInvoker(new SwitchIsAwayModeCommand());
            const result = await invoker.executeCommand();
            try {
              await axios.post("http://localhost:8080/api/files/write", {
                data: logMessage,
              });
            } catch (error) {
              console.error("Error writing  SHP data to file:", error);
            }
          }}
          color="warning"
        />
        <Typography style={{ color: "black", marginRight: "1vw" }}>
          On
        </Typography>
      </div>
      {isOn && (
        <>
          <Button
            onClick={() => {
              setMotionDetectorModalOn(true);
            }}
          >
            Motion Detectors
          </Button>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              onChange={(e) => {
                const text = e.target.value;
                if (isNaN(text)) {
                  setAwayModeTimeError(true);
                } else {
                  setAwayModeTimeError(false);
                  setAwayModeTime(Number.parseInt(text));
                }
              }}
              placeholder="Enter time to call police in seconds"
            ></TextField>
            {renderTimeError && "Error: Input Should be an Integer"}
            <Button onClick={submitTime}>Submit</Button>
          </div>
          {/* The UI components and functionality will be added here based on the user's permissions */}
        </>
      )}
      <MotionDetectorModal
        open={motionDetectorModalOn}
        onClose={() => setMotionDetectorModalOn(false)}
      ></MotionDetectorModal>
    </div>
  );
};

export default SHPLandingPage;
