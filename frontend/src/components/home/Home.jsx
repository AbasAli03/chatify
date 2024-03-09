import React from "react";
import "./home.css";
import Chat from "./sidebar/Chat.jsx";
import SearchBar from "./sidebar/SearchBar.jsx";
import MessageContainer from "./messages/MessageContainer.jsx";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import useLogout from "../../hooks/useLogout.js";

const Home = () => {
  const [chats, setChats] = useState([]);
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chats");
        const data = await response.json();
        setChats(data);
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
            participantId={chat.participantId}
          />
        ))}
        <button onClick={logout}>Logout</button>
      </div>
      <div className="home__activeChat">
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
