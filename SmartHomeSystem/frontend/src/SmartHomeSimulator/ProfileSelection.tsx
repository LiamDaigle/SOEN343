import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { timestamp } from "../Common/getTime";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  user: any;
  profile: any;
  onLogin: () => void;
}
interface Profile {
  role: any;
  id: string;
  name: string;
}
const ProfileSelection: React.FC<FormDialogProps> = ({
  open,
  onClose,
  user,
  profile,
  onLogin,
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profilesResponse = await axios.get<Profile[]>(
          `http://localhost:8080/api/users/${user.id}/profiles`
        );
        setProfiles(profilesResponse.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        // Handle error if necessary
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, user.id]); // Add open and user.id to the dependency array

  const handleProfileSelection = async (profile: Profile) => {
    setSelectedProfile(profile);
    console.log(profile);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/files/write",
        {
          data: `Timestamp: ${timestamp} \nProfile ID: ${profile.id}\nProfile Name: ${profile.name}\nRole: ${profile.role}\nEvent Type: Logging In\nEvent Description: User Just Logged In With this Profile\n`, // Convert the profile object to a string
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to write profile data to file");
      }
      console.log("Profile data written to file successfully");
    } catch (error) {
      console.error("Error writing profile data to file:", error);
    }
  };

  const handleLoginWithProfile = () => {
    console.log("Logging in with profile:", selectedProfile);
    localStorage.setItem(
      "selectedUserProfile",
      JSON.stringify(selectedProfile)
    );
    onLogin();

    onClose();
    window.location.reload();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent className="dialog-container custom">
          <DialogContentText className="dialog-subheading custom">
            Select a profile to login with:
          </DialogContentText>
          <ul>
            {profiles.map((profile) => (
              <li key={profile.id}>
                <button
                  className={`profile-btn ${
                    selectedProfile && selectedProfile.id === profile.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleProfileSelection(profile)}
                >
                  {profile.name}
                </button>
              </li>
            ))}
          </ul>
          <DialogActions>
            <Button className="button custom" onClick={handleLoginWithProfile}>
              Login with selected profile
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileSelection;
