import dayjs from "dayjs";

export function formatDate(date: Date | string | undefined) {
  return dayjs(date).format("DD/MM/YYYY hh:mm");
}

export function clockDate(date: Date | string | undefined) {
  return dayjs(date).format("YYYY-MM-DDTHH:mm");
}

export function secondsToHoursMinutes(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${hoursStr}:${minutesStr}`;
}

export function currentMonthYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  return `${currentMonth}-${currentYear}`;
}
