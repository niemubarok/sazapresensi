<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <q-header v-if="$route.meta.isSidebar" class="bg-white text-grey-8 q-py-xs" elevated>
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu" />
        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <!-- <q-icon :name="fabYoutube" color="red" size="28px" /> -->
          <q-toolbar-title shrink class="text-weight-bold">
            Salsabiila Zainia

            <small>Presensi</small>
            <!-- {{ exampleStore.counter }} -->
          </q-toolbar-title>
        </q-btn>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()" v-if="$q.screen.gt.sm">
          </q-btn>
          <!-- <q-btn round dense flat color="white" icon="fab fa-github" type="a"
            href="https://github.com/pratik227/quasar-admin" target="_blank">
          </q-btn>
          <q-btn round dense flat icon="fas fa-heart" style="color:#9d4182 !important;" type="a"
            href="https://github.com/sponsors/pratik227" target="_blank">
          </q-btn> -->
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
        </div>
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
