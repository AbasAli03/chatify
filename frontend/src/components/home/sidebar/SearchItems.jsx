import React from "react";
import "./searchItems.css";
import { useChatContext } from "../../../context/ChatContext";

const SearchItems = ({ data }) => {
  const { activeChat, setActiveChat } = useChatContext();

  const handleClick = async (id, username) => {
    try {
      const response = await fetch(`/api/chats/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setActiveChat({
        chatId: data.id,
        participantId: id,
        participantName: username,
      });
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <>
      {data &&
        data.map((item, index) => {
          const key = item._id || index;
          return (
            <li
              key={key}
              tabIndex={index}
              className="searchItem"
              onClick={async () => await handleClick(item._id, item.username)}
            >
              <h1>{item.username}</h1>
              <p>{item.fullname}</p>
              <p>Member since: {item.createdAt}</p>
            </li>
          );
        })}
    </>
  );
};
export default SearchItems;
