export const getUserData = () => {
  const userDataString = localStorage.getItem("userAccount");
  const userProfileString = localStorage.getItem("selectedUserProfile");

  if (userDataString && userProfileString) {
    try {
      const userData = JSON.parse(userDataString);
      const userProfile = JSON.parse(userProfileString);

      // Merge user data and user profile data into a single object
      const combinedData = { ...userData, profile: userProfile };

      return combinedData;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};
