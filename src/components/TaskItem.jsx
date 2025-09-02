import React, { useState } from "react";

export default function TaskItem({ task, deleteTask, toggleComplete, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) editTask(task.id, newText);
    setIsEditing(!isEditing);
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span>{task.text}</span>
      )}
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}
