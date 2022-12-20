import WS from "src/pages/WS.vue";

const routes = [
  {
    path: "/",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: { isSidebar: true },
      },
      {
        path: "anjungan",
        name: "anjungan",
        component: () => import("src/pages/AttendancePage.vue"),
        meta: {
          isSidebar: false,
        },
      },
      {
        path: "/master/activity",
        name: "activityMaster",
        component: () => import("src/pages/ActivityMasterFormPage.vue"),
        meta: {
          isSidebar: true,
          isSearch: true,
          searchLabel: "Aktivitas",
        },
      },
      {
        path: "/wa",
        name: "whatsapp",
        component: () => import("src/pages/WhatsappPage.vue"),
        meta: {
          isSidebar: false,
        },
      },
    ],
  },
  {
    path: "/tes",
    component: WS,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
