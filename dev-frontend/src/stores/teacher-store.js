import { defineStore } from "pinia";

export const useTeacherStore = defineStore("teacher", {
  state: () => {
    teacher: [
      {
        nip: "0009107837",
        name: "Arina",
        gender: "P",
        birthdate: "26-03-1996",
        phone_1: "0851511315",
        status: "aktif",
      },
      {
        nip: "0009107839",
        name: "Rizal",
        gender: "L",
        birthdate: "26-03-1996",
        phone_1: "0851511315",
        photo: "",
        status: "tidak aktif",
      },
    ];
  },
  getters: {},
  actions: {},
});
