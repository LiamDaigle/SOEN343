export const getUserData = () => {
  const userDataString = localStorage.getItem("userAccount");
  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      return userData;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};
