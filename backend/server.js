import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js"
import message from "./routes/message.js"
import chat from "./routes/chat.js"
import protectRoute from "./middleware/protectRoute.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", auth);
app.use("/api/messages", message);
app.use("/api/chats", chat);



app.listen(5000,() =>{
    connectToMongoDB();
    console.log("server is runnning  ON ", PORT)
} );