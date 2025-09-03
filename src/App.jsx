import React, { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import Sidebar from "./components/Sidebar";
import AllTasksView from "./components/AllTasksView";
import CalendarView from "./components/CalendarView";
import ChecklistView from "./components/ChecklistView";

const LS_TASKS = "todo.tasks.v1";
const LS_CHECKLIST = "todo.checklist.v1";
const LS_THEME = "theme";

export default function App() {
  // --- Main tasks ---
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_TASKS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // --- Checklist tasks ---
  const [checklistTasks, setChecklistTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_CHECKLIST);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem(LS_THEME);
    return saved === "dark";
  });

  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("created-desc");
  const [currentView, setCurrentView] = useState("all"); // all | calendar | checklist

  // --- Persist main tasks ---
  useEffect(() => {
    localStorage.setItem(LS_TASKS, JSON.stringify(tasks));
  }, [tasks]);

  // --- Persist checklist tasks ---
  useEffect(() => {
    localStorage.setItem(LS_CHECKLIST, JSON.stringify(checklistTasks));
  }, [checklistTasks]);

  // --- Persist theme ---
  useEffect(() => {
    if (dark) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    localStorage.setItem(LS_THEME, dark ? "dark" : "light");
  }, [dark]);

  // --- Main Task operations ---
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
    setTasks(s => [newTask, ...s]);
  };

  const editTask = (id, patch) => setTasks(s => s.map(t => t.id === id ? { ...t, ...patch } : t));
  const deleteTask = (id) => setTasks(s => s.filter(t => t.id !== id));
  const toggleComplete = (id) => setTasks(s =>
    s.map(t => {
      if (t.id !== id) return t;
      const now = Date.now();
      const completed = !t.completed;
      return { ...t, completed, completedAt: completed ? now : null, startedAt: !t.startedAt && !completed ? now : t.startedAt };
    })
  );

  const addSubtask = (id, text) => setTasks(s =>
    s.map(t => t.id === id ? { ...t, subtasks: [...(t.subtasks || []), { id: Date.now().toString(), text, done: false }] } : t)
  );

  const toggleSubtask = (taskId, subId) => setTasks(s =>
    s.map(t => t.id === taskId ? { ...t, subtasks: t.subtasks.map(st => st.id === subId ? { ...st, done: !st.done } : st) } : t)
  );

  const removeSubtask = (taskId, subId) => setTasks(s =>
    s.map(t => t.id === taskId ? { ...t, subtasks: t.subtasks.filter(st => st.id !== subId) } : t)
  );

  // --- Derived counts by due date ---
  const countsByDate = useMemo(() => {
    const map = {};
    tasks.forEach(t => {
      if (!t.due) return;
      map[t.due] = (map[t.due] || 0) + 1;
    });
    return map;
  }, [tasks]);

  // --- Filtered and sorted tasks ---
  const visibleTasks = tasks
    .filter(t => {
      if (filterStatus === "active") return !t.completed;
      if (filterStatus === "completed") return t.completed;
      return true;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case "created-desc": return b.createdAt - a.createdAt;
        case "created-asc": return a.createdAt - b.createdAt;
        case "due-asc":
          if(a.due && b.due) return a.due.localeCompare(b.due);
          if(a.due) return -1;
          if(b.due) return 1;
          return 0;
        case "priority":
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "alpha":
          return a.text.localeCompare(b.text);
        default: return 0;
      }
    });

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: dark ? "#111827" : "#f3f4f6",
      color: dark ? "#f9fafb" : "#111827",
      padding: "24px"
    }}>
      <div style={{
        maxWidth: "1024px",
        margin: "0 auto",
        backgroundColor: dark ? "#1f2937" : "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "24px"
      }}>
        <Header dark={dark} />
        <ThemeToggle dark={dark} setDark={setDark} />

        {/* --- Flex layout: Sidebar + Main content --- */}
        <div style={{ display: "flex", gap: "24px" }}>
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} dark={dark} />

          <div style={{ flex: 1 }}>
            {currentView === "all" && (
              <AllTasksView
                tasks={tasks}
                visibleTasks={visibleTasks}
                editTask={editTask}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                addSubtask={addSubtask}
                toggleSubtask={toggleSubtask}
                removeSubtask={removeSubtask}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                sortBy={sortBy}
                setSortBy={setSortBy}
                dark={dark}
                countsByDate={countsByDate}
              />
            )}

            {currentView === "calendar" && (
              <CalendarView
                tasks={tasks}
                countsByDate={countsByDate}
                dark={dark}
                editTask={editTask}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                addSubtask={addSubtask}
                toggleSubtask={toggleSubtask}
                removeSubtask={removeSubtask}
              />
            )}

            {currentView === "checklist" && (
              <ChecklistView
                dark={dark}
                checklistTasks={checklistTasks}
                setChecklistTasks={setChecklistTasks}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
