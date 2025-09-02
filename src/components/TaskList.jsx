import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, deleteTask, toggleComplete, editTask }) {
  if (tasks.length === 0) return <p>No tasks yet!</p>;

  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}
