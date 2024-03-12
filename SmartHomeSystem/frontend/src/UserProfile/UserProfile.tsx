import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Avatar from "../Common/Avatar";
import Button from "../Common/Button";
import RegisterModal from "./RegisterModal"; // Import the RegisterModal component
import LoginModal from "./LoginModal";
import LogoutModal from "./Logout";

const UserProfile = (props: any) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog open/close
  const [editMode, setEditMode] = useState(false);
  const [inputDate, setInputDate] = useState("");
  const [inputTime, setInputTime] = useState("");

  // Load date and time from localStorage on component mount
  useEffect(() => {
    const savedDate = localStorage.getItem("userDate");
    const savedTime = localStorage.getItem("userTime");
    if (savedDate && savedTime) {
      setDate(savedDate);
      setTime(savedTime);
    } else {
      fetchDateAndTime();
    }
  }, []); // Run only once on mount

  const fetchDateAndTime = () => {
    const currentDateTime = new Date();
    const formattedDate = `${currentDateTime.getDate()}/${
      currentDateTime.getMonth() + 1
    }/${currentDateTime.getFullYear()}`;
    const formattedTime = `${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`;
    setDate(formattedDate);
    setTime(formattedTime);
  };

  const handleSetDateTime = () => {
    setDate(inputDate);
    setTime(inputTime);
    setInputDate(""); // Clear input fields after setting date and time
    setInputTime("");
    setEditMode(false);

    // Save date and time to localStorage
    localStorage.setItem("userDate", inputDate);
    localStorage.setItem("userTime", inputTime);
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-picture">
        {/* Open dialog on button click */}
        <Avatar
          imageUrl="assets/defaultavatar.png"
          altText="profile picture"
          size="100%"
        />
        <button className="common-btn">Add User</button>
        <button className="common-btn">Remove User</button>
        <p>{props.userData.profile.role}</p> {/* TODO: role here */}
      </div>
      <div className="user-location">
        <p>Location:</p>
        <p>Kitchen</p> {/*  TODO: change location*/}
      </div>
      <div className="outside-temperature">
        <p>Outside Temperature: 15C </p>
      </div>{" "}
      {/* TODO: change temperature */}
      <div className="data-and-time">
        {editMode ? (
          <div>
            <input
              type="text"
              placeholder="Enter date (DD/MM/YYYY)"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter time (HH:MM:SS)"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
            />
            <button className="common-btn" onClick={handleSetDateTime}>
              Set Date and Time
            </button>
          </div>
        ) : (
          <div>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <button className="common-btn" onClick={() => setEditMode(true)}>
              Edit Date and Time
            </button>
          </div>
        )}
      </div>
      <button className="common-btn" onClick={() => setDialogOpen(true)}>
        Logout
      </button>
      <LogoutModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onLogout={props.onLogout}
      />
    </div>
  );
};

export default UserProfile;
