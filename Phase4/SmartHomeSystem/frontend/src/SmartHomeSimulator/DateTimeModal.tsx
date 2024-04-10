import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Form.css";

interface DateTimeModalProps {
  open: boolean;
  onClose: () => void;
}

const DateTimeModal: React.FC<DateTimeModalProps> = ({ open, onClose }) => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const storedDateTime = localStorage.getItem("dateTime");
    if (storedDateTime) {
      const { storedDate, storedTime } = JSON.parse(storedDateTime);
      setDate(storedDate);
      setTime(storedTime);
    } else {
      const currentDate = new Date().toISOString().split("T")[0];
      const currentTime = new Date().toISOString().split("T")[1].substring(0, 5);
      setDate(currentDate);
      setTime(currentTime);
    }
  }, [open]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem("dateTime", JSON.stringify({ storedDate: date, storedTime: time }));
    location.reload();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" align="center">
          Set Date and Time
        </Typography>
        <TextField
          id="date"
          label="Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={handleDateChange}
          sx={{ mt: 2 }}
        />
        <TextField
          id="time"
          label="Time"
          type="time"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={time}
          onChange={handleTimeChange}
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <button onClick={handleSubmit} className="common-btn">
            Submit
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DateTimeModal;
