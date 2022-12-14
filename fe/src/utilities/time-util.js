export const zeroPad = (n) => {
  return (n < 10 ? "0" : "") + n;
};

export const dayName = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
];

export const getDayName = (date) => {
  const initDate = new Date(date);
  const day = initDate.getDay();

  return day == 0 ? dayName[0] : dayName[day];
};

export const getTime = () => {
  const currentDate = new Date();
  const today = currentDate.getDay();
  const date = currentDate;
  const day = getDayName(currentDate);
  const hours = zeroPad(currentDate.getHours());
  const minutes = zeroPad(currentDate.getMinutes());
  const seconds = zeroPad(currentDate.getSeconds());
  return {
    today,
    day,
    date,
    hours,
    minutes,
    seconds,
    time: hours + ":" + minutes + ":" + seconds,
  };
};

export const setTime = (h, m, s) => {
  const currentDate = new Date();
  currentDate.setHours(h, m, s);

  return {
    hours: zeroPad(currentDate.getHours()),
    minutes: zeroPad(currentDate.getMinutes()),
  };
};

export const compareTime = (time1, time2, comparison) => {
  const [hour1, minute1, second1] = time1.split(":");
  const [hour2, minute2, second2] = time2.split(":");

  const date1 = new Date(2022, 0, 1, +hour1, +minute1, +second1).getTime();
  const date2 = new Date(2022, 0, 1, +hour2, +minute2, +second2).getTime();

  // console.log(time1, time2);
  // console.log(date1 > date2);
  if (comparison == "equal") {
    return date1 == date2;
  } else if (comparison == "lt") {
    return date1 < date2;
  } else if (comparison == "gt") {
    return date1 > date2;
  }
  // return getTime().hours > setTime(now).hours;
  // return getTime().hours ;
  // return setTime(7, 40, 0).hours;
};

export const timeToMillisecond = (t) => {
  // return (
  //   Number(t.split(":")[0]) * 60 * 60 + Number(t.split(":")[1]) * 60 * 1000
  // );
  if (t) {
    return (
      Number(t.split(":")[0]) * 3600000 +
      Number(t.split(":")[1]) * 60000 +
      Number(t.split(":")[2]) * 1000
    );
  }
};

export const addMinutes = (t, m) => {
  const time = new Date(
    new Date("1970/01/01 " + t).getTime() + m * 60000
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return time;
};

export const isValidTime = (time) => {
  return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/gm.test(time);
};

export const timeRegex24Format =
  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/gm;
