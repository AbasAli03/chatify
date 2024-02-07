import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: []
    }],

},{ timestamps: true });


const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
