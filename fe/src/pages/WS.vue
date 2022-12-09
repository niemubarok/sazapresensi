<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are currently not connected to any network.</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { socket } from 'src/services/socketio-service'


const data = ref('')
const confirm = ref(false)

onMounted(() => {
  socket.on("time", (payload) => {
    console.log(payload);
    confirm.value = true
    data.value = payload
  })
})






</script>
