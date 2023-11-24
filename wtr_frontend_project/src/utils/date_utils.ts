import dayjs from "dayjs";

export function formatDate(date: Date | string | undefined) {
  return dayjs(date).format("HH:mm DD/MM/YYYY");
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
  return `${currentYear}-${currentMonth}`;
}

export function monthRange(month?:string) {
  let date:Date
  if(month){
    date = new Date(`${month}-1`)
  }else{
    date = new Date()
  }

  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  return {
    from: firstDayOfMonth,
    to: lastDayOfMonth,
  };
}
