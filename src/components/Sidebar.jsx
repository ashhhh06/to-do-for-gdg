import React from "react";

export default function Sidebar({ currentView, setCurrentView, dark }) {
  const buttonStyle = {
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "8px",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    border: "none",
    fontWeight: "bold",
  };

  const getBgColor = (view) => {
    if (currentView === view) return dark ? "#374151" : "#e5e7eb";
    return "transparent";
  };

  return (
    <div style={{
      width: "220px",
      padding: "16px",
      backgroundColor: dark ? "#1f2937" : "#ffffff",
      color: dark ? "#f9fafb" : "#111827",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column"
    }}>
      <button
        style={{ ...buttonStyle, backgroundColor: getBgColor("all") }}
        onClick={() => setCurrentView("all")}
      >
        All Tasks
      </button>

      <button
        style={{ ...buttonStyle, backgroundColor: getBgColor("calendar") }}
        onClick={() => setCurrentView("calendar")}
      >
        Calendar View
      </button>

      <button
        style={{ ...buttonStyle, backgroundColor: getBgColor("checklist") }}
        onClick={() => setCurrentView("checklist")}
      >
        Checklist View
      </button>
    </div>
  );
}
