export default function convertISOToRegular(isoDateStr) {
  // Create a Date object from the ISO string
  const date = new Date(isoDateStr);

  // Extract date components
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  // Format as "YYYY-MM-DD HH:MM:SS"
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
