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
          const response = await fetch(`/api/messages/${activeChat.chatId}`);
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
        console.error("Response:", response);
      }
    };

    fetchData();
  }, [activeChat]);
  // add the fetching to its own hook, so you can make a loading bar
  return activeChat ? (
    <div className="messageContainer">
      {messages && messages.length > 0 ? (
        <>
          <header className="messageContainer__header">
            {messages[0].sender !== authUser.username
              ? messages[0].sender
              : messages[0].reciever}
          </header>
          <div className="messageContainer__messages">
            {messages.map((message, index) => (
              <Message
                key={index}
                sender={message.sender}
                reciever={message.reciever}
                message={message.message}
                time={message.time}
              />
            ))}
          </div>
        </>
      ) : (
        <div>No messages in the active chat</div>
      )}
    </div>
  ) : (
    <div>No active chat</div>
  );
};

export default MessageContainer;