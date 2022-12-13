<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <q-header v-if="$route.meta.isSidebar" class="text-grey-8 q-py-xs"
      style="background-color: rgb(229, 229, 229, 0.9)">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu" />
        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-toolbar-title shrink class="text-weight-bold">
            <q-img width="50px" alt="saza logo" src="~assets/brand/pondok.png" />
            <span class="text-primary">
              Salsabiila Zainia
            </span>

            <small>Presensi</small>
          </q-toolbar-title>
        </q-btn>
        <q-space />
        <!-- <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()" v-if="$q.screen.gt.sm">
          </q-btn>
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense class="text-dark"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-btn>
        </div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-if="$route.meta.isSidebar" v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1 text-dark">
      <ExpansionMenu />
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import MessagesVue from './Messages.vue'

import { defineComponent, ref } from 'vue'
import ExpansionMenu from 'src/components/ExpansionMenu.vue';

const leftDrawerOpen = ref(false)
</script>
