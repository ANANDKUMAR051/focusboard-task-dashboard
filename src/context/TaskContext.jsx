import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialTasks, statuses, priorities } from '../data/initialTasks';

const TaskContext = createContext(null);

function isValidTask(task) {
    return task !== null &&
        typeof task === 'object' &&
        typeof task.id === 'string' &&
        typeof task.title === 'string' &&
        typeof task.description === 'string' &&
        typeof task.category === 'string' &&
        statuses.includes(task.status) &&
        priorities.includes(task.priority) &&
        typeof task.dueDate === 'string';
}

function isValidTaskList(value) {
    return Array.isArray(value) && value.every(isValidTask);
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useLocalStorage(
        'focusboard.tasks.v1',
        initialTasks,
        isValidTaskList
    );

    function addTask(fields) {
        const id = globalThis.crypto?.randomUUID?.() || `task-${Date.now()}`;
        setTasks(previous => [{ ...fields, id }, ...previous]);
    }

    function editTask(id, fields) {
        setTasks(previous => previous.map(task => (
            task.id === id ? { ...task, ...fields, id } : task
        )));
    }

    function deleteTask(id) {
        setTasks(previous => previous.filter(task => task.id !== id));
    }

    function updateStatus(id, status) {
        if (!statuses.includes(status)) return;

        setTasks(previous => previous.map(task => (
            task.id === id ? { ...task, status } : task
        )));
    }

    const stats = useMemo(() => {
        const total = tasks.length;
        const inProgress = tasks.filter(task => task.status === 'In Progress').length;
        const completed = tasks.filter(task => task.status === 'Completed').length;
        const percentage = total ? Math.round((completed / total) * 100) : 0;

        return { total, inProgress, completed, percentage };
    }, [tasks]);

    const value = { tasks, stats, addTask, editTask, deleteTask, updateStatus };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must be used inside TaskProvider');
    }

    return context;
}
