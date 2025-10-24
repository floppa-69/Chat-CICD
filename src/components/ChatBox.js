import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { subscribe } from "../local/chatStore";
const ChatBox = () => {
    window.scrollTo(0, document.body.scrollHeight);
    const scroll = useRef();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const unsub = subscribe((msgs) => {
            setMessages(msgs);
            if (scroll.current) scroll.current.scrollIntoView({ behavior: "smooth" });
        });
        return () => {
            if (typeof unsub === 'function') unsub();
        };
    }, []);
    return (
    <main className="chat-box">
        <span ref={scroll}></span>
        <div className="messages-wrapper">
        {messages?.map((message) => (
            <Message key={message.id} message={message} />
        ))}
        </div>
        <SendMessage scroll={scroll} />
    </main>
    );   
};

export default ChatBox;