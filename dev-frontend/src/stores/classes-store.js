import { defineStore } from "pinia";

export const useClassesStore = defineStore("classes", {
  state: () => ({
    classes: [
      {
        class_id: "klsvii",
        name: "Kelas 7",
        location: "location_id",
      },
      {
        class_id: "klsviii",
        name: "Kelas 8",
        location: "location_id",
      },
      {
        class_id: "klsix",
        name: "Kelas 9",
        location: "location_id",
      },
    ],
  }),
  getters: {
    getClassById: (state) => {
      return (id) => state.classes.find((val) => val.class_id == id);
    },
  },
});
