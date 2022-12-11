import axios from "axios";
import { defineStore } from "pinia";
import { Notify } from "quasar";
import ls from "localstorage-slim";

export const useStudentStore = defineStore("student", {
  state: () => ({
    all: [],
    student: {},
  }),
  getters: {
    getStudentsByClass: (state) => {
      return () => state.all;
    },
    getStudentByNis: (state) => {
      return (nis) => state.all.find((val) => val.nis == nis);
    },
  },
  actions: {
    async getStudentByNisFromDB(nis) {
      await axios
        .post(process.env.API + "student/nis", {
          nis,
        })
        .then((res) => {
          this.student = res.data.data;
        })
        .catch((err) => {
          Notify.create({
            message: "Gagal Terhubung ke server, Hubungi Admin!",
            type: "negative",
            position: "center",
            classes: "q-px-xl",
          });
        });
    },
    async getStudentsFromDB() {
      await axios.get(process.env.API + "student/all").then((res) => {
        this.all = res.data.data;
      });
    },
    async getStudentsByClassFromDB(locationId) {
      const isGeneral = ls.get("isGeneralLocation");
      await axios
        .post(process.env.API + "student/class", {
          locationId,
          isGeneral,
        })
        .then((res) => {
          this.all = res.data.data;
        });
    },
  },
});
