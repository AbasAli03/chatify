import express from "express";
import Message from "../models/Message.js";
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
            participants: { $all: [senderId, receiverId] },
        });

        if (!chat) {
            chat = new Chat({ participants: [senderId, receiverId] }); 
        }

        const newMessage = new Message({
            sender: senderId,
            reciever: receiverId,
            content: message
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

export default router;
