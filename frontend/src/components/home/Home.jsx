import React from "react";
import "./home.css";
import Chat from "./sidebar/Chat.jsx";
import SearchBar from "./sidebar/SearchBar.jsx";
import MessageContainer from "./messages/MessageContainer.jsx";
import {
  ChatContextProvider,
  useChatContext,
} from "../../context/ChatContext.jsx";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/authContext.jsx";

const Home = () => {
  const [chats, setChats] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chats");
        const data = await response.json();
        setChats(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="home__chats">
        <SearchBar />
        {chats.map((chat) => (
          <Chat
            key={chat.id}
            username={
              chat.receiver === authUser.username
                ? chat.lastMessage.sentBy
                : chat.receiver
            }
            sentBy={chat.lastMessage.sentBy}
            lastMessage={chat.lastMessage.content}
            timeSent={chat.lastMessage.time}
            id={chat.id}
          />
        ))}
      </div>
      <div className="home__activeChat">
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
