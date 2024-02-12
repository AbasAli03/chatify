import React, { useEffect, useState } from "react";
import Message from "./Message.jsx";
import "./messageContainer.css";
import { useChatContext } from "../../../context/ChatContext.jsx";
import { useAuthContext } from "../../../context/AuthContext.jsx";

const MessageContainer = ({}) => {
  const [messages, setMessages] = useState([]);
  const { activeChat } = useChatContext();
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeChat !== null) {
          const response = await fetch(`/api/messages/${activeChat}`);
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchData();
  }, [activeChat]);

  return (
    <div className="messageContainer">
      <header className="messageContainer__header">
        {messages[0].sender !== authUser.username
          ? authUser.username
          : messages[0].reciever}
      </header>
      <div className="messageContainer__messages">
        {messages &&
          messages.map((message, index) => (
            <Message
              key={index}
              sender={
                message.sender === authUser.username
                  ? authUser.username
                  : message.reciever
              }
              reciever={
                message.sender !== authUser.username
                  ? authUser.username
                  : message.reciever
              }
              message={message.message}
              time={message.time}
            />
          ))}
      </div>
    </div>
  );
};

export default MessageContainer;
