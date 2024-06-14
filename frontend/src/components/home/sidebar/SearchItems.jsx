import React from "react";
import { useChatContext } from "../../../context/ChatContext";
import convertISOToRegular from "../../../utils/DateFormatter";
import { useNavigate } from "react-router-dom";

const SearchItems = ({ data }) => {
  const { activeChat, setActiveChat } = useChatContext();
  const navigate = useNavigate();

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
      navigate(`/${data.id}`);
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
              className="flex flex-col mb-4 rounded p-4 list-none w-full hover:cursor-pointer hover:bg-[#1e71f7]"
              onClick={async () => await handleClick(item._id, item.username)}
            >
              <h1>{item.username}</h1>
              <p>{item.fullname}</p>
              <p>Member since: {convertISOToRegular(item.createdAt)}</p>
            </li>
          );
        })}
    </>
  );
};
export default SearchItems;
