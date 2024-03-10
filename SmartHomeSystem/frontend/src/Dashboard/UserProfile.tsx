import { useState } from "react";
import "./UserProfile.css";
import Avatar from "../Common/Avatar";

const UserProfile = () => {
  var currentdate = new Date();
  const [date, setData] = useState(
    currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear()
  );
  const [time, setTime] = useState(
    currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds()
  );
  return (
    <div className="user-profile-container">
      <div className="user-profile-picture">
        <Avatar
          imageUrl="assets/defaultavatar.png"
          altText="profile picture"
          size="100%"
        />
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
    </div>
  );
};

export default UserProfile;
