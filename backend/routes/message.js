import express from "express";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

// sending messages
router.post("/send/:id", protectRoute, async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let chat = await Chat.findOne({
      $or: [
        { participants: { $all: [senderId, receiverId] } },
        { participants: { $all: [receiverId, senderId] } },
      ],
    });

    if (!chat) {
      chat = new Chat({ participants: [senderId, receiverId] });
    }

    const newMessage = new Message({
      sender: senderId,
      reciever: receiverId,
      content: message,
    });

    if (newMessage) {
      chat.messages.push(newMessage._id);
    }

    await newMessage.save();
    await chat.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", protectRoute, async (req, res) => {
  try {
    const chatId = req.params.id;
    const senderId = req.user._id;

    const chat = await Chat.findById(chatId);

    if (!chat) return res.status(404).json({ error: "Chat doesnt exist" });

    const messagePromises = chat.messages.map((id) => Message.findById(id));
    const messages = await Promise.all(messagePromises);

    // get the recieving party
    const reciever = await User.findById(
      chat.participants[0] === senderId
        ? chat.participants[0]
        : chat.participants[1]
    );

    // format the messages
    const formattedMessages = messages.map((message) => ({
      sender: req.user.username,
      reciever: reciever.username,
      message: message.content,
      time: new Date(message.createdAt).toLocaleString(),
    }));
    console.log(formattedMessages);
    return res.status(200).json(formattedMessages);
  } catch (error) {
    console.log("error: ", error);
  }
});

export default router;
