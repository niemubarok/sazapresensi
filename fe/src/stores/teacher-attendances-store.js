import { defineStore } from "pinia";
import axios from "axios";
import ls from "localstorage-slim";

export const useTeacherAttendanceStore = defineStore("teacherAttendance", {
  state: () => ({
    attendances: [],
    teacherByNip: ls.get("teacher"),
  }),

  getters: {
    getTeacherByNip: (state) => {
      return () => state.teacherByNip;
    },
  },

  actions: {
    async addAttendance(attendee) {
      await axios
        .post(process.env.API + "/teacher/attendance/create", {
          data: attendee,
        })
        .then((res) => {
          // if (res.status == 201) {
          this.attendances.unshift(res.data.data);
          ls.set("teacher", res.data.data);
          // } else {
          // console.log(res);
          // }
        });
    },
    findTeacherByNip(nip) {
      this.teacherByNip = this.attendances.find((val) => val.id == nip);
    },
    clearTeacherByNip() {
      this.teacherByNip = null;
    },
  },
});
