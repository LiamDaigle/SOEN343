import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "./Form.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<FormDialogProps> = ({ open, onClose, onLogout }) => {


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="dialog-container custom">
          <DialogActions className="dialog-actions custom">
            <Button className="button custom" onClick={onClose}>
              Cancel
            </Button>
            <Button className="button custom" onClick={onLogout}>
              Logout
            </Button>
          </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
