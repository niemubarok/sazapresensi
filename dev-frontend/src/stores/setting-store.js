import axios from "axios";
import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    all: [],
  }),
  getters: {
    getSettings: (state) => {
      return () => state.all;
    },
  },
  actions: {
    getSettingsFromDB() {
      axios.get(process.env.API + "settings/all").then((res) => {
        this.all = res.data;
      });
    },
    updateSetting(id) {
      axios
        .patch(process.env.API + "settings/update", {
          id,
        })
        .then((res) => {
          this.all = res.data;
        });
    },
  },
});
