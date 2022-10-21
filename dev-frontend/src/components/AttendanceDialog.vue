<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="q-px-xl q-pt-xl glass"
      style="fit-content; height: fit-content"
    >
      <!-- <AttandeeCard
        :name="props.name"
        :in="props.in"
        :out="props.out"
        :status="props.status"
      /> -->

      <div class="text-center flex flex-center items-center">
        <SuccessCheckMark class="q-mt-md" style="margin-right: 90px" />
        <div class="q-mt-xl q-pt-xl">
          <p
            style="font-size: 20px; margin-bottom: -5px"
            class="text-weight-bold text-white"
          >
            {{ props.name }}
          </p>
          <q-separator dark />
          <p
            style="font-size: 40px"
            class="q-pa-md text-weight-bolder text-white"
          >
            Berhasil Absen
          </p>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import AttandeeCard from "./AttandeeCard.vue";
import { useDialogPluginComponent } from "quasar";
import SuccessCheckMark from "./SuccessCheckMark.vue";
const props = defineProps({
  name: String,
  in: Number,
  out: String,
  status: String,
});

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
  background-color: rgba(20, 220, 117, 0.378);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}
</style>
