import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Avatar from "../Common/Avatar";
import Button from "../Common/Button";
import RegisterModal from "./RegisterModal"; // Import the RegisterModal component
import LoginModal from "./LoginModal";
import LogoutModal from "../SmartHomeSimulator/Logout";
import AddProfileModal from "../SmartHomeSimulator/AddProfileModal";
import RemoveProfileModal from "../SmartHomeSimulator/RemoveProfileModal";

const UserProfile = (props: any) => {
  const [date, setData] = useState("");
  const [time, setTime] = useState("");

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
  console.log(props.userData);

  return (
    <div className="user-profile-container">
      <div className="user-profile-picture">
        {/* Open dialog on button click */}
        <Avatar
          imageUrl="assets/defaultavatar.png"
          altText="profile picture"
          size="100%"
        />

        <p>{props.userData.profile.role}</p>
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

    </div>
  );
};

export default UserProfile;
