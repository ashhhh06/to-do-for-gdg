import React from "react";

export default function Header({ dark }) {
  return (
    <header className={`${dark ? "dark" : ""}`} style={{ marginBottom: "24px" }}>
      <h1>To-Do App</h1>
      <p className={`text-sm ${dark ? "dark" : ""}`}>plans · tasks · due dates</p>
    </header>
  );
}
