import React from "react";
import { useUser } from "../context/UserContext";
import { clearMessages } from "../local/chatStore";
const NavBar = () => {
    const { user, logout } = useUser();
    const onClear = () => {
        const ok = window.confirm("Delete the entire conversation for this browser? This cannot be undone.");
        if (ok) clearMessages();
    };
    return (
        <nav className="nav-bar">
            <h1>Web Chat</h1>
            {user ? (
                <div>
                    <button onClick={onClear} className="danger" type="button">Clear Chat</button>
                    <button onClick={logout} className="sign-out" type="button" style={{ marginLeft: 8 }}>Sign Out</button>
                </div>
            ) : null}
        </nav>
    );
};
export default NavBar;