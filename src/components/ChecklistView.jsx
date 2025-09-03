import React, { useState } from "react";

export default function ChecklistView({ dark, checklistTasks, setChecklistTasks }) {
  const [newTaskText, setNewTaskText] = useState("");

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      subtasks: [],
      open: false
    };
    setChecklistTasks([newTask, ...checklistTasks]);
    setNewTaskText("");
  };

  const toggleTaskOpen = (taskId) => {
    setChecklistTasks(checklistTasks.map(task =>
      task.id === taskId ? { ...task, open: !task.open } : task
    ));
  };

  const addSubtask = (taskId, subText) => {
    setChecklistTasks(checklistTasks.map(task => 
      task.id === taskId
        ? { ...task, subtasks: [...task.subtasks, { id: Date.now().toString(), text: subText, done: false }] }
        : task
    ));
  };

  const toggleSubtask = (taskId, subId) => {
    setChecklistTasks(checklistTasks.map(task =>
      task.id === taskId
        ? { ...task, subtasks: task.subtasks.map(st => st.id === subId ? { ...st, done: !st.done } : st) }
        : task
    ));
  };

  const removeSubtask = (taskId, subId) => {
    setChecklistTasks(checklistTasks.map(task =>
      task.id === taskId
        ? { ...task, subtasks: task.subtasks.filter(st => st.id !== subId) }
        : task
    ));
  };

  return (
    <div>
      <h2 style={{ marginBottom: "12px" }}>Checklist View</h2>

      {/* Add new task */}
      <div style={{ display: "flex", marginBottom: "16px" }}>
        <input
          type="text"
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          placeholder="Add new task..."
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
          onClick={addTask}
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
          Add Task
        </button>
      </div>

      {checklistTasks.length === 0 && <div>No checklist tasks yet.</div>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {checklistTasks.map(task => (
          <li
            key={task.id}
            style={{
              marginBottom: "16px",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: dark ? "#374151" : "#f9fafb",
              color: dark ? "#f9fafb" : "#111827",
              cursor: "pointer"
            }}
          >
            <div onClick={() => toggleTaskOpen(task.id)} style={{ fontWeight: "bold" }}>
              {task.text} {task.open ? "▾" : "▸"}
            </div>

            {task.open && (
              <div style={{ marginTop: "8px", paddingLeft: "12px" }}>
                <ul style={{ paddingLeft: 0 }}>
                  {task.subtasks.map(st => (
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
                <AddSubtaskInput taskId={task.id} addSubtask={addSubtask} dark={dark} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

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
