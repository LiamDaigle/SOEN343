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

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  userId: any;
  profileId: any;
}

const RemoveProfileModal: React.FC<FormDialogProps> = ({
  open,
  onClose,
  userId,
  profileId,
}) => {
  const [userData, setUserData] = useState({
    name: "",
    profiletype: "",
  });
  const navigate = useNavigate();
  const { name, profiletype } = userData;

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
      const response = await axios.delete(
        `http://localhost:8080/api/users/${userId}/profiles/${name}`
      );
      alert("User profile removed successfully!");
      navigate("/");
      onClose();
      // Handle redirection or any other action upon successful registration
    } catch (error: any) {
      console.error("User profile removed failed:", error.response.data);
      alert("User profile removal failed! Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="dialog-container custom">
        <DialogContentText className="dialog-subheading custom">
          Remove User
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

          <DialogActions className="dialog-actions custom">
            <Button className="button custom" onClick={onClose}>
              Cancel
            </Button>
            <Button className="button custom" type="submit">
              Remove
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveProfileModal;
