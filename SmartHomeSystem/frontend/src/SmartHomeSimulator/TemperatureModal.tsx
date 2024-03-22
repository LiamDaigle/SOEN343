import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions, DialogContentText, Button, IconButton, TextField } from "@mui/material";
import axios from "axios";

interface TemperatureModalProps {
  open: boolean;
  onClose: () => void;
}

const TemperatureModal: React.FC<TemperatureModalProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/files/uploadCSV', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully.');
      onClose();
    } catch (error) {
      alert('Error uploading file.');
      console.error('Error:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="dialog-container custom">
        <IconButton aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={onClose}>
          &times;
        </IconButton>
        <DialogContentText className="dialog-subheading custom">Upload Temperature CSV</DialogContentText>
        <TextField type="file" fullWidth onChange={handleFileChange} />
        <DialogActions className="dialog-actions custom">
          <Button className="button custom" onClick={handleUpload}>Upload</Button>
          <Button className="button custom" onClick={onClose}>Cancel</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default TemperatureModal;
