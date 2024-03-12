import React, { useState } from "react";
import LogoutModal from "./Logout";
import AddProfileModal from "./AddProfileModal";
import RemoveProfileModal from "./RemoveProfileModal";

const SHSLandingPage = (props: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [removeUserModalOpen, setRemoveUserModalOpen] = useState(false);
  return (
    <div>
      {" "}
      <button className="common-btn" onClick={() => setAddUserModalOpen(true)}>
        Add User
      </button>
      <button
        className="common-btn"
        onClick={() => setRemoveUserModalOpen(true)}
      >
        Remove User
      </button>
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
    </div>
  );
};

export default SHSLandingPage;
