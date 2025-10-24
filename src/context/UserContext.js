import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext(null);

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/);
  const first = (parts[0] || "").charAt(0).toUpperCase();
  const second = (parts[1] || "").charAt(0).toUpperCase();
  return (first + second) || "U";
}

function makeAvatarDataUrl(name) {
  const text = initials(name);
  const svg = `<?xml version='1.0' encoding='UTF-8'?>
  <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>
    <rect width='100%' height='100%' rx='8' ry='8' fill='#e2e8f0'/>
    <text x='50%' y='50%' dominant-baseline='central' text-anchor='middle' font-family='Segoe UI, Roboto, Helvetica, Arial' font-size='28' fill='#0f172a'>${text}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem("chatUserName");
    const storedUid = localStorage.getItem("chatUserUid");
    if (storedName && storedUid) {
      const avatar = localStorage.getItem("chatUserAvatar") || makeAvatarDataUrl(storedName);
      setUser({ uid: storedUid, name: storedName, avatar });
    }
    setLoading(false);
  }, []);

  const login = async (name) => {
    const trimmed = (name || "").trim();
    if (!trimmed) throw new Error("Username is required");
    const c = (typeof window !== "undefined" && window.crypto) ? window.crypto : null;
    const uid = (c && c.randomUUID) ? c.randomUUID() : `u_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const avatar = makeAvatarDataUrl(trimmed);
    localStorage.setItem("chatUserName", trimmed);
    localStorage.setItem("chatUserUid", uid);
    localStorage.setItem("chatUserAvatar", avatar);
    setUser({ uid, name: trimmed, avatar });
  };

  const logout = async () => {
    localStorage.removeItem("chatUserName");
    localStorage.removeItem("chatUserUid");
    localStorage.removeItem("chatUserAvatar");
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
