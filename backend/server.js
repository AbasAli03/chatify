import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js"
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", auth);

app.listen(5000,() =>{
    connectToMongoDB();
    console.log("server is runnning  ON ", PORT)
} );