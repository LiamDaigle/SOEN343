import React, { useEffect, useState } from "react";
import LightModal from "./LightModal";
import DoorModal from "./DoorModal";
import WindowModal from "./WindowModal";

const SHCLandingPage = (props: any) => {
  const [lightModalOpen, setLightModalOpen] = useState(false);
  const [doorModalOpen, setDoorModalOpen] = useState(false);
  const [windowModalOpen, setWindowModalOpen] = useState(false);
  const [permissionMsg, setPermissionMsg] = useState("");
  console.log(props.userData);
  // Function to set permission message
  const setPermissionMessage = () => {
    if (props.userData.profile.role === "Stranger") {
      setPermissionMsg(
        "Stranger profile does not have access to these features"
      );
    } else if (props.userData.profile.role === "Children") {
      if (props.userData.profile.location === "Not In House") {
        setPermissionMsg(
          "Child profile does not have access to these features when outside the house"
        );
        return;
      }
      setPermissionMsg(
        "Child profile can only control lights/windows/doors of the room they are in"
      ); // Reset permission message if the user is not a Stranger
    } else if (props.userData.profile.role === "Guest") {
      if (props.userData.profile.location === "Not In House") {
        setPermissionMsg(
          "Guest profile does not have access to these features when outside the house"
        );
        return;
      }
      setPermissionMsg(
        "Guest profile can only control lights/windows/doors of the room they are in"
      ); // Reset permission message if the user is not a Stranger
    } else {
      setPermissionMsg("Parent has permission to control all features");
    }
  };

  // Call setPermissionMessage only once after the initial render
  useEffect(() => {
    setPermissionMessage();
  }, []);

  console.log(props.userData.profile);
  return (
    <div className="SHS-container">
      {" "}
      {permissionMsg && <p>{permissionMsg}</p>}
      <button
        disabled={
          props.userData.profile.role === "Stranger" ||
          (props.userData.profile.role === "Children" &&
            props.userData.profile.location === "Not In House") ||
          (props.userData.profile.role === "Guest" &&
            props.userData.profile.location === "Not In House")
        }
        className={`common-btn ${
          (props.userData.profile.role === "Stranger" ||
            (props.userData.profile.role === "Children" &&
              props.userData.profile.location === "Not In House") ||
            (props.userData.profile.role === "Guest" &&
              props.userData.profile.location === "Not In House")) &&
          "disabled-button"
        }`}
        onClick={() => setLightModalOpen(true)}
      >
        Lights
      </button>
      <button
        disabled={
          props.userData.profile.role === "Stranger" ||
          (props.userData.profile.role === "Children" &&
            props.userData.profile.location === "Not In House") ||
          (props.userData.profile.role === "Guest" &&
            props.userData.profile.location === "Not In House")
        }
        className={`common-btn ${
          (props.userData.profile.role === "Stranger" ||
            (props.userData.profile.role === "Children" &&
              props.userData.profile.location === "Not In House") ||
            (props.userData.profile.role === "Guest" &&
              props.userData.profile.location === "Not In House")) &&
          "disabled-button"
        }`}
        onClick={() => setDoorModalOpen(true)}
      >
        Doors
      </button>
      <button
        disabled={
          props.userData.profile.role === "Stranger" ||
          (props.userData.profile.role === "Children" &&
            props.userData.profile.location === "Not In House") ||
          (props.userData.profile.role === "Guest" &&
            props.userData.profile.location === "Not In House")
        }
        className={`common-btn ${
          (props.userData.profile.role === "Stranger" ||
            (props.userData.profile.role === "Children" &&
              props.userData.profile.location === "Not In House") ||
            (props.userData.profile.role === "Guest" &&
              props.userData.profile.location === "Not In House")) &&
          "disabled-button"
        }`}
        onClick={() => setWindowModalOpen(true)}
      >
        Windows
      </button>
      <LightModal
        open={lightModalOpen}
        onClose={() => setLightModalOpen(false)}
        userData={props.userData.profile}
      />
      <DoorModal
        open={doorModalOpen}
        onClose={() => setDoorModalOpen(false)}
        userData={props.userData.profile}
      />
      <WindowModal
        open={windowModalOpen}
        onClose={() => setWindowModalOpen(false)}
        userData={props.userData.profile}
      />
    </div>
  );
};

export default SHCLandingPage;
