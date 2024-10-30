export function getDate(date: string) {
  const DATE = new Date(date);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${months[DATE.getMonth()]} ${DATE.getDate()
    .toString()
    .padStart(2, '0')}, ${DATE.getFullYear()}`;
}
