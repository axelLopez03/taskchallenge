import React, { useEffect, useState } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskTable } from '../components/TaskTable';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setTasks(data))
      .catch(() => setError('Error al cargar las tareas.'));
  }, []);

  const addTask = async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (!response.ok) throw new Error('No se pudo crear la tarea.');
      const newTask = await response.json();
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('No se pudo eliminar la tarea.');
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const editTask = async (task) => {
    const newTitle = prompt('Nuevo título:', task.title);
    const newDescription = prompt('Nueva descripción:', task.description);
    if (newTitle === null || newDescription === null) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription
        })
      });
      if (!response.ok) throw new Error('No se pudo editar la tarea.');
      const updatedTask = await response.json();
      setTasks(prevTasks =>
        prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <div style={{
        background: 'var(--main-yellow)',
        padding: '24px 0 8px 0',
        marginBottom: 24,
        borderRadius: '0 0 16px 16px',
        boxShadow: '0 2px 8px #0002'
      }}>
        <h1 style={{
          color: 'var(--main-blue)',
          textAlign: 'center',
          margin: 0,
          fontSize: '2.5rem',
          fontWeight: 900,
          letterSpacing: 2
        }}>
          Mi Lista de Tareas
        </h1>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <TaskForm onAddTask={addTask} />
        <TaskTable tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
      </div>
    </div>
  );

  
}