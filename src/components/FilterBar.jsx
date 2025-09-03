import React, { useState } from "react";

export default function FilterBar({ tasks, filterStatus, setFilterStatus, sortBy, setSortBy, dark }) {
  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "16px" }}>
      
      {/* Filter Dropdown */}
      <div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            backgroundColor: dark ? "#374151" : "#e5e7eb",
            color: dark ? "#f9fafb" : "#111827",
            border: "none",
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Sort Dropdown */}
      <div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            backgroundColor: dark ? "#374151" : "#e5e7eb",
            color: dark ? "#f9fafb" : "#111827",
            border: "none",
          }}
        >
          <option value="created-desc">Newest</option>
          <option value="created-asc">Oldest</option>
          <option value="due-asc">Due Soon</option>
          <option value="priority">Priority</option>
          <option value="alpha">A → Z</option>
        </select>
      </div>

      {/* Task summary */}
      <div style={{ marginLeft: "auto", fontSize: "0.875rem", color: dark ? "#9ca3af" : "#6b7280" }}>
        {tasks.filter(t => !t.completed).length} active · {tasks.filter(t => t.completed).length} done · {tasks.length} total
      </div>
    </div>
  );
}
