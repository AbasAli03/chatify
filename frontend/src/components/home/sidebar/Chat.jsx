import React, { useEffect, useState } from "react";
import { useChatContext } from "../../../context/ChatContext.jsx";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

import convertISOToRegular from "../../../utils/DateFormatter.js";
const Chat = ({
  username,
  sentBy,
  lastMessage,
  timeSent,
  id,
  participantId,
  participantName,
}) => {
  const { activeChat, setActiveChat } = useChatContext();
  const { onlineUsers } = useSocketContext();
  const [isOnline, setIsOnline] = useState();
  const { authUser } = useAuthContext();
  const location = useLocation();
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
      className={`min-h-[100px] p-2 rounded overflow-auto ${
        location.pathname.replace(/^\/+/g, "") === id
          ? "bg-[#1e71f7]"
          : "hover:bg-[#1e71f7] hover:cursor-pointer"
      }`}
      onClick={handleChatClick}
    >
      <h4
        className={`${
          isOnline
            ? "flex justify-between items-center"
            : "flex justify-between chat__username"
        }`}
      >
        {username}
        {isOnline && (
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        )}
      </h4>

      <div className="flex justify-between items-center overflow-hidden break-all w-full">
        <p>
          {sentBy === authUser.id ? "you: " : `${participantName}:`}{" "}
          {lastMessage}
        </p>

        <p>{convertISOToRegular(timeSent)}</p>
      </div>
    </div>
  );
};

export default Chat;
