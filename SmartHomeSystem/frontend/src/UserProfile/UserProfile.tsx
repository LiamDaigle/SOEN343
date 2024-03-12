import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Avatar from "../Common/Avatar";
import Button from "../Common/Button";
import RegisterModal from "./RegisterModal"; // Import the RegisterModal component
import LoginModal from "./LoginModal";
import LogoutModal from "./Logout";


const UserProfile = (props: any) => {
  const [date, setData] = useState("");
  const [time, setTime] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog open/close


  const fetchDate = () => {
    var currentdate = new Date();
    setData(
      currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear()
    );

    setTime(
      currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds()
    );
  };

  useEffect(() => {
    fetchDate();
  }, []); // Run only once on mount

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
        <p>{props.userData.role}</p> {/* TODO: role here */}
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
        <p>{date}</p>
        <p>{time}</p>
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
