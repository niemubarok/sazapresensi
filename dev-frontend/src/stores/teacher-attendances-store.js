import { defineStore } from 'pinia'
import axios from 'src/boot/axios'

export const useTeacherAttendanceStore = defineStore('teacherAttendance', {
  state: () => ({
    attendances: []
  }),

  getters: {
  },

  actions: {
    async addAttendance(attendee) {
      await axios
        .post(process.env.API + "teacher/attendance/create", {
          data: attendee,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.status == 201) {
            this.attendances.unshift(res.data.data);
          } else {
            // console.log(res);
          }
        });
    },
  }
})
