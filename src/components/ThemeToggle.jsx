import React from "react";

export default function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(d => !d)}
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        backgroundColor: dark ? "#4b5563" : "#4f46e5",
        color: "#fff",
        marginBottom: "16px",
      }}
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
