import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  name: string;
}

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<FormDialogProps> = ({ open, onClose, onLogin }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false); // State to control visibility of profile selection dialog
  const navigate = useNavigate();
  const { email, password } = userData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          password,
          email,
        }
      );
      localStorage.setItem("userAccount", JSON.stringify(response.data));

      const user = response.data;
      const userId = user.id;

      const profilesResponse = await axios.get<Profile[]>(
        `http://localhost:8080/api/users/${userId}/profiles`
      );
      console.log(profilesResponse.data);
      setProfiles(profilesResponse.data);

      setShowProfileDialog(true); // Show the profile selection dialog
    } catch (error: any) {
      console.error("Login failed:", error.response.data);
      alert("Login failed! Please try again.");
    }
  };

  const handleProfileSelection = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const handleLoginWithProfile = () => {
    console.log("Logging in with profile:", selectedProfile);
    console.log(selectedProfile);
    localStorage.setItem(
      "selectedUserProfile",
      JSON.stringify(selectedProfile)
    );
    onLogin();
    navigate("/");
    onClose();
    window.location.reload();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent className="dialog-container custom">
          <DialogContentText className="dialog-subheading custom">
            Login
          </DialogContentText>
          <form className="form custom" onSubmit={handleSubmit}>
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={handleChange}
            />

            <DialogActions className="dialog-actions custom">
              <Button className="button custom" onClick={onClose}>
                Cancel
              </Button>
              <Button className="button custom" type="submit">
                Login
              </Button>
            </DialogActions>
          </form>
          <DialogContentText>
            Don't have an account? <Link to="/register">Sign Up Here</Link>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Profile selection dialog */}
      <Dialog
        open={showProfileDialog}
        onClose={() => setShowProfileDialog(false)}
      >
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

export default LoginModal;
