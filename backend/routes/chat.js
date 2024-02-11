import express from "express";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, async (req, res) => {
  try {
    const requestingUser = req.user._id;

    const chats = await Chat.find({
      participants: requestingUser,
    });

    if (chats.length === 0) {
      return res.status(404).json({ error: "No chats exist" });
    }

    const formattedChats = await Promise.all(
      chats.map(async (chat) => {
        try {
          const lastMessageId = chat.messages[chat.messages.length - 1];

          const lastMessage = await Message.findById(lastMessageId);

          const senderOfLastMessage = await User.findById(lastMessage.sender);
          const recieverOfLastMessage = await User.findById(
            lastMessage.reciever
          );

          return {
            id: chat._id,
            receiver: recieverOfLastMessage.username,
            receiverId: lastMessage.reciever,
            lastMessage: {
              content: lastMessage.content,
              time: new Date(lastMessage.createdAt).toLocaleString(),
              sentBy: senderOfLastMessage.username,
            },
          };
        } catch (error) {
          console.error("Error fetching message details:", error);
          throw error;
        }
      })
    );

    res.status(201).json(formattedChats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
