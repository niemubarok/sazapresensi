<template>
  <div class="window-height">
    <q-table
      binary-sort
      title="DAFTAR HADIR SANTRI"
      :rows="tableRows()"
      :columns="columns"
      row-key="name"
      :filter="filter"
      rows-per-page-label="Per halaman "
      :rows-per-page-options="[40]"
      grid
      style="padding-left: 250px"
      title-class="text-weight-bold q-px-xl bg-grey-3  rounded-borders"
      dense
      binary-state-sort
    >
      <template #top-left>
        <div style="margin-bottom: -20px" class="row">
          <q-card class="bg-grey-1 column q-px-xs" square flat>
            <div class="bg-grey-1">
              <q-chip
                icon="dashboard"
                color="grey-1"
                class="rounded-borders transparent"
                dense
                ><span
                  style="border-left: 3px solid dark"
                  class="q-px-xs text-weight-bolder"
                  >DAFTAR KEHADIRAN SANTRI</span
                >
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

        <div class="row q-px-md">
          <q-chip
            outline
            icon="today"
            size="sm"
            :label="date"
            floating="bottom"
            class="card-border-radius"
          />
          <q-chip
            icon="place"
            outline
            size="sm"
            class="card-border-radius text-dark"
          >
            <!-- <span> Lokasi: </span> -->
            <span
              style="margin-right: -5px"
              class="q-ml-xs q-px-md card-border-radius bg-dark text-white"
            >
              {{ location }}</span
            >
          </q-chip>
        </div>
      </template>

      <template v-slot:no-data>
        <div class="full-width row flex-center text-grey q-gutter-sm">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section>
              <div class="text-h6">Belum ada Santri absen</div>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <template v-slot:item="props">
        <AttandeeCard
          :name="props.row.students.name"
          :in="props.row.in"
          :out="props.row.out"
          :status="props.row.status"
        />
      </template>

      <template v-slot:pagination="scope">
        <div
          class="row fixed-bottom-right q-mb-md z-top"
          style="margin-right: 100px"
        >
          <div class="column q-pr-xl">
            <div class="row">
              <q-chip text-color="dark" size="sm" color="grey-1">
                filter :</q-chip
              >
              <q-chip
                class="card-border-radius"
                text-color="white"
                size="sm"
                color="blue-grey-8"
                clickable
              >
                Semua
              </q-chip>
              <q-chip
                class="card-border-radius"
                text-color="white"
                size="sm"
                color="green"
                clickable
              >
                Tepat Waktu
              </q-chip>
              <q-chip
                class="card-border-radius"
                text-color="white"
                size="sm"
                color="red"
                clickable
              >
                Telat
              </q-chip>
            </div>
          </div>
          <!-- </div> -->
          <div class="column q-px-md">
            <q-btn
              unelevated
              class="no-shadow card-border-radius"
              :icon="fasChevronLeft"
              size="xs"
              color="blue-grey-8"
              :disable="scope.isFirstPage"
              @click="scope.prevPage()"
            >
              <q-tooltip v-if="!scope.isFirstPage"
                >Halaman Sebelumnya</q-tooltip
              >
            </q-btn>
          </div>

          <div class="column">
            <q-btn
              unelevated
              class="card-border-radius"
              :icon="fasChevronRight"
              size="xs"
              color="blue-grey-8"
              :disable="scope.isLastPage"
              @click="scope.nextPage()"
            >
              <q-tooltip v-if="!scope.isLastPage"
                >Halaman Selanjutnya</q-tooltip
              >
            </q-btn>
          </div>
          <div class="column q-px-md">
            <q-chip
              outline
              size="xs"
              dense
              class="card-border-radius text-dark q-pa-sm"
              >halaman : {{ scope.pagination.page }}</q-chip
            >
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useAttendancesStore } from "src/stores/attendances-store";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { fasChevronLeft, fasChevronRight } from "@quasar/extras/fontawesome-v6";
import AttandeeCard from "./AttandeeCard.vue";
import { getTime } from "src/utilities/time-util";
import ls from "localstorage-slim";

// import { fab } from "@quasar/extras/fontawesome-v6";
const activityId = ref("");
const useAttendance = useAttendancesStore();
const attendances = useAttendance.attendances;
const filter = ref("");
const location = ref(ls.get("locationLabel"));
const date = getTime().date.toLocaleDateString();

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

const tableRows = () => useAttendance.getFilteredAttendance();
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
