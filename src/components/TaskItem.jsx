import React, { useState } from "react";

function prioClass(priority, dark) {
  switch (priority) {
    case "high":
      return { backgroundColor: dark ? "#b91c1c" : "#fee2e2", color: dark ? "#fee2e2" : "#b91c1c" };
    case "medium":
      return { backgroundColor: dark ? "#78350f" : "#fef3c7", color: dark ? "#fef3c7" : "#78350f" };
    default:
      return { backgroundColor: dark ? "#166534" : "#d1fae5", color: dark ? "#d1fae5" : "#166534" };
  }
}

export default function TaskItem({
  task,
  editTask,
  deleteTask,
  toggleComplete,
  addSubtask,
  toggleSubtask,
  removeSubtask,
  dark
}) {
  const [open, setOpen] = useState(false);
  const [editingText, setEditingText] = useState(task.text);
  const [subText, setSubText] = useState("");

  return (
    <li
      style={{
        listStyle: "none",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: dark ? "#1f2937" : "#ffffff",
        color: dark ? "#f9fafb" : "#111827",
        border: `1px solid ${dark ? "#374151" : "#e5e7eb"}`,
        boxShadow: dark ? "0 1px 3px rgba(0,0,0,0.4)" : "0 1px 3px rgba(0,0,0,0.1)"
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          style={{ marginTop: 4 }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={() => setOpen(!open)}
                style={{ background: "transparent", border: "none", color: dark ? "#9ca3af" : "#6b7280", cursor: "pointer" }}
              >
                {open ? "▾" : "▸"}
              </button>
              <div>
                <div
                  style={{
                    fontWeight: 500,
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? (dark ? "#9ca3af" : "#6b7280") : undefined
                  }}
                >
                  {task.text}
                </div>
                <div style={{ fontSize: 12, color: dark ? "#9ca3af" : "#6b7280" }}>
                  {task.due ? `Due ${task.due}` : "No due date"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ ...prioClass(task.priority, dark), padding: "2px 6px", borderRadius: 9999, fontSize: 12 }}>
                {task.priority}
              </span>
              <button
                onClick={() => {
                  if (open) editTask(task.id, { text: editingText });
                  else setOpen(true);
                }}
                style={{ padding: "4px 8px", backgroundColor: "#facc15", color: "#fff", borderRadius: 4, border: "none", cursor: "pointer" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                style={{ padding: "4px 8px", backgroundColor: "#ef4444", color: "#fff", borderRadius: 4, border: "none", cursor: "pointer" }}
              >
                Delete
              </button>
            </div>
          </div>

          {open && (
            <div style={{ marginTop: 12, borderTop: `1px solid ${dark ? "#374151" : "#e5e7eb"}`, paddingTop: 12 }}>
              {/* Edit task input */}
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={editingText}
                  onChange={e => setEditingText(e.target.value)}
                  style={{
                    flex: 1,
                    padding: 6,
                    borderRadius: 4,
                    border: `1px solid ${dark ? "#374151" : "#d1d5db"}`,
                    backgroundColor: dark ? "#374151" : "#fff",
                    color: dark ? "#f9fafb" : "#111827"
                  }}
                />
                <button
                  onClick={() => editTask(task.id, { text: editingText })}
                  style={{ padding: "6px 12px", borderRadius: 4, backgroundColor: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}
                >
                  Save
                </button>
              </div>

              {/* Subtasks */}
              <div style={{ marginTop: 12 }}>
                <h4 style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Subtasks</h4>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input
                    value={subText}
                    onChange={e => setSubText(e.target.value)}
                    placeholder="Add subtask"
                    style={{
                      flex: 1,
                      padding: 6,
                      borderRadius: 4,
                      border: `1px solid ${dark ? "#374151" : "#d1d5db"}`,
                      backgroundColor: dark ? "#374151" : "#fff",
                      color: dark ? "#f9fafb" : "#111827"
                    }}
                  />
                  <button
                    onClick={() => {
                      if (subText.trim()) {
                        addSubtask(task.id, subText.trim());
                        setSubText("");
                      }
                    }}
                    style={{ padding: "6px 12px", borderRadius: 4, backgroundColor: "#10b981", color: "#fff", border: "none", cursor: "pointer" }}
                  >
                    Add
                  </button>
                </div>

                <ul style={{ listStyle: "none", padding: 0 }}>
                  {(task.subtasks || []).map(st => (
                    <li key={st.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <input type="checkbox" checked={st.done} onChange={() => toggleSubtask(task.id, st.id)} />
                        <span style={{ textDecoration: st.done ? "line-through" : "none" }}>{st.text}</span>
                      </div>
                      <button
                        onClick={() => removeSubtask(task.id, st.id)}
                        style={{ fontSize: 12, color: "#ef4444", background: "transparent", border: "none", cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 12, fontSize: 12, color: dark ? "#9ca3af" : "#6b7280" }}>
                  Created: {new Date(task.createdAt).toLocaleString()}<br />
                  {task.startedAt && <>Started: {new Date(task.startedAt).toLocaleString()}<br /></>}
                  {task.completedAt && <>Completed: {new Date(task.completedAt).toLocaleString()}</>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
