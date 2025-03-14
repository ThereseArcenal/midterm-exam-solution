const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());


let tasks = [];


app.post('/tasks', (req, res) => {
    const { id, name, description } = req.body;

    if (!id || !name || !description) {
        return res.status(400).json({ error: 'All fields (id, name, description) are required' });
    }

    const taskExists = tasks.some(task => task.id === id);
    if (taskExists) {
        return res.status(400).json({ error: 'Task with this ID already exists' });
    }

    const newTask = { id, name, description };
    tasks.push(newTask);
    res.status(201).json({ message: 'Task added successfully', task: newTask });
});


app.get('/tasks', (req, res) => {
    res.json(tasks);
});


app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id == id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
});


app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const task = tasks.find(task => task.id == id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.name = name || task.name;
    task.description = description || task.description;

    res.json({ message: 'Task updated successfully', task });
});


app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id != id);

    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: `Task ID ${id} deleted successfully` });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
