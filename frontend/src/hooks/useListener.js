import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import { useMessage } from "../context/MessageContext.jsx";

const useListener = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useMessage();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListener;
