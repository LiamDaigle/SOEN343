import React, { useEffect, useState } from "react";
import { Switch, Typography } from "@mui/material";
import "../SmartHomeSimulator/Form.css";

import { timestamp } from "../Common/getTime";
import SHCInvoker from "../AxiosCommands/Command Design Pattern/SHCInvoker";
import SwitchIsAwayModeCommand from "../AxiosCommands/Command Design Pattern/commands/SwitchIsAwayModeCommand";

const SHPLandingPage = (props: any) => {
  const [permissionMsg, setPermissionMsg] = useState("");
  const [isOn, setIsOn] = useState(true);
  const [awayModeOn, setAwayModeOn] = useState(false);

  // Ensure props.userData and its properties are defined before accessing
  const userId = props.userData?.user?.id || "";
  const profileId = props.userData?.profile?.id || "";
  const profileName = props.userData?.profile?.name || "";
  const profileRole = props.userData?.profile?.role || "";

  // Function to set permissions of SHP
  const setPermissions = () => {
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
            console.log(result.data === true ? "Turned On" : "Turned Off");
          }}
          color="warning"
        />
        <Typography style={{ color: "black", marginRight: "1vw" }}>
          On
        </Typography>
      </div>
      {isOn && (
        <>
          {/* The UI components and functionality will be added here based on the user's permissions */}
        </>
      )}
    </div>
  );
};

export default SHPLandingPage;
