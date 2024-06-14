import React, { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";
import { useChatContext } from "../../../context/ChatContext.jsx";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import useListener from "../../../hooks/useListener.js";
import { useMessage } from "../../../context/MessageContext.jsx";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import IconButton from "@mui/material/IconButton";

const MessageContainer = ({ chatId }) => {
  const { messages, setMessages } = useMessage();
  const { activeChat } = useChatContext();
  const { authUser } = useAuthContext();
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef();
  useListener();
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
          const response = await fetch(`/api/messages/${chatId}`);
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
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
      console.error("Response:", response);
    }
    setMessage("");
  };
  return (
    <div className="h-full flex flex-col gap-4">
      <header className="text-3xl p-2 border-b">
        <h1>{messages.length > 0 && activeChat.participantName}</h1>
      </header>
      <div
        className="flex flex-col gap-2 grow flex-1 overflow-y-auto"
        ref={messageContainerRef}
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Message
              key={index}
              sender={message.sender}
              receiver={message.reciever}
              message={message.content}
              time={message.time}
            />
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </div>
      <form onSubmit={(e) => handleSendMessage(e)}>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            name="message"
            placeholder="write a message..."
            className="mt-auto w-full p-2 border rounded"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <IconButton type="submit">
            <SendRoundedIcon sx={{ color: "#1e71f7" }} />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default MessageContainer;
