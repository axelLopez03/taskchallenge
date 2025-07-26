import { useState } from 'react';

export function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTask(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="¿Qué necesitas hacer?"
            />
            <button type="submit">Agregar Tarea</button>
        </form>
    );
}