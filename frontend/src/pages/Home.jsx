import React from "react";
import Chat from "../components/home/sidebar/Chat.jsx";
import SearchBar from "../components/home/sidebar/SearchBar.jsx";
import MessageContainer from "../components/home/messages/MessageContainer.jsx";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import useLogout from "../hooks/useLogout.js";
import { MessageProvider } from "../context/MessageContext.jsx";

const Home = () => {
  const [chats, setChats] = useState([]);
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

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
    <div className="h-screen w-full flex wrap p-4 gap-4">
      <div className="h-full flex flex-col flex-[1_1_30%] gap-4">
        <div>
          <SearchBar />
        </div>
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
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

        <div className="mt-auto">
          <button className="p-2 bg-[#1e71f7] rounded" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="flex-[1_1_70%] ">
        <MessageProvider>
          <MessageContainer />
        </MessageProvider>
      </div>
    </div>
  );
};

export default Home;
