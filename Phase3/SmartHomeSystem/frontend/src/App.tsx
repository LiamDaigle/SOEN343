import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLandingPage from "./Dashboard/DashboardLandingPage";
import LoginModal from "../src/UserProfile/LoginModal";
import Simulation from "./Simulation/Simulation";
import "./App.css";
import RegisterModal from "./UserProfile/RegisterModal";
import { getUserData } from "../src/Common/userData";
function App() {
  // Initialize isLoggedIn state with the value from localStorage, defaulting to false if no value is found
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [userAccount, setUserAccount] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [userData, setUserData] = useState(getUserData());

  useEffect(() => {
    // Fetch user account from localStorage
    const storedUserAccount = localStorage.getItem("userAccount");
    if (storedUserAccount) {
      setUserAccount(JSON.parse(storedUserAccount));
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    // Save login state to localStorage
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserAccount(null); // Clear userAccount state
    // Clear login state from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userAccount");
    localStorage.removeItem("selectedUserProfile");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <DashboardLandingPage
                userData={userData}
                onLogout={handleLogout}
                onLogin={handleLogin}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginModal
              open={!isLoggedIn}
              onClose={() => setIsLoginModalOpen(false)}
              onLogin={handleLogin}
            />
          }
        />

        <Route
          path="/register"
          element={
            <RegisterModal
              open={true}
              onClose={() => setIsRegisterModalOpen(false)}
            />
          }
        />
      <Route path="/simulation" element={<Simulation />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
