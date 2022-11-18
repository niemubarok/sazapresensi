import { defineStore } from "pinia";

export const useStudentStore = defineStore("student", {
  state: () => ({
    all: [
      {
        nis: "0012421387",
        name: "Rian",
        gender: "L",
        birthdate: "26-03-1996",
        phone_1: "0851511315",
        phone_2: "",
        photo: "",
        status: "aktif",
      },
      {
        nis: "0009107838",
        name: "Husni",
        gender: "L",
        birthdate: "26-03-1996",
        phone_1: "0851511315",
        phone_2: "",
        photo: "",
        status: "tidak aktif",
      },
    ],
  }),
  getters: {
    //  getStudentScheduleByNis: (state) => {
    //   return (nis) => state.all.find((val) => val.nis == nis);
    // },
    getStudentByNis: (state) => {
      return (nis) => state.all.find((val) => val.nis == nis);
    },
  },
  actions: {},
});
