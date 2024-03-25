// Get current date and time
const currentDate = new Date();

// Extract date components
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const day = String(currentDate.getDate()).padStart(2, '0');

// Extract time components
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

// Construct the timestamp string
export const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;