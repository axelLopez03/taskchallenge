require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, name: 'Task 1', completed: false },
    { id: 2, name: 'Task 2', completed: true },
];
let nextId = 3;

app.get('/api/tasks', (req, res) => {
    const {title} = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    const newTask = { id: nextId++, name: title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/task/:id', (req, res) => {
    const taskid = parseInt(req.params.id);
    const { title, completed } = req.body;
    const taskIndex = tasks.findIndex((task) => task.id === taskid);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    if (title !== undefined) tasks[taskIndex].title = title;
    if (completed !== undefined) tasks[taskIndex].completed = completed;

    res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== taskId);

    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    res.status(204).send(); // No Content: éxito sin devolver datos
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
