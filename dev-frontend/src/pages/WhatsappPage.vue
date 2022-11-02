<template>
  <div class="q-my-md row">
    <q-card class="q-mx-sm col">
      <div>
        <q-chip icon="phone" label="Tambah Whatsapp" />
      </div>
      <q-card-section>
        <q-input v-model="clientId" type="text" label="Phone" />
        <q-input v-model="description" type="text" label="Description" />
        <q-btn
          class="q-mt-md"
          color="primary"
          icon="add"
          label="Tambah"
          @click="onClickAdd"
        />
      </q-card-section>
    </q-card>
    <q-card class="col q-mr-md">
      <q-card-section>
        <q-img
          v-if="qr"
          :src="qr"
          spinner-color="primary"
          spinner-size="82px"
        />
      </q-card-section>
    </q-card>
  </div>
  <div>
    <q-card class="q-mx-xl">
      <div>
        <q-chip icon="message" label="Send Message" />
      </div>
      <q-card-section>
        <q-input v-model="number" type="text" label="Label" />
        <q-input v-model="message" type="text" label="Label" />
        <q-btn
          color="primary"
          icon="send"
          label="kirim"
          @click="onClickSendMessage"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { sendMessage } from "app/src/services/whatsapp-service";
import ls from "localstorage-slim";

import io from "socket.io-client";

const qr = ref("");

const number = ref();
const clientId = ref();
const message = ref();
const description = ref();
const socket = io(process.env.WA_GATEWAY);

const onClickSendMessage = () => {
  sendMessage(number.value, message.value, localStorage.getItem("client"));
};

const onClickAdd = () => {
  socket.emit("create-session", {
    id: clientId.value,
    description: description.value,
  });

  ls.set("sender", clientId.value);
};

socket.on("init", (data) => {
  console.log(data);
});

socket.on("qr", (data) => {
  qr.value = data.src;
});
socket.on("ready", () => {
  qr.value = "";
});
// const connect = () => {
// socket.on("Create session", (msg) => {
//   console.log(msg);
// });
// socket.on("qr", (src) => {
//   qr.value = src;
// });
// };

onMounted(() => {
  // connect();
});
</script>
