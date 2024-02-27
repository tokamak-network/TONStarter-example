/**
 * Description placeholder
 * @description comparing date values to set vaults scheduled up
 */
export const comapreDate = (newDate: Date, previousDate: Date) => {
  const newDateTimestamp = Math.floor(newDate.getTime() / 1000);
  const previousDateTimestamp = Math.floor(previousDate.getTime() / 1000);

  const valid =
    newDateTimestamp > previousDateTimestamp &&
    newDateTimestamp - previousDateTimestamp > 59;

  return (
    valid ||
    "It must be at least 1 minute later than the date of the previous step."
  );
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};

export const getFutureDate = (
  originalDate: Date,
  addedTime: number,
  unit: "Monthly" | "Weekly",
  formatted?: boolean
) => {
  const date = new Date(originalDate);

  unit === "Monthly"
    ? date.setMonth(date.getMonth() + addedTime)
    : date.setDate(date.getDate() + 7 * addedTime);

  return formatDate(date);
};

export const getLocalTimeZone = () => {
  const date = new Date();

  // Get the timezone offset in minutes
  const offsetMinutes = date.getTimezoneOffset();

  // Calculate the offset in hours and the GMT string
  const offsetHours = Math.abs(offsetMinutes / 60);
  const offsetString = `GMT${offsetMinutes < 0 ? "+" : "-"}${offsetHours}`;

  return offsetString;
};

export const convertToTimestamp = (date: string | Date) => {
  return Math.floor(Date.parse(date.toString()) / 1000);
};

export const getRoundInterval = (
  addedTime: number,
  unit: "Monthly" | "Weekly"
): number => {
  const roundInterval =
    unit === "Monthly" ? addedTime * 2629743 : addedTime * 604800;

  return roundInterval;
};
