import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { addMessage } from "../local/chatStore";
const SendMessage = () => {
    window.scrollTo(0, document.body.scrollHeight);
    const [message, setMessage] = useState("");
    const { user } = useUser();
    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
            alert("Enter valid message");
            return;
        }
        if (!user) {
            alert("Please choose a username to join the chat");
            return;
        }
        addMessage({ text: message, user });
        setMessage("");
        };
    return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
        <label htmlFor="messageInput" hidden>Enter Message</label>
        <input id="messageInput" name="messageInput" type="text" className="form-input__input" placeholder="type message..." value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
    </form>
    );
};
export default SendMessage;