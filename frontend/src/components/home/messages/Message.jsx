import React from "react";
import "./message.css";
import { useAuthContext } from "../../../context/AuthContext.jsx";

const Message = ({ sender, reciever, message, time }) => {
  const { authUser } = useAuthContext();
  return sender === authUser ? (
    <div className="message message-start">
      <div className="message-bubble">{message}</div>
    </div>
  ) : (
    <div className="message message-end">
      <div className="message-bubble"> {message}</div>
    </div>
  );
};

export default Message;
