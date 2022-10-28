import io from "socket.io-client";
import { ref } from "vue";
import axios from "axios";

const wa_gateway = process.env.WA_GATEWAY;

// const socket = io(wa_gateway);

export const sendMessage = async (number, message, sender) => {
  await axios
    .post(`${wa_gateway}/send-message`, {
      number,
      message,
      sender,
    })
    .then((res) => {
      console.log(res);
    });
};
