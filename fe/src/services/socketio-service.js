import io from "socket.io-client";
import { ref } from "vue";
import axios from "axios";

const url = process.env.API;
const token = process.env.token;

export const socket = io(url, {
  auth: {
    token,
  },
});

// export const getQR = () => {
//   const qr = ref("");
//   socket.on("message", (msg) => {
//     console.log(msg);
//   });
//   socket.on("qr", (src) => {
//     qr.value = src;
//   });

//   return qr.value;
// };

// export const sendMessage = async (number, message) => {
//   await axios
//     .post(`${wa_gateway}/send-message`, {
//       number,
//       message,
//     })
//     .then((res) => {
//       console.log(res);
//     });
// };
