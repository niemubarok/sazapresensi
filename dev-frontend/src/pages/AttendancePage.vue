<template>
  <div class="row text-center bg-grey-1">
    <!-- <div class="fixed-top z-top">
      <q-chip rounded :label="date" floating="bottom" />
    </div> -->
    <div class="column">
      <q-card
        class="bg-dark fixed-top-left text-center q-py-md q-ma-md"
        style="width: 200px"
      >
        <q-img
          width="150px"
          class="z-top"
          alt="Quasar logo"
          src="~assets/IEC.png"
        />

        <!-- <q-separator color="grey-8" class="q-mt-md" /> -->
        <q-linear-progress
          dark
          rounded
          indeterminate
          color="grey-8"
          class="q-mt-sm"
        />

        <input
          v-model="inputValue"
          ref="input"
          type="text"
          class="bg-dark text-dark no-border no-outline"
          v-on:keyup.enter="submitAttendance"
        />

        <div>
          <q-skeleton
            class="q-mx-xs vertical-middle"
            style="width: 190px; height: 100px; margin-top: -20px"
            bordered
            type="rect"
          >
            <!-- <q-card class="bg-yellow-2 rounded-borders q-py-xs"> -->
            <p class="text-yellow-4 q-mt-md">Belum ada Guru yang Absen</p>
            <!-- </q-card> -->
          </q-skeleton>
        </div>
        <q-separator color="grey-8" class="q-mt-md" />

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
        <q-card
          class="glass"
          style="width: 200px; height: 100px; margin-top: -130px"
        >
          <q-card-section>
            <Clock />
            <div class="text-body text-white">
              <span> Absen Untuk </span>
            </div>
            <q-chip v-if="!isPresenceTime" class="bg-red text-body text-white"
              >Belum Waktunya Absen</q-chip
            >
            <q-chip
              v-else
              class="text-subtitle2 card-border-radius text-dark"
              >{{ activityName }}</q-chip
            >
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-if="isPresenceTime" class="column">
      <AttendanceTable v-if="listMode == 'table'" />
      <AttendanceCardList v-else />
    </div>
  </div>
  <div class="row q-pa-md fixed-bottom" style="width: 400px">
    <q-btn flat color="grey" icon="settings" @click="onClickSettings()" />
    <q-btn
      flat
      color="grey"
      @click="$q.fullscreen.toggle()"
      :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
    />
    <!-- :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'" -->
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { onStartTyping } from "@vueuse/core";
import { submit } from "src/services/submit-attendance-service";

//components
import Clock from "src/components/Clock.vue";
import AttendanceCardList from "src/components/AttendanceCardList.vue";
import AttandeeCard from "src/components/AttandeeCard.vue";
import SettingsDialogue from "src/components/SettingsDialogue.vue";
import AttendanceTable from "src/components/AttendanceTable.vue";

//stores
import { useStudentActivitiesStore } from "src/stores/student-activities-store";
import {
  getTime,
  getDayName,
  timeToMillisecond,
} from "src/utilities/time-util";
import { useAttendancesStore } from "src/stores/attendances-store";

import ls from "localstorage-slim";

ls.config.encrypt = true;

const $q = useQuasar();

const inputValue = ref("");
const input = ref(null);

// const listMode = ref(ls.get("listMode"));

const today = new Date();
const date = getTime().date;
const now = ref("");

const useStudentActivities = useStudentActivitiesStore();
const studentActivityByDay = () =>
  useStudentActivities.getActivitiesByDayFromDB(getDayName(getTime().date));
const activity = ref(null);

const activityName = ref("");
const studentAttendances = useAttendancesStore();

onStartTyping(() => {
  if (!input.value.active) {
    input.value.focus();
  }
});

const isPresenceTime = ref(false);

const presenceTimeStart = () => {
  activityName.value = activity.value?.name;
  ls.set("activityId", activity.value?.id);

  ls.set("activityName", activity.value?.name);
  studentAttendances.filterAttendances(activity.value?.id);
  isPresenceTime.value = true;
};

const presenceTimeEnd = () => {
  isPresenceTime.value = false;
};

const checkScheduleOnMounted = async () => {
  if (activity.value != undefined) {
    presenceTimeStart();
  } else {
    presenceTimeEnd();
  }
};

const scheduleChecker = () => {
  if (now.value == "00:00:00") {
    window.location.reload();
  }

  if (activity.value?.start == now.value) {
    presenceTimeStart();
  } else if (activity.value?.end == now.value) {
    presenceTimeEnd();
  } else {
    ls.get("activityId");
    activityName.value = ls.get("activityName");
    studentAttendances.filterAttendances(activity.value?.id);
  }
};

setInterval(() => {
  now.value = getTime().time;
  // console.log(activity.value);
  activity.value = useStudentActivities.getActivitiesTodayByTime(
    getTime().time
  );
  scheduleChecker();
}, 1000);

const onClickSettings = () => {
  const settingsDialog = $q.dialog({
    progress: true,
    component: SettingsDialogue,
  });
  settingsDialog.update();
};

const submitAttendance = () => {
  submit(inputValue.value);
  inputValue.value = "";
};

onMounted(async () => {
  // console.log(ls.get("location"));
  await studentActivityByDay();
  activity.value = useStudentActivities.getActivitiesTodayByTime(
    getTime().time
  );

  // console.log();
  if (!ls.get("location")) {
    onClickSettings();
  }
  // scheduleChecker();
  checkScheduleOnMounted();
  studentAttendances.getAttendancesFromDB();
});
</script>

<style scoped>
.glass {
  /* From https://css.glass */
  background: rgba(0, 14, 24, 0.801);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.1px);
  -webkit-backdrop-filter: blur(7.1px);
  border: 1px solid rgba(255, 255, 255, 0.34);
}
</style>
