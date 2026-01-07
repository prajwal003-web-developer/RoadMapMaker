// Socket.js
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_URL

export const createSocket = (handshakeId) =>
  io(URL, {
    transports: ["websocket"],
    auth: { handshakeId }, // Clerk userId
  });
