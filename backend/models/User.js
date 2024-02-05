import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname:  {
        type: String,
        required: true,
    },
    username:  {
        type: String,
        required: true,
        unique: true
    },

    password:  {
        type: String,
        required: true,
        minLength: 6
    },

    profilePic: {
        type: String,
        default: ""
    }

});

const User = mongoose.model('User', userSchema);

export default User;

