/**
 * Description placeholder
 * @description comparing date values to set vaults scheduled up
 */
export const comapreDate = (newDate: Date, previousDate: Date) => {
  const newDateTimestamp = Math.floor(newDate.getTime() / 1000);
  const previousDateTimestamp = Math.floor(previousDate.getTime() / 1000);
  const valid =
    newDateTimestamp > previousDateTimestamp &&
    newDate.getMinutes() !== previousDate.getMinutes();

  return (
    valid ||
    "It must be at least 1 second later than the date of the previous step."
  );
};
