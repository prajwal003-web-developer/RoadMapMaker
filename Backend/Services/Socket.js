import express from 'express'
import http from "http";

import {Server} from "socket.io";
export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});
 export const getReceiverId = (receiverId)=>{
  return userSocketMap[receiverId]
}

const userSocketMap = {}

io.on("connection", (socket) => {
  console.log('connected',socket.id)
  const id = socket.handshake.query.id

  if(id!='undefined'){
    userSocketMap[id]= socket.id
  }


  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete userSocketMap[id]
   

  });
});

