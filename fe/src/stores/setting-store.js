import axios from "axios";
import { defineStore } from "pinia";
import ls from "localstorage-slim";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    all: [],
  }),
  getters: {
    getSettings: (state) => {
      return () => state.all;
    },
    getSpecificSetting: (state) => {
      return (name) =>
        ls.get("settings")?.find((val) => val.name == name).value;
    },
  },
  actions: {
    async getSettingsFromDB() {
      axios.get(process.env.API + "setting/all").then((res) => {
        ls.set("settings", res.data.data);
        this.all = res.data.data;
      });
    },
    updateSetting(id) {
      axios
        .patch(process.env.API + "setting/update", {
          id,
        })
        .then((res) => {
          this.all = res.data;
        });
    },
  },
});
