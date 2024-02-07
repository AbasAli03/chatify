import express from "express";
import User from "../models/User.js"
import bcrypt from "bcryptjs";

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
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password,salt);

   const newUser =  User({
      fullname:fullname,
      username: username,
      password: hashedPassword,
      profilePic: "",
   });
   
   if(newUser){
      await newUser.save();

      res.status(201).send({
         id: newUser._id,
         name: fullname,
         username: username,
      });
   }
 

   
   
})

router.post("/login",async (req,res) => {
      try {
         const {username, password} = req.body;
   
         const exists = await User.findOne({username})
         const succes = await bcrypt.compare(password,exists.password);
   
         if(!exists || !succes){
            return res.status(400).json({error: "username/password doesnt match"});
         }
    
         res.status(201).json({
            id: exists._id,
            username: username,
         });
      } catch (error) {
         
      }
});

router.post("/logout", (req,res) => {
   res.status(200).json({message: "logged out success fully"})

})

export default router;