import axios from "axios";
import { defineStore } from "pinia";

export const useTeacherStore = defineStore("teacher", {
  state: () => ({
    teachers: []
  }),
  getters: {},
  actions: {
    async getTeachersFromDB(){
      let teachers = []
      await axios.get(process.env.API + "teacher/all").then((res)=>{
        teachers = res.data.data;
      })

      return teachers
    },
    async getTeacherByNip(nip){
      let teacher = []
      await axios.post(process.env.API + "teacher",
      {
        nip
      }).then((res)=>{
        teacher = res.data.data;
      })
      return teacher
    }
  },
});
