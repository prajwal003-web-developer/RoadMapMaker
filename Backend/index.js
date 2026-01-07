import express from "express";
import cors from "cors";

import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { clerkMiddleware } from "@clerk/express"; 
import ProjectRouter from "./View/Project.View.js";

import {app,server}  from './Services/Socket.js'
dotenv.config();

// ---------------------- MIDDLEWARE ----------------------

// Enable CORS
app.use(
  cors({
    origin: true, // allow all origins (use ENV.FRONTEND_URL in production)
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(clerkMiddleware()) 

// ---------------------- ROUTES ----------------------
app.use("/api/project", ProjectRouter); 

// ---------------------- MONGODB CONNECTION ----------------------

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err.message));




// ---------------------- START SERVER ----------------------
server.listen(5000, () => console.log("App running on port 5000"));
