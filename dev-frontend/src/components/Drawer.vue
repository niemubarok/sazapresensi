<template>
  <q-scroll-area class="fit">
    <q-list padding>
      <!-- <q-expansion-item expand-icon=" ">
        <template #header>
          <q-icon name="dashboard" color="grey" size="sm" />
          <q-item-label header class="text-weight-bold text-uppercase">
            DASHBOARD
          </q-item-label>
        </template>
      </q-expansion-item> -->

      <!-- <ExpansionMenu :icon="'dashboard'" title="MASTER DATA" link="Dashboard" /> -->


      <!-- <q-separator class="q-my-md" /> -->

      <ExpansionMenu :ikon="'folder'" title="MASTER DATA" :links="master" />
      <q-separator class="q-mt-md q-mb-xs" />
      <ExpansionMenu icon="dashboard" title="PRESENSI" :links="master" />
    </q-list>
  </q-scroll-area>
</template>

<script setup>
// import { useComponentStore } from "src/stores/component-store";
import { storeToRefs } from "pinia";

import {
  fabYoutube,
  fasSitemap,
  fasPersonChalkboard,
  fasUserGroup,
} from "@quasar/extras/fontawesome-v6";

// const componentState = useComponentStore();

// const links1 = [
// { icon: "dashboard", text: "Dashboard" },
// { icon: 'folder', text: 'Master Data' },
// { icon: 'subscriptions', text: 'Subscriptions' }
// ];
const master = [
  { icon: fasPersonChalkboard, text: "Guru" },
  { icon: fasUserGroup, text: "Santri" },
  { icon: fasSitemap, text: "Jabatan" },
  { icon: "watch_later", text: "Jam" },
];
const links3 = [
  { icon: fabYoutube, text: "YouTube Premium" },
  { icon: "local_movies", text: "Movies & Shows" },
  { icon: "videogame_asset", text: "Gaming" },
  { icon: "live_tv", text: "Live" },
];
const links4 = [
  { icon: "settings", text: "Settings" },
  { icon: "flag", text: "Report history" },
  { icon: "help", text: "Help" },
  { icon: "feedback", text: "Send feedback" },
];
</script>
