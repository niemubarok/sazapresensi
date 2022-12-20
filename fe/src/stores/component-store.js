import { defineStore } from "pinia";
import { ref } from "vue";

export const useComponentStore = defineStore("componentState", {
  state: () => ({
    leftDrawerOpen: false,
    test: "test",
    searchModel: ref(""),
  }),
  getters: {
    getSearchModel: (state) => {
      return () => state.searchModel.value;
    },
  },
  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    onClearSearch() {
      this.searchModel = "";
    },
  },
});
