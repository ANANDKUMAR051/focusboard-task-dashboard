import {
  CalendarDays,
  Check,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { statuses } from "../data/initialTasks";

function shortDate(dateString) {
  if (!dateString) return "No date";
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "No date";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function TaskItem({ task, onEdit, onDelete, onStatus }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    function closeMenu(event) {
      if (
        event.key === "Escape" ||
        (event.type === "pointerdown" &&
          !menuRef.current?.contains(event.target))
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", closeMenu);
    document.addEventListener("pointerdown", closeMenu);

    return () => {
      document.removeEventListener("keydown", closeMenu);
      document.removeEventListener("pointerdown", closeMenu);
    };
  }, [menuOpen]);

  function cycleStatus() {
    const currentIndex = statuses.indexOf(task.status);
    onStatus(task.id, statuses[(currentIndex + 1) % statuses.length]);
  }

  return (
    <article className="task-row">
      <button
        type="button"
        className={`task-check ${task.status === "Completed" ? "done" : ""}`}
        onClick={cycleStatus}
        title="Change task status"
        aria-label={`Change status of ${task.title}. Current status: ${task.status}`}
      >
        {task.status === "Completed" ? <Check size={14} /> : <span />}
      </button>
      <div className="task-text">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="task-tags">
        <span className="category-tag">{task.category}</span>
        <span
          className={`priority-tag priority-${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>
        <span className="task-date">
          <CalendarDays size={14} />
          {shortDate(task.dueDate)}
        </span>
      </div>
      <div className="task-actions" ref={menuRef}>
        <button
          type="button"
          className="more-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={`Actions for ${task.title}`}
          aria-expanded={menuOpen}
        >
          <MoreHorizontal size={21} />
        </button>
        {menuOpen && (
          <div className="task-menu">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onEdit(task);
              }}
            >
              <Pencil size={15} /> Edit task
            </button>
            <label>
              <span>Change status</span>
              <select
                value={task.status}
                onChange={(event) => {
                  onStatus(task.id, event.target.value);
                  setMenuOpen(false);
                }}
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="delete-option"
              onClick={() => {
                setMenuOpen(false);
                onDelete(task);
              }}
            >
              <Trash2 size={15} /> Delete task
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
