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
    }).populate("messages");

    if (chats.length === 0) {
      return res.status(404).json({ error: "No chats exist" });
    }

    const formattedChats = await Promise.all(
      chats.map(async (chat) => {
        const lastMessage = chat.messages[chat.messages.length - 1];
        const senderOfLastMessage = lastMessage.sender;
        const receiverOfLastMessage = lastMessage.reciever;
        const participantId =
          requestingUser == lastMessage.sender
            ? lastMessage.reciever
            : lastMessage.sender;
        const participant = await User.findById(participantId);
        const participantName = participant.username;
        return {
          id: chat._id,
          lastMessage: {
            content: lastMessage.content,
            time: lastMessage.createdAt,
            sentBy: senderOfLastMessage,
            receivedBy: receiverOfLastMessage,
          },
          participantId: participantId,
          participantName: participantName,
        };
      })
    );

    res.json(formattedChats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
