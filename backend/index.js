require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: uuidv4(),
    title: 'Tarea de ejemplo',
    description: 'Esta es una tarea de ejemplo',
    completed: false,
    createdAt: new Date().toISOString() // <-- agrega esto
  }
];

// Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  const { title, description, completed, createdAt } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }
  const newTask = {
  id: uuidv4(),
  title,
  description,
  completed: typeof completed === 'boolean' ? completed : false,
  createdAt: createdAt ? new Date(createdAt).toISOString() : new Date().toISOString()
};
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Actualizar una tarea
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
});

// Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found.' });
  }
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});