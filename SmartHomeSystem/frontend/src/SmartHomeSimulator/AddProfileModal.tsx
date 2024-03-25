/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import "./Form.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { timestamp } from "../Common/getTime";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  userId: any;
}

const AddProfileModal: React.FC<FormDialogProps> = ({
  open,
  onClose,
  userId,
}) => {
  const [userData, setUserData] = useState({
    name: "",
    profiletype: "",
    room: "",
  });
  const navigate = useNavigate();
  const { name, profiletype, room } = userData;
  const userID = userData.id || "";
  const profileId = userData.profile?.id || "";
  const profileName = userData.profile?.name || "";
  const profileRole = userData?.profile?.role || "";

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${userId}/profiles`,
        {
          name,
          role: profiletype,
          location: room,
        }
      );
      console.log(response);

      try {
        await axios.post("http://localhost:8080/api/files/write", {
          data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Log In\nEvent Description: User Created a new profile\nend`,
        });
      } catch (error) {
        console.error("Error writing Block Window data to file:", error);
      }
      alert("User profile created successfully!");
      navigate("/");
      onClose();
      location.reload();
      // Handle redirection or any other action upon successful registration
    } catch (error: any) {
      console.error("User profile creation failed:", error.response.data);
      alert("User profile creation failed! Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="dialog-container custom">
        <DialogContentText className="dialog-subheading custom">
          Add User
        </DialogContentText>
        <form className="form custom" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleChange}
          />
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel id="profiletype-label">User Type</InputLabel>
            <Select
              labelId="profiletype-label"
              id="profiletype"
              name="profiletype"
              value={profiletype}
              onChange={handleChange}
            >
              <MenuItem value="Parent">Parent</MenuItem>
              <MenuItem value="Children">Children</MenuItem>
              <MenuItem value="Guest">Guest</MenuItem>
              <MenuItem value="Stranger">Stranger</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel id="room-label">Profile Location</InputLabel>
            <Select
              labelId="room-label"
              id="room"
              name="room"
              value={room}
              onChange={handleChange}
            >
              <MenuItem value="Backyard">Backyard</MenuItem>
              <MenuItem value="Garage">Garage</MenuItem>
              <MenuItem value="LivingRoom">Living Room</MenuItem>
              <MenuItem value="Bedroom">Bedroom</MenuItem>
              <MenuItem value="Entrance">Entrance</MenuItem>
              <MenuItem value="Not In House">Not In House</MenuItem>
            </Select>
          </FormControl>

          <DialogActions className="dialog-actions custom">
            <Button className="button custom" onClick={onClose}>
              Cancel
            </Button>
            <Button className="button custom" type="submit">
              Add User
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProfileModal;
