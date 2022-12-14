import axios from "axios";
import { defineStore } from "pinia";
import { Notify } from "quasar";
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
          this.activity = activity[0];
          this.isPresenceTime = true;
        } else {
          this.isPresenceTime = false;
        }
      });
    },
    async startActivity() {
      socket.on("activity:start", (activity) => {
        ls.set("activityId", activity?.id);
        // console.log(activity);
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
        .get(`${process.env.API}master/activities/all`)
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
    async updateActivity(id, column, value) {
      await axios
        .patch(`${process.env.API}master/activities/update`, {
          data: {
            id,
            column,
            value,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            Notify.create({
              message: "Data Berhasil Diupdate",
              color: "green-4",
              icon: "check",
              position: "top",
              timeout: 1000,
            });
          }
        });
    },
    async createActivity(activity) {
      await axios
        .post(`${process.env.API}master/activities/create`, {
          data: {
            activity,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            this.all.unshift(res.data.data);
            if (res.status === 201) {
              Notify.create({
                message: "Berhasil Tambah Data",
                color: "green-4",
                icon: "check",
                position: "top",
                timeout: 1000,
              });
            }
          }
        });
    },
    async deleteActivity(id) {
      // delete this.all[index];
      try {
        await axios
          .delete(`${process.env.API}master/activities/delete`, {
            data: {
              id,
            },
          })
          .then((res) => {
            if (res.status != 204) {
              Notify.create({
                message: "Data Gagal Dihapus",
                color: "red",
                icon: "error",
                position: "top",
              });
            }
            const value = this.all.find((activity) => activity?.id == id);
            const index = this.all.indexOf(value);
            delete this.all[index];
            Notify.create({
              message: "Data Berhasil Dihapus",
              color: "green",
              icon: "check",
              position: "top",
            });
          });
      } catch (error) {
        Notify.create({
          message: "Gagal Terhubung ke server",
          color: "red",
          icon: "error",
          position: "top",
        });
      }
    },
  },
});
