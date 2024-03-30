import React, { useEffect, useState } from "react";
import "./chat.css";
import { useChatContext } from "../../../context/ChatContext.jsx";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import { useAuthContext } from "../../../context/AuthContext.jsx";

const Chat = ({
  username,
  sentBy,
  lastMessage,
  timeSent,
  id,
  participantId,
  participantName,
}) => {
  const { setActiveChat } = useChatContext();
  const { onlineUsers } = useSocketContext();
  const [isOnline, setIsOnline] = useState();
  const { authUser } = useAuthContext();

  const handleChatClick = () => {
    setActiveChat({
      chatId: id,
      participantId: participantId,
      participantName: participantName,
    });
  };
  useEffect(() => {
    setIsOnline(onlineUsers.includes(participantId));
  }, [onlineUsers]);

  return (
    <div className="chat" onClick={handleChatClick}>
      <h4
        className={`${isOnline ? "chat__username-online" : "chat__username"}`}
      >
        {username}
      </h4>
      <p className="chat__lastMessage">
        {sentBy === authUser.id ? "you: " : `${participantName}:`} {lastMessage}
        <span className="chat__timeSent">{timeSent}</span>
      </p>
    </div>
  );
};

export default Chat;
