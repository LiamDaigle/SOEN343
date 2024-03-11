import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Form.css"; // Import the CSS file

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<FormDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          console.log(email);
          onClose();
        },
      }}
    >
      <DialogContent className="dialog-container">
        <DialogContentText className="dialog-subheading">
          Register
        </DialogContentText>{" "}
        <form className="form">
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="username"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </form>
        <DialogActions className="dialog-actions">
          <Button className="button" onClick={onClose}>
            Cancel
          </Button>
          <Button className="button" type="submit">
            Register
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
