import express from "express";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

// sending messages
router.get("/:username", protectRoute, async (req, res) => {
  const username = req.params.username;
  const requestingUser = req.user;
  try {
    const users = await User.find({
      username: { $regex: username, $options: "i" },
    }).select("-password -updatedAt -__v");

    res.status(200).json(users);
  } catch (error) {}
});

export default router;
