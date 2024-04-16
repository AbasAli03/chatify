import React from "react";
import "./searchItems.css";
import { useChatContext } from "../../../context/ChatContext";

const SearchItems = ({ data }) => {
  const { activeChat, setActiveChat } = useChatContext();

  const handleClick = (id, username) => {
    setActiveChat({
      chatId: id,
      participantId: "",
      participantName: username,
    });
  };

  return (
    <div>
      {data &&
        data.map((item) => {
          return (
            <li
              key={item.id}
              className="searchItem"
              onClick={() => handleClick(item._id, item.username)}
            >
              <h1>{item.username}</h1>
              <p>{item.fullname}</p>
              <p>Member since: {item.createdAt}</p>
            </li>
          );
        })}
    </div>
  );
};

export default SearchItems;
