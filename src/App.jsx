import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

const LS_TASKS = "todo.tasks.v1";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_TASKS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_TASKS, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (payload) => {
    const newTask = {
      id: Date.now().toString(),
      text: payload.text,
      completed: false,
      priority: payload.priority || "medium",
      due: payload.due || null,
      subtasks: payload.subtasks || [],
      createdAt: Date.now(),
      startedAt: null,
      completedAt: null,
    };
    setTasks((s) => [newTask, ...s]);
  };

  const editTask = (id, patch) => {
    setTasks((s) => s.map(t => t.id === id ? { ...t, ...patch } : t));
  };

  const deleteTask = (id) => {
    setTasks((s) => s.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((s) =>
      s.map(t => {
        if (t.id !== id) return t;
        const now = Date.now();
        const completed = !t.completed;
        return {
          ...t,
          completed,
          completedAt: completed ? now : null,
          startedAt: !t.startedAt && !completed ? now : t.startedAt,
        };
      })
    );
  };

  const addSubtask = (id, text) => {
    setTasks(s => s.map(t => t.id === id ? { ...t, subtasks: [...(t.subtasks||[]), { id: Date.now().toString(), text, done: false }] } : t));
  };

  const toggleSubtask = (taskId, subId) => {
    setTasks(s => s.map(t => {
      if (t.id !== taskId) return t;
      return { ...t, subtasks: t.subtasks.map(st => st.id === subId ? { ...st, done: !st.done } : st) };
    }));
  };

  const removeSubtask = (taskId, subId) => {
    setTasks(s => s.map(t => t.id === taskId ? { ...t, subtasks: t.subtasks.filter(st => st.id !== subId) } : t));
  };

  // derived: counts by due date (for busyness color)
  const countsByDate = useMemo(() => {
    const map = {};
    tasks.forEach(t => {
      if (!t.due) return;
      map[t.due] = (map[t.due] || 0) + 1;
    });
    return map;
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <Header />
        <TaskForm addTask={addTask} />
        <FilterBar tasks={tasks} countsByDate={countsByDate}
                   onEdit={editTask} onDelete={deleteTask}
                   onToggle={toggleComplete} addSubtask={addSubtask}
                   toggleSubtask={toggleSubtask} removeSubtask={removeSubtask} />
        <div className="mt-4">
          <TaskList
            tasks={tasks}
            editTask={editTask}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            addSubtask={addSubtask}
            toggleSubtask={toggleSubtask}
            removeSubtask={removeSubtask}
            countsByDate={countsByDate}
          />
        </div>
      </div>
    </div>
  );
}
