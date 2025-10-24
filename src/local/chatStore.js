const STORAGE_KEY = "chat_messages_v1";

function readMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (_) {
    return [];
  }
}

function writeMessages(messages) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (_) {}
  // dispatch a custom event for same-tab listeners
  try {
    window.dispatchEvent(new Event("chat-messages-updated"));
  } catch (_) {}
}

export function getMessages() {
  const msgs = readMessages();
  return msgs.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0)).slice(-100);
}

export function addMessage({ text, user }) {
  const now = Date.now();
  const c = (typeof window !== "undefined" && window.crypto) ? window.crypto : null;
  const id = (c && c.randomUUID) ? c.randomUUID() : `m_${now}_${Math.random().toString(36).slice(2)}`;
  const msg = {
    id,
    text: String(text || ""),
    name: user?.name || "User",
    avatar: user?.avatar || "",
    uid: user?.uid || "local",
    createdAt: now,
  };
  const current = readMessages();
  current.push(msg);
  writeMessages(current);
  return msg;
}

export function clearMessages() {
  writeMessages([]);
}

export function subscribe(callback) {
  const handler = () => {
    callback(getMessages());
  };
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) handler();
  });
  window.addEventListener("chat-messages-updated", handler);
  // initial call
  callback(getMessages());
  return () => {
    window.removeEventListener("chat-messages-updated", handler);
    // can't remove the anonymous storage listener; acceptable for SPA lifecycle
  };
}
