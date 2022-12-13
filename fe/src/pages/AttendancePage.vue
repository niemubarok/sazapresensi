<template>
  <div class="row text-center container">
    <div class="column">
      <q-card class="bg-dark fixed-top-left text-center q-py-md q-mx-md" style="width: 200px">
        <q-img width="150px" class="z-top" alt="saza logo" src="~assets/brand/IEC.png" />

        <q-linear-progress dark rounded indeterminate color="grey-8" class="q-mt-sm" size="xl" />

        <input v-model="inputValue" ref="input" type="text" v-on:keyup.enter="submitAttendance"
          class="absolute-top bg-dark text-dark no-border no-outline" />


        <div>
          <div class="flex align-start">
            <q-chip class="bg-transparent text-grey-4" style="
                border-top: 0px;
                border-bottom: 1px solid grey;
                border-right: 0px;
                border-left: 0;
              " square label="Ustadz / Ustadzah" size="sm" />
          </div>
          <q-skeleton v-if="!teacher" class="q-mx-xs vertical-middle"
            style="width: 190px; height: 75px; margin-top: 10px" bordered type="rect">
            <p class="text-yellow-4 q-mt-sm">Belum ada Guru yang Absen</p>
          </q-skeleton>

          <AttendeeCard v-else :src="teacherAvatar" :name="teacher?.name" :in="teacher?.in" :status="teacher?.status">
          </AttendeeCard>
        </div>
        <!-- <q-separator color="grey-8" class="q-mt-md" /> -->

        <div class="q-pt-md q-ml-md float-left">
          <q-chip size="xs" color="dark" text-color="white">
            <q-avatar color="green" text-color="white"></q-avatar>
            <span style="font-size: 10px"> Tepat Waktu </span>
          </q-chip>
          <!-- </div> -->
          <!-- <div class="float-left q-ml-md"> -->
          <q-chip size="xs" color="dark" text-color="white">
            <q-avatar color="red" text-color="white"></q-avatar>
            <span style="font-size: 10px"> Telat </span>
          </q-chip>
        </div>
      </q-card>
      <div class="fixed-bottom-left text-center q-ma-md q-mb-xl">
        <q-card class="glass" style="width: 200px; height: 100px; margin-top: -130px">
          <q-card-section>
            <Clock />
            <div v-if="isPresenceTime" class="text-body text-white">
              <span> Absen Untuk </span>
            </div>
            <q-chip v-if="!isPresenceTime" class="bg-red text-body text-white">Belum Waktunya Absen</q-chip>
            <q-chip v-else class="text-subtitle2 card-border-radius text-dark">{{ activity?.name }}</q-chip>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-if="isPresenceTime" class="column">
      <!-- <AttendanceTable v-if="listMode == 'table'" /> -->
      <AttendanceCardList />
    </div>
  </div>
  <marquee direction="left" class="fixed-bottom q-mb-sm"><q-chip class="q-pl-md text-weight-bolder" outline size="sm"
      color="green-9">
      <q-avatar icon="lightbulb" color="green-9" text-color="white" />
      Bohong
      adalah pangkal dari
      segala dosa
    </q-chip>

  </marquee>

  <q-linear-progress dark rounded indeterminate color="blue-8" class="fixed-bottom q-mb-sm" size="xs" />
  <div class="row q-pa-md fixed-bottom" style="width: 400px">
    <q-btn to="/" flat color="grey" icon="home" />
    <q-btn flat color="grey" icon="settings" @click="onClickSettings()" />
    <q-btn flat color="grey" @click="$q.fullscreen.toggle()"
      :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" />
  </div>
</template>

<script setup>
import { Notify, useQuasar } from "quasar";
import { onBeforeMount, onMounted, ref, watch, computed } from "vue";
import { onStartTyping } from "@vueuse/core";
import { submit } from "src/services/submit-attendance-service";

//components
import Clock from "src/components/Clock.vue";
import AttendanceCardList from "src/components/AttendanceCardList.vue";
import AttendeeCard from "src/components/AttendeeCard.vue";
import SettingsDialogue from "src/components/SettingsDialogue.vue";
// import AttendanceTable from "src/components/AttendanceTable.vue";

//stores
import { useStudentActivitiesStore } from "src/stores/student-activities-store";
// import { getTime, getDayName } from "src/utilities/time-util";
// import { useStudentAttendancesStore } from "src/stores/student-attendances-store";
// import { useTeacherStore } from "src/stores/teacher-store";

import ls from "localstorage-slim";
import { useSettingStore } from "src/stores/setting-store";
import { useStudentStore } from "src/stores/student-store";
import { useTeacherAttendanceStore } from "src/stores/teacher-attendances-store";
import { socket } from "src/services/socketio-service";

ls.config.encrypt = false;

const $q = useQuasar();

const inputValue = ref("");
const input = ref(null);
const settingStore = useSettingStore();
const baseUrl = settingStore.getBaseUrl();
const error = ref({
  connection: false,
});

const teacherAttendanceStore = useTeacherAttendanceStore();
const teacher = computed(() => teacherAttendanceStore.getTeacherByNip());
const teacherAvatar = computed(() => {
  return baseUrl + teacher.value?.avatar + ".jpeg";
});

const studentActivitiesStore = useStudentActivitiesStore();

const activity = computed(() => studentActivitiesStore.activity);

onStartTyping(() => {
  if (!input.value.active) {
    input.value.focus();
  }
});

const isPresenceTime = computed(() => studentActivitiesStore.isPresenceTime);

const onClickSettings = () => {
  const settingsDialog = $q.dialog({
    component: SettingsDialogue,
    noBackdropDismiss: true,
    persistent: true,
  });

  settingsDialog.update();
};

const submitAttendance = () => {
  submit(inputValue.value);
  inputValue.value = "";
};

onBeforeMount(() => {
  studentActivitiesStore.currentActivity();
});

onMounted(() => {
  useSettingStore().getSettingsFromDB();

  studentActivitiesStore.startActivity();
  studentActivitiesStore.endActivity();


  socket.on("activity:update", () => {
    // console.log("update");
    studentActivitiesStore.currentActivity();
    // window.location.reload()
  });
  if (!ls.get("location")) {
    onClickSettings();
  }



  socket.on("connect_error", () => {
    if (error.value.connection === false) {
      Notify.create({
        message: "Gagal Terhubung ke Server, Hubungi Admin!",
        type: "negative",
        position: "center",
        classes: "q-px-xl",
        timeout: 1000,
      });
      error.value.connection = true;
    }
  });

  setInterval(() => {
    socket.emit("ping", "woy")
  }, 1800000)
});



</script>

<style scoped>
.container {
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.glass {
  /* From https://css.glass */
  background: rgba(0, 14, 24, 0.86);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.1px);
  -webkit-backdrop-filter: blur(7.1px);
  border: 1px solid rgba(255, 255, 255, 0.34);
}
</style>
#Sibroh19 #Sibroh22 sibroh1#9
