import React, { useState } from "react";

export default function ChecklistView({
  tasks,
  editTask,
  toggleSubtask,
  addSubtask,
  removeSubtask,
  dark
}) {
  // Only tasks with subtasks or allow adding new subtasks
  const checklistTasks = tasks.filter(t => t.subtasks?.length || true);

  return (
    <div>
      <h2 style={{ marginBottom: "12px" }}>Checklist View</h2>
      {checklistTasks.length === 0 && <div>No tasks with subtasks yet.</div>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {checklistTasks.map(task => (
          <li
            key={task.id}
            style={{
              marginBottom: "16px",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: dark ? "#374151" : "#f9fafb",
              color: dark ? "#f9fafb" : "#111827"
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "8px" }}>{task.text}</div>

            {/* Subtasks list */}
            <ul style={{ paddingLeft: "16px" }}>
              {(task.subtasks || []).map(st => (
                <li key={st.id} style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
                  <input
                    type="checkbox"
                    checked={st.done}
                    onChange={() => toggleSubtask(task.id, st.id)}
                    style={{ marginRight: "8px" }}
                  />
                  <span style={{ flex: 1, textDecoration: st.done ? "line-through" : "none" }}>{st.text}</span>
                  <button
                    onClick={() => removeSubtask(task.id, st.id)}
                    style={{
                      marginLeft: "8px",
                      background: "red",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      padding: "2px 6px"
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Add new subtask */}
            <AddSubtaskInput taskId={task.id} addSubtask={addSubtask} dark={dark} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Sub-component to handle adding new subtasks
function AddSubtaskInput({ taskId, addSubtask, dark }) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    addSubtask(taskId, text.trim());
    setText("");
  };

  return (
    <div style={{ display: "flex", marginTop: "8px" }}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add subtask..."
        style={{
          flex: 1,
          padding: "6px 8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: dark ? "#1f2937" : "#fff",
          color: dark ? "#f9fafb" : "#111827"
        }}
      />
      <button
        onClick={submit}
        style={{
          marginLeft: "8px",
          padding: "6px 12px",
          borderRadius: "4px",
          backgroundColor: "#10b981",
          color: "#fff",
          border: "none",
          cursor: "pointer"
        }}
      >
        Add
      </button>
    </div>
  );
}
