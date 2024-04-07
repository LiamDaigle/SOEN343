import React, { useEffect, useState } from "react";
import {
  SelectChangeEvent,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Switch,
  Typography,
} from "@mui/material";
import axios from "axios";
import "../SmartHomeSimulator/Form.css";
import ZoneModal from "./ZoneModal/ZoneModal";

import { timestamp } from "../Common/getTime";
import SHCInvoker from "../AxiosCommands/Command Design Pattern/SHCInvoker";
import FindRoomCommand from "../AxiosCommands/Command Design Pattern/commands/FindRoomCommand";

const SHHLandingPage = (props: any) => {
  const [permissionMsg, setPermissionMsg] = useState("");
  const [room, setRoom] = useState("");
  const [roomOverride, setRoomOverride] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [isOn, setIsOn] = useState(true);
  const [zoneModalOpen, setZoneModalOpen] = useState(false);
  const [roomTemp, setRoomTemp] = useState("");
  const [subscribeSHP, setSubscribeSHP] = useState(false);

  const [awayModeOn, setAwayModeOn] = useState(() => {
    const storedAwayMode = localStorage.getItem("awayModeSHP");
    return storedAwayMode ? JSON.parse(storedAwayMode) : false;
  });

  // Ensure props.userData and its properties are defined before accessing
  const userId = props.userData?.user?.id || "";
  const profileId = props.userData?.profile?.id || "";
  const profileName = props.userData?.profile?.name || "";
  const profileRole = props.userData?.profile?.role || "";

  // Function to set permission message
  const setPermissionMessage = () => {
    const { role, location } = props.userData.profile;

    if (role === "Stranger") {
      setPermissionMsg(
        "Stranger profile does not have access to these features"
      );
    } else if (role === "Children" || role === "Guest") {
      if (location === "Not In House") {
        setPermissionMsg(
          "Profile does not have access to these features when outside the house"
        );
        return;
      }
      setPermissionMsg(
        "Profile can only control temperature of the room they are in"
      );
    } else {
      setPermissionMsg(
        "All permissions granted to operate the SHH from home, or remotely"
      );
    }
  };

  // Call setPermissionMessage only once after the initial render
  useEffect(() => {
    setPermissionMessage();

    // 
  }, []);

  // Function to handle room selection change
  const handleChange = async (event: SelectChangeEvent<string>) => {
    const newRoom = event.target.value;

    const invoker = new SHCInvoker(new FindRoomCommand({ name: newRoom }));
    const result = await invoker.executeCommand();

    setRoomOverride(result.overrideZone);

    setRoom(newRoom);
    fetchRoomTemperature(newRoom);
  };

  // Function to fetch room temperature based on room name
  const fetchRoomTemperature = async (roomName: string) => {
    if (!roomName) {
      alert("Please select a room.");
      return;
    }

    try {
      const roomResponse = await axios.post(
        "http://localhost:8080/api/rooms/findByName",
        { name: roomName }
      );
      setRoomTemp(roomResponse.data.temperature);
    } catch (error) {
      console.error("Error fetching current temperature:", error);
    }
  };

  // Function to check if MenuItem should be disabled based on user permissions and location
  const disableCheck = (roomName: string) => {
    const { role, location } = props.userData.profile;

    if (role === "Stranger") {
      return true;
    } else if (role === "Children" || role === "Guest") {
      if (location === "Not In House") {
        return true;
      } else if (location !== roomName) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  // Function to set room temperature
  const setRoomTemperature = async () => {
    if (!room || !temperature) {
      alert("Please select a room and enter a temperature value.");
      return;
    }

    try {

      // Find the roomId based on the selected room name
      const roomResponse = await axios.post(
        "http://localhost:8080/api/rooms/findByName",
        { name: room }
      );
      const roomId = roomResponse.data.id;

      writeRoomTemperatureToFile();

      // Update the room temperature using the roomId
      const response = await axios.patch(
        `http://localhost:8080/api/rooms/${roomId}/temperature`,
        parseFloat(temperature),
        { headers: { "Content-Type": "application/json" } }
      );

      // alert(response.data);
      location.reload();
    } catch (error) {
      console.error("Error setting room temperature:", error);
      alert("Error setting room temperature.");
    }
  };

  // Function to write room temperature data to file
  const writeRoomTemperatureToFile = async () => {
    try {
      await axios.post("http://localhost:8080/api/files/write", {
        data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Edit Room Temperature\nEvent Description: User Just Changed ${room} Temperature from ${roomTemp} to ${temperature} Degrees Celcius\nend`,
      });
      console.log("Room Temperature data written to file successfully");
    } catch (error) {
      console.error("Error writing room temperature data to file:", error);
    }
  };

  return (
    <div
      className="SHH-container"
      style={{
        backgroundColor: "white",
        border: "1px solid black",
        padding: "1rem",
      }}
    >
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
          onChange={() => {
            localStorage.setItem("SHH_on", `${!isOn}`);
            setIsOn(!isOn);
          }}
          color="warning"
        />
        <Typography style={{ color: "black", marginRight: "1vw" }}>
          On
        </Typography>
        <Button
          className="button custom"
          onClick={() => setZoneModalOpen(true)}
        >
          Zones
        </Button>
        <Button
          className="button custom"
          onClick={() => setSubscribeSHP(!subscribeSHP)}
        >
          {subscribeSHP ? "Unsubscribe to SHP" : "Subscribe to SHP"}
        </Button>

      </div>

      {isOn ? (
        <>
          {permissionMsg && <p style={{ color: "black" }}>{permissionMsg}</p>}
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel id="room-label">Select Room</InputLabel>
            <Select
              labelId="room-label"
              id="room"
              name="room"
              value={room}
              onChange={handleChange}
            >
              <MenuItem value="Backyard" disabled={disableCheck("Backyard")}>
                Backyard
              </MenuItem>
              <MenuItem value="Garage" disabled={disableCheck("Garage")}>
                Garage
              </MenuItem>
              <MenuItem
                value="LivingRoom"
                disabled={disableCheck("LivingRoom")}
              >
                Living Room
              </MenuItem>
              <MenuItem value="Bedroom" disabled={disableCheck("Bedroom")}>
                Bedroom
              </MenuItem>
              <MenuItem value="Entrance" disabled={disableCheck("Entrance")}>
                Entrance
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Set Room Temperature"
            variant="outlined"
            fullWidth
            margin="dense"
          />
          <Button
            className="button custom"
            type="submit"
            onClick={setRoomTemperature}
          >
            Submit
          </Button>
          {room && (
            <p style={{ color: "black" }}>
              Current temperature in {roomOverride ? "(Overriden)" : ""} {room}:{" "}
              {roomTemp} degrees Celcius
            </p>
          )}
        </>
      ) : (
        <Typography style={{ color: "black" }}>
          Turn SHH on to use the module
        </Typography>
      )}
      <ZoneModal
        open={zoneModalOpen}
        onClose={() => setZoneModalOpen(false)}
      ></ZoneModal>
    </div>
  );
};

export default SHHLandingPage;
