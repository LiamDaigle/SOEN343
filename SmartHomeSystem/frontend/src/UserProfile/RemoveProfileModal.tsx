import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface RemoveProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const RemoveProfileModal: React.FC<RemoveProfileModalProps> = ({
  open,
  onClose,
}) => {
  const handleRemove = () => {
    {/*TODO add for DELETE request*/ */}
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove User</DialogTitle>
      <DialogContent>Are you sure you want to remove this user?</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleRemove} color="error">
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveProfileModal;