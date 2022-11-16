import axios from "axios";
import { defineStore } from "pinia";
import { getTime } from "src/utilities/time-util";
import ls from "localstorage-slim";
import { ref } from "vue";
import { Notify } from "quasar";

export const useStudentAttendancesStore = defineStore("studentAttendance", {
  state: () => ({
    number: 0,
    attendances: [],
    filtered: {},
  }),
  getters: {
    getAttendances: (state) => {
      // return (activityId) => state.attendances;
      return (activityId) =>
        state.attendances.filter(
          (val) => val.activity_id == activityId
          // console.log(val.activity_id == activityId)
        );
    },
    getFilteredAttendance: (state) => {
      return () => state.filtered;
    },
  },
  actions: {
    async addAttendance(attendee) {
      await axios
        .post(process.env.API + "student/attendances/create", {
          data: attendee,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.status == 201) {
            this.attendances.unshift(res.data.data);
          }
        })
        .catch((err) => {
          Notify.create({
            message: "Gagal Menyimpan Absensi Hubungi Admin",
            type: "negative",
            position: "center",
            classes: "q-px-xl",
          });
        });
    },
    getAttendancesFromDB() {
      // console.log("attendance Store");
      axios
        .post(process.env.API + "student/attendances", {
          data: {
            date: getTime().date,
            // activityId,
          },
        })
        .then((res) => {
          this.attendances = res.data.data;
          // console.log(res.data.data);
          // res.data.data.forEach((data) => this.attendances.unshift(data));
        });
    },
    filterAttendances(activityId, classId, gender) {
      const isGeneral = ref(ls.get("isGeneralLocation"));

      if (isGeneral.value) {
        // const gender = ref(ls.get("gender"));
        this.filtered = this.attendances.filter(
          (val) =>
            val.activity_id == activityId && val.students.gender == gender
        );
      } else {
        this.filtered = this.attendances.filter(
          (val) => val.activity_id == activityId && val.class_id == classId
        );
      }

      // console.log(this.filtered);
    },
  },
});
