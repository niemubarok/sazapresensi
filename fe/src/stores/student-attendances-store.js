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
    filtered: [],
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
    getFilteredAttendances: (state) => {
      return () => {
        const activityId = ref(ls.get("activityId"));
        const isGeneral = ref(ls.get("isGeneralLocation"));
        const location = ref(ls.get("location"));
        const gender = ref(ls.get("gender"));
        // const _gender = gender == "both" ?
        // console.log(classId);

        if (isGeneral.value) {
          if (gender.value != "both") {
            return state.attendances.filter(
              (val) => console.log(val)
              // val.activity_id == activityId.value &&
              // val.gender == gender.value &&
              // val.class_id == location.value.id
            );
          }
        }

        return state.attendances.filter(
          (val) =>
            val.activity_id == activityId.value &&
            val.class_id == location.value.id
        );
      };
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
    getAttendancesFromServer() {
      // console.log("attendance Store");
      const activity_Id = ref(ls.get("activityId"));
      const class_id = ref(ls.get("location")?.id);
      axios
        .post(process.env.API + "student/attendances", {
          data: {
            date: getTime().date,
            activity_Id: activity_Id.value,
            class_id: class_id.value,
            // activityId,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.attendances = res.data.data;
          // console.log(res.data.data);
          // res.data.data.forEach((data) => this.attendances.unshift(data));
        });
    },
    filterAttendances() {
      const activityId = ref(ls.get("activityId"));
      const isGeneral = ref(ls.get("isGeneralLocation"));
      const location = ref(ls.get("location"));
      const gender = ref(ls.get("gender"));
      // const _gender = gender == "both" ?
      // console.log(classId);

      if (isGeneral.value) {
        if (gender.value != "both") {
          return this.attendances.filter(
            (val) =>
              val.activity_id == activityId.value &&
              val.gender == gender.value &&
              val.class_id == location.value.id
          );
        }
      }

      return this.attendances.filter(
        (val) =>
          val.activity_id == activityId.value &&
          val.class_id == location.value.id
      );
    },
  },
});
