
export const zeroPad = (n) => {
  return (n < 10 ? "0" : "") + n;
};

export const getDayName = (date)=>{
  const initDate= new Date(date)
  const day = initDate.getDay()
  const dayName = ["Senin","Selasa","Rabu", "Kamis","Jum'at","Sabtu","Minggu"]
  return dayName[day-1]
}

export const getTime = () => {
  const currentDate = new Date();
  const today = currentDate.getDay()
  const date = currentDate;
  const hours = zeroPad(currentDate.getHours());
  const minutes = zeroPad(currentDate.getMinutes());
  const seconds = zeroPad(currentDate.getSeconds());
  return {
    today,
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

export const compareTime = (init, now, comparasion) => {
  if (comparasion == "equal") {
    return init == now;
  } else if (comparasion == "lt") {
    return init < now;
  } else if (comparasion == "gt") {
    return init > now;
  } else {
    return false;
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
