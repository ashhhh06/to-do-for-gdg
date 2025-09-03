import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, editTask, deleteTask, toggleComplete, addSubtask, toggleSubtask, removeSubtask, dark }) {
  if (!tasks.length) {
    return (
      <div style={{ padding: "24px", textAlign: "center", color: dark ? "#9ca3af" : "#6b7280" }}>
        No tasks yet — add one above.
      </div>
    );
  }

  return (
    <ul style={{ marginTop: "16px", listStyle: "none", paddingLeft: 0 }}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          addSubtask={addSubtask}
          toggleSubtask={toggleSubtask}
          removeSubtask={removeSubtask}
          dark={dark}
        />
      ))}
    </ul>
  );
}
