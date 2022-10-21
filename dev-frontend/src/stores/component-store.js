import { defineStore } from "pinia";

export const useComponentStore = defineStore("componentState", {
  state: () => ({
    leftDrawerOpen: false,
    test: "test",
  }),
  getters: {},
  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
