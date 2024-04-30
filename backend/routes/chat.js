import express from "express";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import protectRoute from "../middleware/protectRoute.js";
import mongoose from "mongoose";

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

router.get("/:id", protectRoute, async (req, res) => {
  try {
    const requestingUser = req.user._id;
    const id = req.params.id;

    const chat = await Chat.find({
      participants: { $all: [id.toString(), requestingUser.toString()] },
    }).populate("messages");

    if (chat[0]) {
      const participantId =
        requestingUser.toString() === chat[0].participants[0].toString()
          ? chat[0].participants[1].toString()
          : chat[0].participants[0].toString();

      const participant = await User.findById(participantId);
      const participantName = participant.username;

      const lastMessage =
        chat[0].messages.length > 0
          ? chat[0].messages[chat[0].messages.length - 1]
          : {
              content: "Send a message",
              createdAt: "",
              sender: "",
              reciever: "",
            };

      const response = {
        id: chat[0]._id,
        lastMessage: {
          content: lastMessage.content,
          time: lastMessage.createdAt,
          sentBy: lastMessage.sender,
          receivedBy: lastMessage.reciever,
        },
        participantId: participantId.toString(),
        participantName: participantName,
      };

      res.status(200).json(response);
    } else {
      const newChat = await Chat.create({ participants: [requestingUser, id] });
      res.status(201).json(newChat);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
