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
        const participantId =
          requestingUser.toString() === chat.participants[0].toString()
            ? chat.participants[1].toString()
            : chat.participants[0].toString();

        const participant = await User.findById(participantId);
        const participantName = participant.username;
        if (chat.messages.length > 0) {
          const lastMessage = chat.messages[chat.messages.length - 1];
          const senderOfLastMessage = lastMessage.sender;
          const receiverOfLastMessage = lastMessage.reciever;

          return {
            id: chat._id,
            lastMessage: {
              content: lastMessage.content,
              time: lastMessage.createdAt,
              sentBy: senderOfLastMessage,
              receivedBy: receiverOfLastMessage,
            },
            participantId: participantId.toString(),
            participantName: participantName,
          };
        } else {
          return {
            id: chat._id,
            lastMessage: {
              content: "Send a message",
              time: "",
              sentBy: "",
              receivedBy: "",
            },
            participantId: participantId,
            participantName: participantName,
          };
        }
      })
    );

    res.json(formattedChats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
