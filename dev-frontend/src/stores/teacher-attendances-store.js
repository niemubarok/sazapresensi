import { defineStore } from 'pinia'
import axios from 'src/boot/axios'

export const useTeacherAttendanceStore = defineStore('teacherAttendance', {
  state: () => ({
    attendances: []
  }),

  getters: {
  },

  actions: {
    async addTeacherAttendance(attendee){
      axios.post(process.env.API + "teacher/attendance/store")
    }
  }
})
