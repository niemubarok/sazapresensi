<template>
  <div style="width: 200px; height: 200px">
    <q-img :src="qr" spinner-color="primary" spinner-size="82px" />
  </div>

  <div>
    <q-input v-model="number" type="text" label="Label" />
    <q-input v-model="message" type="text" label="Label" />
    <q-btn
      color="primary"
      icon="send"
      label="kirim"
      @click="onClickSendMessage"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { getQR, sendMessage } from "app/src/services/socketio-service";

import io from "socket.io-client";

const qr = ref("");

const number = ref();
const message = ref();

const onClickSendMessage = () => {
  sendMessage(number.value, message.value);
};

const socket = io(process.env.WA_GATEWAY);
const connect = () => {
  socket.on("message", (msg) => {
    console.log(msg);
  });
  socket.on("qr", (src) => {
    qr.value = src;
  });
};

onMounted(() => {
  connect();
});
</script>
