import React from "react";
import Chat from "../components/home/sidebar/Chat.jsx";
import SearchBar from "../components/home/sidebar/SearchBar.jsx";
import MessageContainer from "../components/home/messages/MessageContainer.jsx";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import useLogout from "../hooks/useLogout.js";
import { MessageProvider } from "../context/MessageContext.jsx";
import { useParams } from "react-router-dom";

const Home = () => {
  const [chats, setChats] = useState([]);
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();
  const { chatId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chats");
        const data = await response.json();

        if (data.error) {
          setChats([]);
        } else {
          setChats(data);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex md:flex-row h-screen w-full flex-col wrap p-4 gap-4">
      <div
        className={`
        ${chatId ? "hidden md:flex" : "flex md:hidden"} 
        h-full flex-col md:flex-[1_1_30%] gap-4
      `}
      >
        <div>
          <SearchBar />
        </div>
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto wrap">
          {chats.length === 0
            ? "no chats"
            : chats.map((chat) => (
                <Chat
                  key={chat.id}
                  username={chat.participantName}
                  sentBy={chat.lastMessage.sentBy}
                  lastMessage={chat.lastMessage.content}
                  timeSent={chat.lastMessage.time}
                  id={chat.id}
                  participantId={chat.participantId}
                  participantName={chat.participantName}
                />
              ))}
        </div>

        <div className="mt-auto flex flex-col justify-center items-center">
          <button
            className="p-2 bg-[#1e71f7] rounded text-white w-full "
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <div
        className={`
        ${chatId ? "block md:block" : "hidden md:block"} 
        h-full flex-col md:flex-[1_1_70%] gap-4
      `}
      >
        <MessageProvider>
          <MessageContainer />
        </MessageProvider>
      </div>
    </div>
  );
};

export default Home;
