// Check if date and time exist in local storage
const storedDate = localStorage.getItem("date");
const storedTime = localStorage.getItem("time");

let currentDateTime;

// If date and time exist in local storage, use them
if (storedDate && storedTime) {
  // Combine stored date and time and create a new Date object
  currentDateTime = `${storedDate} ${storedTime}`;
} else {
  // Get current date and time
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  // Construct the currentDateTime string
  currentDateTime = `${year}-${
    month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const timestamp = currentDateTime;
