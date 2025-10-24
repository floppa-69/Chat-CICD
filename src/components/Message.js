import React from "react";
import { useUser } from "../context/UserContext";
const Message = ({ message }) => {
    const { user } = useUser();
    window.scrollTo(0, document.body.scrollHeight);
    return (
    <div
        className={`chat-bubble ${user && message.uid === user.uid ? "right" : ""}`}>
        <img className="chat-bubble__left" src={message.avatar} alt=""/>
        <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
        </div>
    </div>
    );
};
export default Message;