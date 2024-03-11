import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Avatar from "../Common/Avatar";
import Button from "../Common/Button";
import RegisterModal from "./RegisterModal"; // Import the RegisterModal component
import LoginModal from "./LoginModal";

const UserProfile = () => {
  const [date, setData] = useState("");
  const [time, setTime] = useState("");
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false); // State to control dialog open/close
  const [loginModalOpen, setLoginModalOpen] = useState(false); // State to control dialog open/close

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
        <button
          className="common-btn"
          onClick={() => setRegistrationModalOpen(true)}
        >
          Register
        </button>
        <p>OR</p>
        <button className="common-btn" onClick={() => setLoginModalOpen(true)}>
          Login
        </button>
        <p>insert role here</p> {/* TODO: role here */}
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
      <RegisterModal
        open={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
      />{" "}
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />{" "}
    </div>
  );
};

export default UserProfile;
