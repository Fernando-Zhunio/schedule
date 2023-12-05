import {
  // CurrentDataSchedule,
  // LabelHead,
  OptionsHourRows,
  type OptionsSchedule,
} from "../types/global";

export const DefaultDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const hoursRows: OptionsHourRows = {
  startTime: "00:00",
  endTime: "23:59",
  minutesInterval: 30,
  heightRows: 35,
};

export const defaultOptions: OptionsSchedule = {
  selector: "#schedule",
  hoursRows,
};

export const typeSchedule = {
  'month': 'month',
  'week': 'week',
  'day': 'day',
}

// export function res

export function generateKeyFormDate(date: Date): string {
  return `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
}

export function getMondayDateCurrent(date: Date): Date {
  const day = date.getDay();
  if (day === 1) {
    return date;
  }
  const resDay = day === 0 ? 7 : day;
  const diff = date.getDate() - resDay + 1 ;
  return new Date(date.setDate(diff));
}

//  let current: CurrentDataSchedule = {
//   date: new Date(),
//   type: 'week',
// }

// export function getCurrentDataSchedule(): CurrentDataSchedule {
//   return current
// }

// export function setCurrentDataSchedule(data: CurrentDataSchedule): void {
//   current = {
//     ...current,
//     ...data
//   }
// }

// export function setTypeSchedule(type: "month" | "week" | "day"): void {
//   current.type = type
// }

// export function setCurrentDate(date: Date): void {
//   current.date = date;
//   EventChangeDate.dispatchEventCustom(date);
// }

export function convertDateIsoByZone(isoString: string, offsetZone: number): Date {
  const date = new Date(isoString);
  const res = new Date(
    date.getTime() + offsetZone * 60 * 60 * 1000
  )
  return res;
}

export function CustomDate(date: Date): Date {
  return new Date(date)
}

