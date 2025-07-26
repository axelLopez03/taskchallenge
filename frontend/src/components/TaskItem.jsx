export function TaskItem({ task, onToggleStatus, onDelete }) {
    return (
        <li>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
            </span>
            <button onClick={() => onToggleStatus(task)}>✅</button>
            <button onClick={() => onDelete(task.id)}>❌</button>
        </li>
    );
}