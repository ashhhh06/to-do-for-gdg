import React, { useState } from "react";
import TaskItem from "./TaskItem";

export default function CalendarView({
  tasks,
  countsByDate,
  dark,
  editTask,
  deleteTask,
  toggleComplete,
  addSubtask,
  toggleSubtask,
  removeSubtask
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const tasksForDate = selectedDate
    ? tasks.filter(t => t.due === selectedDate)
    : [];

  const getDateColor = (count) => {
    if (count === 0) return dark ? "#60a5fa" : "#bfdbfe"; // light blue
    if (count < 5) return dark ? "#facc15" : "#fde68a"; // yellow
    return dark ? "#f87171" : "#fca5a5"; // red
  };

  return (
    <div>
      <h2 style={{ marginBottom: "12px" }}>Calendar View</h2>

      {/* --- Calendar grid (next 7 days) --- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", marginBottom: "16px" }}>
        {Array.from({ length: 7 }).map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() + i);
          const iso = d.toISOString().slice(0, 10);
          const count = countsByDate[iso] || 0;

          return (
            <div
              key={iso}
              onClick={() => setSelectedDate(iso)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: getDateColor(count)
              }}
            >
              <div style={{ fontSize: "12px" }}>{d.toLocaleDateString(undefined, { weekday: "short" })}</div>
              <div style={{ fontWeight: "bold" }}>{d.getDate()}</div>
              <div style={{ fontSize: "12px" }}>{count} tasks</div>
            </div>
          );
        })}
      </div>

      {/* --- Pop-out modal for selected date tasks --- */}
      {selectedDate && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
          onClick={() => setSelectedDate(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: dark ? "#1f2937" : "#ffffff",
              color: dark ? "#f9fafb" : "#111827",
              borderRadius: "12px",
              padding: "24px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80%",
              overflowY: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              position: "relative"
            }}
          >
            <button
              onClick={() => setSelectedDate(null)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: dark ? "#f9fafb" : "#111827"
              }}
            >
              ✕
            </button>

            <h3 style={{ marginBottom: "12px" }}>
              Tasks for {new Date(selectedDate).toLocaleDateString()}
            </h3>

            <div style={{ marginBottom: "12px", fontWeight: "bold" }}>
              {tasksForDate.length >= 5
                ? "MUST BE A BUSY DAY KEEP GOING"
                : tasksForDate.length === 0
                ? "YAY NO TASK GET SOME SLEEP"
                : ""}
            </div>

            {tasksForDate.length === 0 && (
              <div>No tasks for this date.</div>
            )}

            <ul style={{ listStyle: "none", padding: 0 }}>
              {tasksForDate.map(task => (
                <li key={task.id} style={{ marginBottom: "12px" }}>
                  <TaskItem
                    task={task}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    toggleComplete={toggleComplete}
                    addSubtask={addSubtask}
                    toggleSubtask={toggleSubtask}
                    removeSubtask={removeSubtask}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
