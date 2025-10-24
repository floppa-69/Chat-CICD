import React from "react";
import UsernameLogin from "./UsernameLogin";
const Welcome = () => {
    return (
        <div className="center">
        <main className="welcome">
        <h2>Welcome to Web Chat</h2>
        <p>Sign in with Google to chat with with Us</p>
        <p>Join instantly with a username. No password needed.</p>
        <UsernameLogin />
        </main>
        </div>
    );
};

export default Welcome;