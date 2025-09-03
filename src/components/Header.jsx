import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold">To-Do App</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">plans · tasks · due dates</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">Shortcuts: <span className="kbd">n</span> new</div>
        <ThemeToggle />
      </div>
    </header>
  );
}
