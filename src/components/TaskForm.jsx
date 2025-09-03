import React, { useState, useRef, useEffect } from "react";

export default function TaskForm({ addTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [due, setDue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const handler = e => { if (e.key === "n") inputRef.current?.focus(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const submit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask({ text: text.trim(), priority, due });
    setText(""); setPriority("medium"); setDue("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2 mt-2">
      <input ref={inputRef} value={text} onChange={e => setText(e.target.value)} placeholder="Add task" />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="date" value={due} onChange={e => setDue(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
