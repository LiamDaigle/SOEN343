import React, { useState} from "react";
import LightModal from "./LightModal";
import DoorModal from "./DoorModal";
import WindowModal from "./WindowModal";


const SHCLandingPage = (props: any) => {
    const [lightModalOpen, setLightModalOpen] = useState(false);
    const [doorModalOpen, setDoorModalOpen] = useState(false);
    const [windowModalOpen, setWindowModalOpen] = useState(false);

    return (
      <div className="SHS-container">
        {" "}
        <button className="common-btn"
        onClick={() => setLightModalOpen(true)} >
          Lights
        </button>
        <button className="common-btn" 
        onClick={() => setDoorModalOpen(true)}>
          Doors
        </button>
        <button
          className="common-btn"        
          onClick={() => setWindowModalOpen(true)}>
          Windows
        </button>
        <LightModal
            open={lightModalOpen}
            onClose={() => setLightModalOpen(false)}
        />
        <DoorModal
            open={doorModalOpen}
            onClose={() => setDoorModalOpen(false)}
        />
        <WindowModal
            open={windowModalOpen}
            onClose={() => setWindowModalOpen(false)}
        />
      </div>
    );
  };
  
  export default SHCLandingPage;