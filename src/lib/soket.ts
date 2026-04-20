import { io } from "socket.io-client";

export const socket = io("https://marketbosterfr.onrender.com", {
  autoConnect: false,
  transports: ["websocket"],
});