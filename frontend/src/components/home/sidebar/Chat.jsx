import React, { useEffect, useState } from "react";
import { useChatContext } from "../../../context/ChatContext.jsx";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const handleChatClick = () => {
    setActiveChat({
      chatId: id,
      participantId: participantId,
      participantName: participantName,
    });
    navigate(`/${id}`);
  };
  useEffect(() => {
    setIsOnline(onlineUsers.includes(participantId));
  }, [onlineUsers]);

  return (
    <div
      className="min-h-[100px]  hover:bg-[#1e71f7] hover:cursor-pointer p-2 rounded overflow-auto"
      onClick={handleChatClick}
    >
      <h4
        className={`${isOnline ? "chat__username-online" : "chat__username"}`}
      >
        {username}
      </h4>
      <p className="flex justify-between overflow-hidden break-all w-fit">
        {sentBy === authUser.id ? "you: " : `${participantName}:`} {lastMessage}
        <span className="">{timeSent}</span>
      </p>
    </div>
  );
};

export default Chat;
