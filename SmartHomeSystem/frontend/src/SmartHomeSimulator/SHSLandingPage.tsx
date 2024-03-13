import React, { useState } from "react";
import LogoutModal from "./Logout";
import AddProfileModal from "./AddProfileModal";
import RemoveProfileModal from "./RemoveProfileModal";
import "./SHSLandingPage.css";
import ProfileSelection from "./ProfileSelection";
const SHSLandingPage = (props: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [removeUserModalOpen, setRemoveUserModalOpen] = useState(false);
  const [selectUserModal, setSelectUserModal] = useState(false);

  console.log(props)
  return (
    <div className="SHS-container">
      {" "}
      <button className="common-btn" onClick={() => setAddUserModalOpen(true)}>
        Add User
      </button>
      <button className="common-btn">Edit Profiles</button>
      <button
        className="common-btn"
        onClick={() => setRemoveUserModalOpen(true)}
      >
        Remove User
      </button>
      <button className="common-btn" onClick={() => setSelectUserModal(true)}>Select Profile</button>
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
        userId={props.userData.user.id}
      />
      <RemoveProfileModal
        open={removeUserModalOpen}
        onClose={() => setRemoveUserModalOpen(false)}
        userId={props.userData.user.id}
        profileId={props.userData.profile.id}
      />
      <ProfileSelection open ={selectUserModal} onClose={() => setAddUserModalOpen(false)} user={props.userData} profile = {props.userData.profile} onLogin={props.onLogin}/>
    </div>
  );
};

export default SHSLandingPage;
