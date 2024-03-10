import React from "react";
import "./UserProfile.css"
import Avatar from "../Common/Avatar";

const UserProfile = () => {
  return (
    <div className="user-profile-container">
      <div className="user-profile-picture">
        <Avatar
          imageUrl="assets/defaultavatar.png"
          altText="profile picture"
          size="100%"
        />
      </div>
    </div>
  );
};

export default UserProfile;
