import React from "react";
import "./chat.css";
import { useChatContext } from "../../../context/ChatContext.jsx";

const Chat = ({ username, sentBy, lastMessage, timeSent, id }) => {
  const { setActiveChat } = useChatContext();

  const handleChatClick = () => {
    setActiveChat(id);
  };

  return (
    <div className="chat" onClick={handleChatClick}>
      <h4 className="chat__username">{username}</h4>
      <p className="chat__lastMessage">
        {sentBy === username ? "you: " : `${sentBy}:`} {lastMessage}
        <p className="chat__timeSent">{timeSent}</p>
      </p>
    </div>
  );
};

export default Chat;
