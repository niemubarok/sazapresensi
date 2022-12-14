<template>
  <q-select v-model="props.model" :options="options" label="Standard" filled />

  <div>
    {{ props.model }}
  </div>
</template>

<script setup>
const props = defineProps({
  model: String,
});

const options = [
  "Daily",
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
];
</script>
