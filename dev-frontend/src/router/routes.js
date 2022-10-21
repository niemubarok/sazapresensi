const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: { isSidebar: true },
      },
      {
        path: "/anjungan",
        name: "anjungan",
        component: () => import("src/pages/AttendancePage.vue"),
        meta: {
          isSidebar: false,
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
