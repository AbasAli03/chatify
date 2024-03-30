import React, { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";
import "./messageContainer.css";
import { useChatContext } from "../../../context/ChatContext.jsx";
import { useAuthContext } from "../../../context/AuthContext.jsx";

const MessageContainer = ({}) => {
  const [messages, setMessages] = useState([]);
  const { activeChat } = useChatContext();
  const { authUser } = useAuthContext();
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef();

  useEffect(() => {
    // Scroll to the bottom of the container after
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  });

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
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (activeChat !== null) {
        const response = await fetch(
          `/api/messages/send/${activeChat.participantId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
          }
        );

        const data = await response.json();
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
      console.error("Response:", response);
    }

    setMessage("");
  };
  return (
    <div className="messageContainer">
      <header className="messageContainer__header">
        <h1>{messages.length > 0 && activeChat.participantName}</h1>
      </header>
      <div className="messageContainer__messages" ref={messageContainerRef}>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Message
              key={index}
              sender={message.sender}
              receiver={message.reciever}
              message={message.message}
              time={message.time}
            />
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </div>
      <form onSubmit={(e) => handleSendMessage(e)}>
        <input
          type="text"
          name="message"
          placeholder="write a message..."
          className="messageContainer__input"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </form>
    </div>
  );
};

export default MessageContainer;
