import axios from "axios";
import { defineStore } from "pinia";
import { compareTime } from "src/utilities/time-util";
import { ref } from "vue";

export const useStudentActivitiesStore = defineStore("StudentActivities", {
  state: () => ({
    all: [],
    today:[]
  }),
  getters: {
    getStudentActivitiesByOrder: (state) => {
      return (order) => state.all.find((val) => val.time_order == order);
    },
    getActivitiesTodayByTime: (state) => {
      return  (now) =>
          state.today?.find((val) => val.start <= now && val.end >= now);
        //  state.today?.find((val) => console.log(val.start) );

      // console.log(state.today);

    },
  },
  actions: {
    async getActivitiesByDayFromDB(day) {
      
      await axios
        .post(`${process.env.API}student/activities/day`,{
          day
        })
        .then((res) => {
          // console.log(res.data.data);
          this.today= res.data.data
        });
    },
  },
});
