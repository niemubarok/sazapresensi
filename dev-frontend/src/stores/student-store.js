import axios from "axios";
import { defineStore } from "pinia";

export const useStudentStore = defineStore("student", {
  state: () => ({
    all: [],
    student: {},
  }),
  getters: {
    //  getStudentScheduleByNis: (state) => {
    //   return (nis) => state.all.find((val) => val.nis == nis);
    // },
    getStudentByNis: (state) => {
      return () => state.student;
    },
  },
  actions: {
    async getStudentByNisFromDB(nis) {
      console.log("student Store");
      await axios
        .post(process.env.API + "student/", {
          nis,
        })
        .then((res) => {
          this.student = res.data.data;
        });
    },
  },
});
