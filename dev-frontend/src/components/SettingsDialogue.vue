<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="q-px-md q-pt-sm glass relative"
      style="width: 500px; height: fit-content"
    >
      <div>
        <q-avatar
          size="40px"
          class="cursor-pointer z-top absolute-top-right q-ma-sm"
          text-color="grey-7"
          color="grey-5"
          icon="close"
          @click="dialogRef.hide()"
        />
      </div>
      <!-- <q-icon name="close"  /> -->
      <q-item>
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label
            style="margin-left: -20px"
            class="q-mt-xs text-weight-bolder"
            >Pengaturan Anjungan</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-separator inset />

      <div class="q-pa-md q-ml-sm">
        <div class="q-gutter-y-md column">
          <q-select
            v-model="models.location"
            color="dark"
            :options="locationOptions"
            label="Lokasi Absen"
          >
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-select>
          <div class="row">
            <q-chip flat class="bg-transparent text-body">Mode List :</q-chip>
            <q-radio
              v-model="models.listMode"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="card"
              label="Card"
            />
            <q-radio
              v-model="models.listMode"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="table"
              label="Table"
            />
          </div>
        </div>
      </div>
      <q-card-actions align="right">
        <!-- <q-btn flat label="Action 1" /> -->
        <q-btn flat label="Simpan" @click="onSaveSettings" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import SuccessCheckMark from "./SuccessCheckMark.vue";
import { ref } from "vue";
import ls from "localstorage-slim";

ls.config.encrypt = true;

const props = defineProps({
  name: String,
  in: String,
  out: String,
  status: String,
});

const models = ref({
  location: !ls.get("locationLabel") ? null : ls.get("locationLabel"),
  listMode: !ls.get("listMode") ? "card" : "table",
});

// const locationModel = ref();
const locationOptions = [
  {
    label: "Kelas VII",
    id: "klsvii",
  },
  {
    label: "Kelas VIII",
    id: "klsviii",
  },
  {
    label: "Kelas IX",
    id: "klsix",
  },
  {
    label: "Kelas X",
    id: "klsx",
  },
  {
    label: "Kelas XI",
    id: "klsxi",
  },
  {
    label: "Kelas XII",
    id: "klsxii",
  },
  {
    label: "Masjid",
    id: "masjid",
  },
  {
    label: "Asrama",
    id: "asrama",
  },
];

const onSaveSettings = () => {
  // console.log(optionModels.value.location.id);
  ls.set("location", models.value.location?.id);
  ls.set("locationLabel", models.value.location?.label);
  ls.set("listMode", models.value.listMode);
  // console.log(window.location);
  window.location.reload();
  dialogRef.value.hide();
  // console.log(locationId);
};

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>

<style scoped>
.glass {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.378);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}
</style>
