export function getFutureDate(daysAhead: number): string {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysAhead);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JavaScript
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
