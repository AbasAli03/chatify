import React, { useEffect, useState } from "react";
import Message from "./Message.jsx";
import "./messageContainer.css";
import { useChatContext } from "../../../context/ChatContext.jsx";

const MessageContainer = ({}) => {
  const [messages, setMessages] = useState();
  const { activeChat } = useChatContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeChat !== null) {
          const response = await fetch(`/api/messages/${activeChat}`);
          const data = await response.json();
          setMessages(data);
          console.log(activeChat);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchData();
  }, [activeChat]);

  return (
    <div className="messageContainer">
      <header className="messageContainer__header">Jane</header>
      <div className="messageContainer__messages">
        <Message />
      </div>
    </div>
  );
};

export default MessageContainer;
