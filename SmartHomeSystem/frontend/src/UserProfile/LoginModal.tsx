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

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<FormDialogProps> = ({ open, onClose }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = userData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/register", {
        password,
        email,
      });
      alert("User registered successfully!");
      onClose()
      // Handle redirection or any other action upon successful registration
    } catch (error: any) {
      console.error("Registration failed:", error.response.data);
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="dialog-container custom">
        <DialogContentText className="dialog-subheading custom">
          Login
        </DialogContentText>
        <form className="form custom" onSubmit={handleSubmit}>
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={handleChange}
          />

          <DialogActions className="dialog-actions custom">
            <Button className="button custom" onClick={onClose}>
              Cancel
            </Button>
            <Button className="button custom" type="submit">
              Login
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;









