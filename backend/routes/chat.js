import express from "express";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, async (req,res) => {
    const requestingUser = req.user._id; 

    const chats = await Chat.find({
        participants: {
        $elemMatch: {
            $eq: requestingUser
        }
    }
    });
    if(!chats) res.status(404).json({error: "no chats exists"});
    
    const formattedChats = await Promise.all(chats.map(async (chat) => {
    
        const lastMessageId = chat.messages[chat.messages.length - 1];

   
        const lastMessage = await Message.findById(lastMessageId);
   
        const senderOfLastMessage = await User.findById(lastMessage.sender);
        const recieverOfLastMessage =  await User.findById(lastMessage.reciever);
        return {
            receiver: recieverOfLastMessage.username,
            lastMessage: {
                content: lastMessage.content,
                time: new Date(lastMessage.createdAt).toLocaleString(),
                sentBy: senderOfLastMessage.username,
            },
        };
    }));


    res.status(201).json(formattedChats);
});




export default router;