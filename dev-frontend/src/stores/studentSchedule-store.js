import { defineStore } from "pinia";
import { ref } from "vue";

export const useStudentScheduleStore = defineStore("StudentSchedules", {
  state: () => ({
    all: ref([
      {
        id: 1,
        nis: "0012421387",
        schedule_id: 1,
      },
      {
        id: 2,
        nis: "0009107838",
        schedule_id: 2,
      },
    ]),
  }),
  getters: {
    getStudentScheduleByNis: (state) => {
      return (nis) => state.all.find((val) => val.nis == nis);
    },
  },
  actions: {},
});
