import React from "react";
import { useAuthContext } from "../../../context/AuthContext.jsx";

const Message = ({ sender, reciever, message, time }) => {
  const { authUser } = useAuthContext();

  return sender !== authUser.id ? (
    <div className="m-2 p-2 border rounded flex bg-[#807b7b] items-start w-fit max-w-[60%]">
      <p className="text-white text-base break-all w-fit">{message}</p>
    </div>
  ) : (
    <div className=" flex m-2 p-2 border rounded items-end ml-auto bg-[#1e71f7]  max-w-[60%]">
      <p className="text-white text-base break-all w-fit"> {message}</p>
    </div>
  );
};

export default Message;
