export function getTimeDifferenceInMinutes(date1: string, date2: string) {
  const differenceInMilliseconds = Math.abs(new Date(date2) - new Date(date1));
  const differenceInMinutes = Math.floor(
    differenceInMilliseconds / (1000 * 60),
  );
  return differenceInMinutes;
}
