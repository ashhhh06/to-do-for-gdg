import React from "react";
import TaskForm from "./TaskForm";
import FilterBar from "./FilterBar";
import TaskList from "./TaskList";

export default function AllTasksView({
  tasks,
  visibleTasks,
  editTask,
  deleteTask,
  toggleComplete,
  addSubtask,
  toggleSubtask,
  removeSubtask,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  dark,
  countsByDate
}) {
  return (
    <div>
      <TaskForm addTask={addTask => addTask(addTask)} />
      <FilterBar
        tasks={tasks}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        dark={dark}
      />
      <TaskList
        tasks={visibleTasks}
        editTask={editTask}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        addSubtask={addSubtask}
        toggleSubtask={toggleSubtask}
        removeSubtask={removeSubtask}
        countsByDate={countsByDate}
        dark={dark}
      />
    </div>
  );
}
