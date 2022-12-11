// import axios from "axios";
import { defineStore } from "pinia";
// import { ref } from "vue";
// import { Notify } from "quasar";
// import { io } from "socket.io-client";
import { socket } from "src/services/socketio-service";

export const useStudentActivitiesStore = defineStore("StudentActivities", {
  state: () => ({
    all: [],
    today: [],
    activity: {},
    isPresenceTime: false,
  }),
  getters: {
    // getStudentActivitiesByOrder: (state) => {
    //   return (order) => state.all.find((val) => val.time_order == order);
    // },
    // getActivitiesTodayByTime: (state) => {
    //   return async (now) =>
    //     state.today?.find((val) => val.start <= now && val.end >= now);
    //   //  state.today?.find((val) => console.log(val.start) );

    //   // console.log(state.today);
    // },
    getCurrentActivity: (state) => {
      return () => state.activity;
    },
  },
  actions: {
    currentActivity() {
      socket.emit("activity:getcurrent");
      socket.on("activity:current", (payload) => {
        if (payload?.length) {
          console.log(payload);
          this.activity = payload[0];
          this.isPresenceTime = true;
        }
      });
    },
    async startActivity() {
      socket.on("activity:start", (payload) => {
        this.activity = payload;
        this.isPresenceTime = true;
      });
    },

    async endActivity() {
      socket.on("activity:end", () => {
        this.isPresenceTime = false;
      });
    },

    //   async getActivitiesByDayFromDB(day) {
    //     await axios
    //       .post(`${process.env.API}student/activities/day`, {
    //         day,
    //       })
    //       .then((res) => {
    //         // console.log(res.data.data);
    //         this.today = res.data.data;
    //       })
    //       .catch((err) => {
    //         Notify.create({
    //           message: "Gagal Terhubung ke Server, Hubungi Admin!",
    //           type: "negative",
    //           position: "center",
    //           classes: "q-px-xl",
    //           timeout: 600000,
    //         });
    //       });
    //   },
  },
});
