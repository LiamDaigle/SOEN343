import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions, DialogContentText, Button, IconButton, TextField } from "@mui/material";
import axios from "axios";

import { timestamp } from "../Common/getTime";

interface TemperatureModalProps {
  open: boolean;
  onClose: () => void;
  userData: any
}

const TemperatureModal: React.FC<TemperatureModalProps> = ({ open, onClose, userData}) => {
  const [file, setFile] = useState<File | null>(null);

  // Ensure userData and its properties are defined before accessing
  const userId = userData.id || "";
  const profileId = userData.profile?.id || "";
  const profileName = userData.profile?.name || "";
  const profileRole = userData?.profile?.role || "";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      // console.log("Selected file:", event.target.files[0].name); // Log the selected file name
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    console.log("Uploading file:", file.name); // Log the file being uploaded

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/files/uploadCSV', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      writeUploadCsvToFile();
      alert('File uploaded successfully.');
      onClose();
    } catch (error) {
      console.error('Error uploading file:', error); // Log any errors that occur during upload
      alert('Error uploading file.');
    }
  };

  const writeUploadCsvToFile = async () => {
    
    try {
      await axios.post(
        "http://localhost:8080/api/files/write",
        {
          data: `Timestamp: ${timestamp} \nProfile ID: ${profileId}\nProfile Name: ${profileName}\nRole: ${profileRole}\nEvent Type: Upload CSV\nEvent Description: User Just Uploaded Outside Temperature CSV\nend`,
        }
      );
    } catch (error) {
      console.error("Error writing Upload Temperature CSV data to file:", error);
    }
  }

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
