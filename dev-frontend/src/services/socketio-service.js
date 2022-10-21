import io from "socket.io-client";
import { ref } from "vue";
import axios from "axios";

const wa_gateway = process.env.WA_GATEWAY;

const socket = io(wa_gateway);

export const getQR = () => {
  const qr = ref("");
  socket.on("message", (msg) => {
    console.log(msg);
  });
  socket.on("qr", (src) => {
    qr.value = src;
  });

  return qr.value;
};

export const sendMessage = async (number, message) => {
  await axios
    .post(`${wa_gateway}/send-message`, {
      number,
      message,
    })
    .then((res) => {
      console.log(res);
    });
};
