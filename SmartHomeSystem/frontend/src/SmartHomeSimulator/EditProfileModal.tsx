import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { SelectChangeEvent } from "@mui/material";

import axios from "axios";
import { timestamp } from "../Common/getTime";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  profileId: string;
  profileName: string;
  profileRole: string;
  profileRoom: string;
  user: any;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  userId,
  profileId,
  profileName,
  profileRole,
  profileRoom,
  user,
}) => {
  const [name, setName] = useState(profileName);
  const [role, setRole] = useState(profileRole);
  const [room, setRoom] = useState(profileRoom);
  console.log(room);
  const handleNameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/files/write",
        {
          data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${user.name}\nRole: ${user.role}\nEvent Type: Edit User Details\nEvent Description: User Just Changed Name From ${user.name} to ${event.target.value}\nend`, // Convert the profile object to a string
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to write profile data to file");
      }
      console.log("Profile data written to file successfully");
    } catch (error) {
      console.error("Error writing profile data to file:", error);
    }
    setName(event.target.value);
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setRole(event.target.value);
  };

  const handleRoomChange = (event: SelectChangeEvent<string>) => {
    setRoom(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${userId}/profiles/${profileId}`,
        {
          profileId,
          name,
          role,
          location: room,
        }
      );
      console.log("Profile updated successfully");
      localStorage.setItem(
        "selectedUserProfile",
        JSON.stringify({
          id: profileId,
          name: name,
          role: role,
          location: room,
          user: {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
          },
        })
      );

      onClose();
      location.reload();
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <DialogContentText className="dialog-subheading custom">
          Fill in the details below to edit the profile:
        </DialogContentText>
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
          onChange={handleNameChange}
        />
        <FormControl fullWidth variant="standard">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            onChange={handleRoleChange}
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
            onChange={handleRoomChange}
          >
            <MenuItem value="Backyard">Backyard</MenuItem>
            <MenuItem value="Garage">Garage</MenuItem>
            <MenuItem value="LivingRoom">Living Room</MenuItem>
            <MenuItem value="Bedroom">Bedroom</MenuItem>
            <MenuItem value="Entrance">Entrance</MenuItem>
            <MenuItem value="Not In House">Not In House</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="button custom">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="button custom">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
