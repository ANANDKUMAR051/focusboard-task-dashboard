import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTasks } from "../context/TaskContext";
import Sidebar, { navigation } from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import FocusNotes from "../components/FocusNotes";
import FilterBar from "../components/FilterBar";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Dashboard() {
  const { tasks, stats, addTask, editTask, deleteTask, updateStatus } =
    useTasks();
  const [section, setSection] = useState("Overview");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const closeForm = useCallback(() => setFormOpen(false), []);
  const closeDelete = useCallback(() => setDeleteTarget(null), []);

  function openCreate() {
    setEditingTask(null);
    setFormOpen(true);
  }

  function openEdit(task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  function saveTask(fields) {
    if (editingTask) {
      editTask(editingTask.id, fields);
    } else {
      addTask(fields);
    }
    setFormOpen(false);
  }

  function navigate(name) {
    setSection(name);
    if (name === "My tasks") {
      setShowAll(true);
      document.getElementById("tasks")?.scrollIntoView({ behavior: "smooth" });
    } else if (name === "Overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name === "Calendar") {
      setShowAll(true);
      document.getElementById("tasks")?.scrollIntoView({ behavior: "smooth" });
    } else if (name === "Settings") {
      document.getElementById("settings-panel")?.showModal();
    }
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesTitle = task.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesStatus = status === "All" || task.status === status;
      const matchesPriority = priority === "All" || task.priority === priority;
      return matchesTitle && matchesStatus && matchesPriority;
    });
  }, [tasks, search, status, priority]);

  // Choose the earliest due unfinished task from the complete task list.
  // Completed tasks are excluded, and undated tasks are placed last.
  const nextTask = useMemo(() => {
    const unfinished = tasks.filter((task) => task.status !== "Completed");
    return (
      [...unfinished].sort((first, second) => {
        const firstDate = first.dueDate || "9999-12-31";
        const secondDate = second.dueDate || "9999-12-31";
        return firstDate.localeCompare(secondDate);
      })[0] ?? null
    );
  }, [tasks]);

  const visibleTasks =
    showAll || search || status !== "All" || priority !== "All"
      ? filteredTasks
      : filteredTasks.slice(0, 3);

  return (
    <div className="app-shell">
      <Sidebar section={section} onNavigate={navigate} />
      <main className="main-content">
        <Header section={section} onNavigate={navigate} />
        <div className="dashboard-body">
          <div className="welcome-heading">
            <div>
              <h1>Your work, in focus.</h1>
              <p>Plan your day, stay organized, and celebrate small wins.</p>
            </div>
            <button
              type="button"
              className="primary-button desktop-new"
              onClick={openCreate}
            >
              New task
            </button>
          </div>

          <FocusNotes
            percentage={stats.percentage}
            inProgress={stats.inProgress}
            nextTask={nextTask}
          />

          <div className="overview-heading">Overview</div>
          <div className="stats-grid">
            <StatCard
              type="total"
              label="Total tasks"
              value={stats.total}
              detail="Across all projects"
            />
            <StatCard
              type="progress"
              label="In progress"
              value={stats.inProgress}
              detail="Keep the momentum"
            />
            <StatCard
              type="completed"
              label="Completed"
              value={stats.completed}
              detail="Great work this week"
            />
          </div>

          <section className="tasks-section" id="tasks">
            <div className="tasks-heading">
              <div>
                <h2>My tasks</h2>
                <p>Manage and track everything in one place.</p>
              </div>
              <button
                type="button"
                className="view-all"
                onClick={() => setShowAll((value) => !value)}
              >
                {showAll ? "Show less" : "View all tasks"}
              </button>
              <button
                type="button"
                className="mobile-add"
                onClick={openCreate}
                aria-label="Create new task"
              >
                <Plus size={22} />
              </button>
            </div>
            <FilterBar
              status={status}
              onStatus={setStatus}
              priority={priority}
              onPriority={setPriority}
              search={search}
              onSearch={setSearch}
              counts={stats}
            />
            <TaskList
              tasks={visibleTasks}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
              onStatus={updateStatus}
            />
          </section>
        </div>
      </main>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navigation.map(({ name, icon: Icon }) => (
          <button
            type="button"
            key={name}
            className={section === name ? "active" : ""}
            onClick={() => navigate(name)}
          >
            <Icon size={19} />
            <span>{name === "My tasks" ? "Tasks" : name}</span>
          </button>
        ))}
      </nav>
      <dialog className="settings-dialog" id="settings-panel">
        <h2>Workspace settings</h2>
        <p>
          Tasks are stored in this browser. You can manage them from My tasks.
        </p>
        <form method="dialog">
          <button type="submit" className="primary-button">
            Close
          </button>
        </form>
      </dialog>
      {formOpen && (
        <TaskForm
          key={editingTask?.id || "new"}
          task={editingTask}
          onSave={saveTask}
          onClose={closeForm}
        />
      )}
      {deleteTarget && (
        <ConfirmDialog
          task={deleteTarget}
          onCancel={closeDelete}
          onConfirm={() => {
            deleteTask(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
}
