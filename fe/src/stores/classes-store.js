import axios from "axios";
import { defineStore } from "pinia";

export const useClassesStore = defineStore("classes", {
  state: () => ({
    classes: [],
  }),
  getters: {
    getClassById: (state) => {
      return (id) => state.classes.find((val) => val.class_id == id);
    },
    getAllClass: (state) => {
      return state.classes;
    },
  },
  actions: {
    async getClassesFromDB() {
      await axios
        .get(process.env.API + "student/classes")
        .then((res) => {
          // console.log(res.data.data);
          this.classes = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
});
