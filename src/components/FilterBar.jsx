import { Search } from "lucide-react";

export default function FilterBar({
  status,
  onStatus,
  priority,
  onPriority,
  search,
  onSearch,
  counts,
}) {
  const tabs = [
    { label: "All tasks", value: "All" },
    { label: "To do", value: "To Do" },
    { label: "In progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
  ];

  return (
    <div className="filter-bar">
      <div className="status-tabs" aria-label="Filter by status">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.value}
            className={status === tab.value ? "active" : ""}
            aria-pressed={status === tab.value}
            onClick={() => onStatus(tab.value)}
          >
            {tab.label}
            {tab.value === "All" ? ` ${counts.total}` : ""}
          </button>
        ))}
      </div>
      <label className="task-search">
        <Search size={17} />
        <span className="sr-only">Find a task by title</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Find a task..."
        />
      </label>
      <label className="priority-select">
        <span className="sr-only">Filter tasks by priority</span>
        <select
          value={priority}
          onChange={(event) => onPriority(event.target.value)}
        >
          <option value="All">Priority: All</option>
          <option value="High">Priority: High</option>
          <option value="Medium">Priority: Medium</option>
          <option value="Low">Priority: Low</option>
        </select>
      </label>
    </div>
  );
}
