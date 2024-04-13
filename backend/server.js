import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import message from "./routes/message.js";
import chat from "./routes/chat.js";
import user from "./routes/user.js";
import cors from "cors";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", auth);
app.use("/api/messages", message);
app.use("/api/chats", chat);
app.use("/api/users", user);

export const getSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

io.on("connection", (socket) => {
  // get the user from the handshake
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
  }
  console.log(users);

  // emit the online users to all users
  io.emit("onlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    delete users[userId];
    io.emit("onlineUsers", Object.keys(users));
  });
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log("server is runnning  ON ", PORT);
});
