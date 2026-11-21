import TaskItem from './TaskItem';

export default function TaskList({ tasks, onEdit, onDelete, onStatus }) {
  if (tasks.length === 0) {
    return <p className="empty-tasks">No tasks match your search or filters.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatus={onStatus}
        />
      ))}
    </div>
  );
}
