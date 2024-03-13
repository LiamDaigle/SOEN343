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

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  profileId: string;
  profileName: string;
  profileRole: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  userId,
  profileId,
  profileName,
  profileRole,
}) => {
  const [name, setName] = useState(profileName);
  const [role, setRole] = useState(profileRole);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setRole(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${userId}/profiles/${profileId}`,
        {
          profileId,
          name,
          role,
        }
      );
      console.log("Profile updated successfully");
      localStorage.setItem("selectedUserProfile",name)
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
