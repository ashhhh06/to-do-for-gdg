import React, { useState } from "react";

function prioClass(priority) {
  if (priority === "high") return "badge-high";
  if (priority === "medium") return "badge-medium";
  return "badge-low";
}

export default function TaskItem({ task, editTask, deleteTask, toggleComplete, addSubtask, toggleSubtask, removeSubtask, dark }) {
  const [open, setOpen] = useState(false);
  const [editingText, setEditingText] = useState(task.text);
  const [subText, setSubText] = useState("");

  return (
    <li className={`task-item ${dark ? "dark" : ""}`}>
      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
        <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />

        <div style={{ flex: 1 }}>
          {/* Task Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <div>
              <div style={{ fontWeight: "500", textDecoration: task.completed ? "line-through" : "none" }}>
                {task.text}
              </div>
              <div className={`text-xs ${dark ? "dark" : ""}`}>
                {task.due ? `Due ${task.due}` : "No due date"}
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span className={prioClass(task.priority)}>{task.priority}</span>
              <button onClick={() => { if (open) editTask(task.id, { text: editingText }); else setOpen(true); }}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>

          {/* Editable Section */}
          {open && (
            <div style={{ marginTop: "8px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input value={editingText} onChange={e => setEditingText(e.target.value)} />
                <button onClick={() => editTask(task.id, { text: editingText })}>Save</button>
              </div>

              {/* Subtasks */}
              <div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <input
                    value={subText}
                    onChange={e => setSubText(e.target.value)}
                    placeholder="Add subtask"
                  />
                  <button onClick={() => { if (subText.trim()) { addSubtask(task.id, subText.trim()); setSubText(""); } }}>Add</button>
                </div>

                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {(task.subtasks || []).map(st => (
                    <li key={st.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <input type="checkbox" checked={st.done} onChange={() => toggleSubtask(task.id, st.id)} />
                        <span style={{ textDecoration: st.done ? "line-through" : "none" }}>{st.text}</span>
                      </div>
                      <button onClick={() => removeSubtask(task.id, st.id)}>Remove</button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timestamps */}
              <div className={`text-xs ${dark ? "dark" : ""}`} style={{ marginTop: "6px" }}>
                Created: {new Date(task.createdAt).toLocaleString()}<br />
                {task.startedAt && <>Started: {new Date(task.startedAt).toLocaleString()}<br /></>}
                {task.completedAt && <>Completed: {new Date(task.completedAt).toLocaleString()}</>}
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
