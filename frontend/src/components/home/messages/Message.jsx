import React from "react";
import "./message.css";

const Message = () => {
  return (
    <>
      <div className="message message-start">
        <div className="message-bubble">
          It's over Anakin, <br />I have the high ground.
        </div>
      </div>
      <div className="message message-end">
        <div className="message-bubble">You underestimate my power!</div>
      </div>
    </>
  );
};

export default Message;
