import express from "express";

const router = express.Router();

router.post("/signup", (req,res) => {
   console.log("siup route");
})

router.post("/login", (req,res) => {
   console.log("login route");
})

router.post("/logout", (req,res) => {
    console.log("logout route");

})

export default router;