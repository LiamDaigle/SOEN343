import React, { useState, useEffect } from "react";
import LogoutModal from "./Logout";
import AddProfileModal from "./AddProfileModal";
import RemoveProfileModal from "./RemoveProfileModal";
import "./SHSLandingPage.css";
import ProfileSelection from "./ProfileSelection";
import axios from "axios";
import EditProfileModal from "./EditProfileModal";

interface Profile {
  id: string;
  name: string;
  role: string;
}
const SHSLandingPage = (props: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [removeUserModalOpen, setRemoveUserModalOpen] = useState(false);
  const [selectUserModal, setSelectUserModal] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const handleEditProfile = () => {
    setEditProfileModalOpen(true);
  };
  console.log(props);

  // Ensure props.userData and its properties are defined before accessing
  const userId = props.userData?.user?.id || "";
  const profileId = props.userData?.profile?.id || "";
  const profileName = props.userData?.profile?.name || "";
  const profileRole = props.userData?.profile?.role || "";
  return (
    <div className="SHS-container">
      {" "}
      <button className="common-btn" onClick={() => setAddUserModalOpen(true)}>
        Add User
      </button>
      <button className="common-btn" onClick={handleEditProfile}>
        Edit Profiles
      </button>
      <button
        className="common-btn"
        onClick={() => setRemoveUserModalOpen(true)}
      >
        Remove User
      </button>
      <button className="common-btn" onClick={() => setSelectUserModal(true)}>
        Select Profile
      </button>
      <button className="common-btn">Edit Data/Time</button>
      <button className="common-btn" onClick={() => setDialogOpen(true)}>
        Logout
      </button>
      <LogoutModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onLogout={props.onLogout}
      />
      <AddProfileModal
        open={addUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        userId={props.userData.id}
      />
      <RemoveProfileModal
        open={removeUserModalOpen}
        onClose={() => setRemoveUserModalOpen(false)}
        userId={props.userData.id}
        profileId={props.userData.profile.id}
      />
      <ProfileSelection
        open={selectUserModal}
        onClose={() => setAddUserModalOpen(false)}
        user={props.userData}
        profile={props.userData.profile}
        onLogin={props.onLogin}
      />
      <EditProfileModal
        open={editProfileModalOpen}
        onClose={() => setEditProfileModalOpen(false)}
        userId={props.userData.id}
        profileId={props.userData.profile.id}
        profileName={props.userData.profile.name}
        profileRole={props.userData.profile.role}
        user={props.userData}
      />
    </div>
  );
};

export default SHSLandingPage;
