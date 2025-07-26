import { useState, useEffect } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskItem } from '../components/TaskItem';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function TaskListPage() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    // Hook para obtener las tareas al cargar la página
    useEffect(() => {
        fetch(`${API_URL}/tasks`)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => setTasks(data))
                .catch(() => setError('Error al cargar las tareas.'));
    }, []); // El array vacío [] asegura que se ejecute solo una vez

    // ... (código anterior del componente) ...

const addTask = async (title) => {
    try {
        // Hacemos la petición POST a la API
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title, 
                description: 'Sin descripción' // Añadimos una descripción por defecto
            })
        });

        if (!response.ok) {
            throw new Error('No se pudo crear la tarea.');
        }

        const newTask = await response.json();
        
        // Actualizamos el estado local añadiendo la nueva tarea a la lista
        setTasks(prevTasks => [...prevTasks, newTask]);

    } catch (err) {
        setError(err.message);
    }
};

const deleteTask = async (id) => {
    try {
        // Hacemos la petición DELETE a la API
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('No se pudo eliminar la tarea.');
        }
        
        // Actualizamos el estado local filtrando la tarea eliminada
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

    } catch (err) {
        setError(err.message);
    }
};

const toggleStatus = async (task) => {
    try {
        // Hacemos la petición PUT a la API, enviando el estado contrario
        const response = await fetch(`${API_URL}/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !task.completed })
        });

        if (!response.ok) {
            throw new Error('No se pudo actualizar la tarea.');
        }
        
        const updatedTask = await response.json();

        // Actualizamos el estado local reemplazando la tarea modificada
        setTasks(prevTasks => 
            prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
        );

    } catch (err) {
        setError(err.message);
    }
};


// ... (resto del código del componente) ...

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Mi Lista de Tareas</h1>
            <TaskForm onAddTask={addTask} />
            <ul>
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={deleteTask}
                        onToggleStatus={toggleStatus}
                    />
                ))}
            </ul>
        </div>
    );
}