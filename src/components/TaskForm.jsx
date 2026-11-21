import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { priorities, statuses } from "../data/initialTasks";

const emptyTask = {
  title: "",
  description: "",
  category: "Work",
  status: "To Do",
  priority: "Medium",
  dueDate: "",
};

export default function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState(() =>
    task ? { ...task } : { ...emptyTask },
  );
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  function changeField(name, value) {
    setForm((previous) => ({ ...previous, [name]: value }));
    if (name === "title" && value.trim()) setError("");
  }

  function submit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter a task title.");
      titleRef.current?.focus();
      return;
    }

    onSave({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate,
    });
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        <div className="modal-top">
          <div>
            <h2 id="task-form-title">
              {task ? "Edit task" : "Create new task"}
            </h2>
            <p>
              {task
                ? "Update the details of your task."
                : "Add your task details to stay on top of your work."}
            </p>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close task form"
          >
            <X size={19} />
          </button>
        </div>
        <form onSubmit={submit} noValidate>
          <div className="form-fields">
            <label className="form-field">
              <span>Task title *</span>
              <input
                ref={titleRef}
                value={form.title}
                onChange={(event) => changeField("title", event.target.value)}
                placeholder="e.g. Update pricing page"
                maxLength={120}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "task-title-error" : undefined}
              />
              {error && (
                <small
                  className="field-error"
                  id="task-title-error"
                  role="alert"
                >
                  {error}
                </small>
              )}
            </label>
            <label className="form-field">
              <span>Description</span>
              <textarea
                rows="3"
                value={form.description}
                onChange={(event) =>
                  changeField("description", event.target.value)
                }
                placeholder="Add notes about this task..."
                maxLength={1000}
              />
            </label>
            <div className="form-two-columns">
              <label className="form-field">
                <span>Status</span>
                <select
                  value={form.status}
                  onChange={(event) =>
                    changeField("status", event.target.value)
                  }
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label className="form-field">
                <span>Priority</span>
                <select
                  value={form.priority}
                  onChange={(event) =>
                    changeField("priority", event.target.value)
                  }
                >
                  {priorities.map((priority) => (
                    <option key={priority}>{priority}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="form-field">
              <span>Due date</span>
              <input
                type="date"
                value={form.dueDate}
                onChange={(event) => changeField("dueDate", event.target.value)}
              />
            </label>
            <p className="required-note">* Required field</p>
          </div>
          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              {task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
