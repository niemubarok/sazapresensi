<template>
  <div>
    <q-table binary-sort title="DAFTAR HADIR SANTRI" :rows="tableRows" :columns="columns" row-key="name"
      :filter="filter" rows-per-page-label="Per halaman " :rows-per-page-options="[40]" grid style="padding-left: 250px"
      title-class="text-weight-bold q-px-xl bg-grey-3  rounded-borders" dense binary-state-sort>
      <template #top-left>
        <div style="margin-bottom: -20px" class="row">
          <q-card class="transparent column q-px-xs" square flat>
            <div>
              <q-chip icon="dashboard" color="grey-1" class="rounded-borders transparent" dense><span
                  style="border-left: 3px solid dark" class="q-px-xs text-weight-bolder">DAFTAR KEHADIRAN SANTRI</span>
              </q-chip>
            </div>
          </q-card>

          <!-- <div class="column q-pl-xl">
            <div class="row">
              <q-chip size="sm" color="grey-1"> filter :</q-chip>
              <q-chip size="sm" color="blue" clickable> Semua </q-chip>
              <q-chip size="sm" color="green" clickable> Tepat Waktu </q-chip>
              <q-chip size="sm" color="red" clickable> Telat </q-chip>
            </div>
          </div> -->
          <!-- <q-banner dense> -->
        </div>
        <!-- </q-banner> -->
      </template>
      <template v-slot:top-right>
        <!-- <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          class="q-mr-xl"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input> -->
        <!-- <div class="column"> -->
        <!-- <div>
            <q-chip outline size="sm" class="card-border-radius text-dark">
              <span> Lokasi: </span>
              <span
                style="margin-right: -5px"
                class="q-ml-xs q-px-md card-border-radius bg-dark text-white"
              >
                {{ location }}</span
              >
            </q-chip>
          </div> -->
        <!-- </div> -->

        <!-- <div class="row q-px-md flex align-end fixed-top-right">
          <q-chip outline icon="today" size="md" :label="date" class="card-border-radius text-weight-bolder" />
          <q-chip icon="place" outline size="md" class="card-border-radius text-dark text-weight-bolder"
            :label="location"> -->
        <!-- <span> Lokasi: </span> -->
        <!-- <span class="q-ml-xs q-px-md card-border-radius bg-transparent text-dark text-weight-bold">
              {{ location }}</span> -->
        <!-- </q-chip>
        </div> -->
      </template>

      <template v-slot:no-data>
        <div class="bg-grey-2 q-mt-md text-grey">
          <q-card flat class=" bg-grey-2" style="width: 70vw;">
            <!-- <img src="https://cdn.quasar.dev/img/mountains.jpg" style="height: 300px" /> -->
            <TypingAnimation />
          </q-card>
        </div>
      </template>

      <template v-slot:item="props">
        <!-- {{ `${baseUrl}/uploads/photos/students/${props.row.student_nis}.jpg` }} -->
        <AttendeeCard :src="`${baseUrl}/uploads/photos/students/${props.row.student_nis}.jpg`" :name="props.row.name"
          :in="props.row.in" :status="props.row.status" class="q-mt-sm" />
      </template>

      <template v-slot:pagination="scope">
        <div class="row fixed-bottom-right q-mb-md z-top" style="margin-right: 100px">
          <!-- <div class="column q-pr-xl">
            <div class="row">
              <q-chip text-color="dark" size="sm" color="grey-1">
                filter :</q-chip>
              <q-chip class="card-border-radius" text-color="white" size="sm" color="blue-grey-8" clickable>
                Semua
              </q-chip>
              <q-chip class="card-border-radius" text-color="white" size="sm" color="green" clickable>
                Tepat Waktu
              </q-chip>
              <q-chip class="card-border-radius" text-color="white" size="sm" color="red" clickable>
                Telat
              </q-chip>
            </div>
          </div> -->
          <!-- </div> -->
          <div class="column q-px-md">
            <q-btn unelevated class="no-shadow card-border-radius" :icon="fasChevronLeft" size="xs" color="blue-grey-8"
              :disable="scope.isFirstPage" @click="scope.prevPage()">
              <q-tooltip v-if="!scope.isFirstPage">Halaman Sebelumnya</q-tooltip>
            </q-btn>
          </div>

          <div class="column">
            <q-btn unelevated class="card-border-radius" :icon="fasChevronRight" size="xs" color="blue-grey-8"
              :disable="scope.isLastPage" @click="scope.nextPage()">
              <q-tooltip v-if="!scope.isLastPage">Halaman Selanjutnya</q-tooltip>
            </q-btn>
          </div>
          <div class="column q-px-md">
            <q-chip outline size="xs" dense class="card-border-radius text-dark q-pa-sm">halaman : {{
                scope.pagination.page
            }}</q-chip>
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useStudentAttendancesStore } from "src/stores/student-attendances-store";
import { onBeforeMount, onMounted, ref, watch, computed } from "vue";
import { fasChevronLeft, fasChevronRight } from "@quasar/extras/fontawesome-v6";
import AttendeeCard from "./AttendeeCard.vue";
import { getTime } from "src/utilities/time-util";
import ls from "localstorage-slim";
import { useSettingStore } from "src/stores/setting-store";
import TypingAnimation from "./TypingAnimation.vue";

// import { fab } from "@quasar/extras/fontawesome-v6";
const attendanceStore = useStudentAttendancesStore();
const filter = ref("");
const location = ref(ls.get("location")?.label);
const date = `${getTime().day}, ${getTime().date.toLocaleDateString()}`;
const settingStore = useSettingStore();
const baseUrl = settingStore.getSpecificSetting("baseUrl");

const columns = [
  {
    name: "no",
    label: "NO",
    align: "center",
  },
  {
    name: "name",
    label: "Nama",
    align: "left",
  },
  {
    name: "class",
    label: "Kelas",
    align: "center",
  },
  {
    name: "date",
    label: "Tanggal",
    align: "center",
  },
  {
    name: "in",
    label: "Jam Datang",
    align: "center",
  },
  {
    name: "out",
    label: "Jam Pulang",
    align: "center",
  },
  {
    name: "status",
    label: "Status",
    align: "center",
  },
];

const tableRows = computed(() => attendanceStore.getFilteredAttendances());

// onBeforeMount(() => {
//   attendanceStore.getAttendancesFromServer();
// });
// onMounted(() => {
//   console.log(tableRows.value);
// });
</script>

<style>
/* div.q-table--dense div.q-table__top div.q-table-control {
  padding-bottom: 5px;
} */
.glass {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.267);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.1px);
  -webkit-backdrop-filter: blur(7.1px);
  border: 1px solid rgba(255, 255, 255, 0.34);
}
</style>
