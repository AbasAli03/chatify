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

    let chat = await Chat.find({
      participants: {
        $in: [
          mongoose.Types.ObjectId(senderId),
          mongoose.Types.ObjectId(receiverId),
        ],
      },
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

    await Promise.all([chat.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", protectRoute, async (req, res) => {
  try {
    const chatId = req.params.id;
    const requestingUser = req.user._id;

    const chat = await Chat.findById(chatId).populate("messages");

    if (!chat) return res.status(404).json({ error: "Chat doesnt exist" });

    const formattedMessages = chat.messages.map((message) => {
      return {
        sender: message.sender,
        receiver: message.reciever,
        message: message.content,
        time: new Date(message.createdAt).toLocaleString(),
      };
    });

    console.log(formattedMessages);

    return res.status(200).json(formattedMessages);
  } catch (error) {
    console.log("error: ", error);
  }
});
export default router;
