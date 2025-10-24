import React, { useState } from "react";
import { useUser } from "../context/UserContext";

const UsernameLogin = () => {
  const { login, loading } = useUser();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const trimmed = name.trim();
    if (!trimmed) { setError("Please enter a username"); return; }
    setSubmitting(true);
    try {
      await login(trimmed);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="send-message" onSubmit={onSubmit} style={{ position: "static", paddingTop: 0, borderTop: 0 }}>
      <label htmlFor="usernameInput" hidden>Enter Username</label>
      <input
        id="usernameInput"
        type="text"
        placeholder="Choose a username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading || submitting}
      />
      <button type="submit" disabled={loading || submitting} className="sign-out primary">
        {submitting ? "Joining..." : "Join Chat"}
      </button>
      {error ? <div style={{ color: "#dc2626", marginLeft: 8, alignSelf: "center" }}>{error}</div> : null}
    </form>
  );
};

export default UsernameLogin;
