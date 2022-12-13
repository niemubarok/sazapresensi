<template>

  <q-list>
    <template v-for="navItem in navItems" :key="navItem.text">
      <q-item v-if="!navItem.child" :to="navItem.to" active-class="q-item-no-link-highlighting">
        <q-item-section avatar>
          <q-icon :name="navItem.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ navItem.text }}</q-item-label>
        </q-item-section>
      </q-item>


      <q-expansion-item v-else :icon="navItem.icon" :label="navItem.text" expand-separator
        :hide-expand-icon="!navItem.child">
        <q-list class="q-pl-lg" v-if="navItem.child">
          <template v-for="child in navItem.child" :key="child.text">
            <q-item :to="child.to" exact active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon :name="child.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ child.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-expansion-item>
    </template>

  </q-list>

</template>

<script setup>
import { defineComponent } from "vue";
import {
  fabYoutube,
  fasSitemap,
  fasPersonChalkboard,
  fasUserGroup,
} from "@quasar/extras/fontawesome-v6";

const navItems = [
  {
    icon: "dashboard",
    text: "Dashboard",
    to: { name: '' },
  },
  {
    icon: "table_chart",
    text: "Data Absensi",
    to: { name: '' },
    child: [{
      icon: fasPersonChalkboard, text: "Guru", to: { name: '' },
    },
    {
      icon: fasUserGroup, text: "Santri", to: { name: '' },
      // icon: fasPersonChalkboard, text: "Guru", to: {name:''}
    }]
  },
  {
    icon: "folder",
    text: "Data Master",
    to: { name: '' },
    child: [{
      icon: fasPersonChalkboard, text: "Guru", to: { name: '' },
    },
    {

      icon: fasUserGroup, text: "Santri", to: { name: '' },
    },
    {
      icon: fasPersonChalkboard, text: "Activitas", to: { name: 'activityMaster' }
    }]
  },
  {
    icon: "dvr",
    text: "Anjungan",
    to: { name: 'anjungan' },
  },
  // { icon: fasUserGroup, text: "Santri", to: {name:''} },
  // { icon: fasSitemap, text: "Jabatan", to: {name:''} },
  // { icon: "watch_later", text: "Jam", to: '' },
];
</script>
