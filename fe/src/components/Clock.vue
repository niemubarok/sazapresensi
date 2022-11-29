<template>
  <div style="margin-top: -30px">
    <q-chip icon="schedule">
      <h6 class="text-weight-bolder text-red">
        {{ hours }}<span class="text-grey">:</span>{{ minutes
        }}<span class="text-grey">:</span>{{ seconds }}
      </h6>
    </q-chip>

    <!-- {{ dateTime() }} -->
  </div>
</template>

  <script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { compareTime, getTime, setTime } from "src/utilities/time-util.js";

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const date = ref("");

const setClock = () => {
  date.value = getTime().date;
  hours.value = getTime().hours;
  minutes.value = getTime().minutes;
  seconds.value = getTime().seconds;
};

setInterval(() => setClock(), 1000);

onBeforeUnmount(() => {
  clearInterval();
});
</script>
