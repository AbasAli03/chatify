import React from "react";
import { useAuthContext } from "../../../context/AuthContext.jsx";

const Message = ({ sender, reciever, message, time }) => {
  const { authUser } = useAuthContext();

  return sender !== authUser.id ? (
    <div className="m-2 p-2 max-w-44 border rounded flex bg-[#807b7b] items-start grow overflow-hidden ">
      <p className="text-white text-base break-all">{message}</p>
    </div>
  ) : (
    <div className=" flex m-2 p-2 border rounded items-end ml-auto bg-[#1e71f7]">
      <p className="text-white text-base"> {message}</p>
    </div>
  );
};

export default Message;
