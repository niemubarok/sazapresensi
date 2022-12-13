import axios from "axios";
import { defineStore } from "pinia";
// import { ref } from "vue";
import { Notify } from "quasar";
// import { io } from "socket.io-client";
import { socket } from "src/services/socketio-service";
import ls from "localstorage-slim";
ls.config.encrypt = true;

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
      socket.on("activity:current", (activity) => {
        if (activity?.length) {
          ls.set("activityId", activity[0]?.id);
          // console.log(activity);
          this.activity = activity[0];
          this.isPresenceTime = true;
        }
      });
    },
    async startActivity() {
      socket.on("activity:start", (activity) => {
        ls.set("activityId", activity?.id);
        console.log(activity);
        this.activity = activity;
        this.isPresenceTime = true;
      });
    },

    async endActivity() {
      socket.on("activity:end", () => {
        this.isPresenceTime = false;
        this.activity = {};
      });
    },

    async getAllActivitiesFromServer() {
      await axios
        .get(`${process.env.API}student/activities/all`)
        .then((res) => {
          // console.log(res.data.data);
          this.all = res.data.data;
        })
        .catch((err) => {
          Notify.create({
            message: "Gagal Terhubung ke Server, Hubungi Admin!",
            type: "negative",
            position: "center",
            classes: "q-px-xl",
            timeout: 600000,
          });
        });
    },
  },
});
