import { defineStore } from "pinia";
import { compareTime } from "src/utilities/time-util";
import { ref } from "vue";

export const useStudentAtivitiesStore = defineStore("StudentAtivities", {
  state: () => ({
    all: ref([
      {
        id: 1,
        name: "Jamaah Subuh",
        location: "kelas",
        start: "04:30:00",
        end: "05:00:00",
        time_order: 1,
      },
      {
        id: 2,
        name: "Pengajian Subuh",
        location: "kelas",
        start: "05:30:00",
        end: "07:00:00",
        time_order: 2,
      },
      {
        id: 3,
        name: "Sekolah Pagi",
        location: "kelas",
        start: "07:40:00",
        end: "12:10:00",
        time_order: 3,
      },
      {
        id: 4,
        name: "Jamaah Zuhur",
        location: "kelas",
        start: "12:20:00",
        end: "12:59:00",
        time_order: 4,
      },
      {
        id: 5,
        name: "Sekolah Siang",
        location_id: "kelas",
        start: "13:00:00",
        end: "14:20:00",
        time_order: 5,
      },
      {
        id: 6,
        name: "Jamaah Ashar",
        location_id: "kelas",
        start: "15:16:30",
        end: "16:00:00",
        time_order: 6,
      },
      {
        id: 7,
        name: "Jamaah Maghrib",
        location_id: "kelas",
        start: "17:30",
        end: "19:20:00",
        time_order: 7,
      },
      {
        id: 8,
        name: "Muhadhoroh",
        location_id: "kelas",
        start: "19:40:00",
        end: "21:30:00",
        time_order: 8,
      },
      {
        id: 9,
        name: "Muwajahah",
        location_id: "kelas",
        start: "19:40",
        end: "21:30:00",
        time_order: 8,
      },
      {
        id: 10,
        name: "Tidur",
        location_id: "kelas",
        start: "22:00:00",
        end: "22:20:00",
        time_order: 10,
      },
    ]),
  }),
  getters: {
    getStudentActivitiesByOrder: (state) => {
      return (order) => state.all.find((val) => val.time_order == order);
    },
    getActivityByTime: (state) => {
      const activity = (now) =>
        state.all?.find((val) => val.start <= now && val.end >= now);

      if (activity == undefined) {
        return false;
      }

      return activity;
    },
  },
  actions: {},
});
