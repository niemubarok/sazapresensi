import axios from "axios";
import { defineStore } from "pinia";
import { getTime } from "src/utilities/time-util";

export const useAttendancesStore = defineStore("attendance", {
  state: () => ({
    number: 0,
    attendances: [],
    filtered: [],
  }),
  getters: {
    getAttendances: (state) => {
      // return (activityId) => state.attendances;
      return (activityId) =>
        state.attendances.filter(
          (val) => val.activity_id == activityId
          // console.log(val.activity_id == activityId)
        );
    },
    getFilteredAttendance: (state) => {
      return () => state.filtered;
    },
  },
  actions: {
    async addAttendance(attendee) {
      await axios
        .post(process.env.API + "student/attendances/create", {
          data: attendee,
        })
        .then((res) => {
          console.log(res.data);
          if (res.status == 201) {
            this.attendances.unshift(res.data.data);
          } else {
            console.log(res);
          }
        });
    },
    getAttendancesFromDB() {
      console.log("attendance Store");
      axios
        .post(process.env.API + "student/attendances", {
          data: {
            date: getTime().date,
            // activityId,
          },
        })
        .then((res) => {
          this.attendances = res.data.data;
          // res.data.data.forEach((data) => this.attendances.unshift(data));
        });
    },
    filterAttendances(activityId) {
      this.filtered = this.attendances.filter(
        (val) => val.activity_id == activityId
      );
    },
  },
});
