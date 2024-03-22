import React, { useEffect, useState } from "react";
import { SelectChangeEvent, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import "../SmartHomeSimulator/Form.css";

const SHHLandingPage = (props: any) => {
  const [permissionMsg, setPermissionMsg] = useState("");
  const [room, setRoom] = useState("");
  const [temperature, setTemperature] = useState("");

  // Function to set permission message
  const setPermissionMessage = () => {
    const { role, location } = props.userData.profile;

    if (role === "Stranger") {
      setPermissionMsg("Stranger profile does not have access to these features");
    } else if (role === "Children" || role === "Guest") {
      if (location === "Not In House") {
        setPermissionMsg("Profile does not have access to these features when outside the house");
        return;
      }
      setPermissionMsg("Profile can only control temperature of the room they are in");
    } else {
      setPermissionMsg("All permissions granted to operate the SHH from home, or remotely");
    }
  };

  // Call setPermissionMessage only once after the initial render
  useEffect(() => {
    setPermissionMessage();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setRoom(event.target.value);
  };

  // Function to check if MenuItem should be disabled based on user permissions and location
  const disableCheck = (roomName: string) => {
    const { role, location } = props.userData.profile;

    if (role === "Stranger") {
        return true;
    } else if (role === "Children" || role === "Guest") {
        if (location === "Not In House") {
          return true;
        }
        else if (location !== roomName) {
            return true;
        }
        else {
            return false;
        }
      } else {
        return false;
      }
  };

  const setRoomTemperature = async () => {
    if (!room || !temperature) {
      alert("Please select a room and enter a temperature value.");
      return;
    }

    try {
      const response = await axios.patch(`/api/rooms/${room}/temperature`, parseFloat(temperature));
      alert(response.data);
    } catch (error) {
      console.error("Error setting room temperature:", error);
      alert("Error setting room temperature.");
    }
  };

  return (
    <div className="SHH-container" style={{ backgroundColor: "white", border: "1px solid black", padding: "1rem" }}>
      {permissionMsg && <p style={{ color: "black"}}>{permissionMsg}</p>}
      <FormControl fullWidth variant="standard" margin="dense">
        <InputLabel id="room-label">Select Room</InputLabel>
        <Select
          labelId="room-label"
          id="room"
          name="room"
          value={room}
          onChange={handleChange}
        >
           <MenuItem value="Backyard" disabled={disableCheck("Backyard")}>Backyard</MenuItem>
          <MenuItem value="Garage" disabled={disableCheck("Garage")}>Garage</MenuItem>
          <MenuItem value="LivingRoom" disabled={disableCheck("LivingRoom")}>Living Room</MenuItem>
          <MenuItem value="Bedroom" disabled={disableCheck("Bedroom")}>Bedroom</MenuItem>
          <MenuItem value="Entrance" disabled={disableCheck("Entrance")}>Entrance</MenuItem>
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
        className="button custom" type="submit"
        onClick={setRoomTemperature}
        // disabled={!room || !temperature} // Disable the button if room or temperature is not selected
      >
        Submit
      </Button>
    </div>
  );
};

export default SHHLandingPage;
