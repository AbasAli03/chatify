import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(5000,() =>{
    connectToMongoDB();
    console.log("server is runnning  ON ", PORT)
} );