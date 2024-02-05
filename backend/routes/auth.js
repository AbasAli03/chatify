import express from "express";
import User from "../models/User.js"

const router = express.Router();

router.post("/signup", async (req,res) => {
   const {fullname, username, password, confirmPassword} = req.body;

   if(password !== confirmPassword){
      return res.status(400).json({error: "Passwords dont match"});
   }
   const exists = await User.findOne({username})

   if(exists){
      return res.status(400).json({error: "Username already exists"});
   }

   // hash paswords with bcrypt

   const newUser =  User({
      fullname,
      username,
      password,
      profilePic: "",
   });

   await newUser.save();

   res.status(201).send(newUser);

   
   
})

router.post("/login", (req,res) => {
   console.log("login route");
})

router.post("/logout", (req,res) => {
    console.log("logout route");

})

export default router;