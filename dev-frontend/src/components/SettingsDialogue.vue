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
            <!-- <q-chip flat class="bg-transparent text-body">Mode List :</q-chip> -->
            <q-radio
              v-model="models.gender"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="L"
              label="Putra"
            />
            <q-radio
              v-model="models.gender"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="P"
              label="Putri"
            />
            <q-radio
              v-model="models.gender"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="both"
              label="Putra & Putri"
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
import { onMounted, ref } from "vue";
import ls from "localstorage-slim";
import { useClassesStore } from "src/stores/classes-store";

ls.config.encrypt = false;

const props = defineProps({
  name: String,
  in: String,
  out: String,
  status: String,
});
const locationOptions = ref([]);
// const isGeneralLocation = ref(false)

const models = ref({
  location: !ls.get("locationLabel") ? null : ls.get("locationLabel"),
  gender: !ls.get("gender") ? null : ls.get("gender"),
  // listMode: !ls.get("listMode") ? "card" : "table",
});

const classesStore = useClassesStore();

onMounted(async () => {
  await classesStore.getClassesFromDB();
  locationOptions.value = classesStore.getAllClass;
});

const onSaveSettings = () => {
  if (models.value.location?.description == "general") {
    ls.set("isGeneralLocation", true);
  } else {
    ls.set("isGeneralLocation", false);
  }

  if (models.value.location != undefined) {
    ls.set("location", models.value.location?.id);
    ls.set("locationLabel", models.value.location?.label);
  }
  ls.set("gender", models.value.gender);

  window.location.reload();
  // dialogRef.value.hide();
  // console.log(models.value.location);
  // console.log(locationId);
};

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();
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
