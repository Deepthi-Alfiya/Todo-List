const express = require('express');
const mongoose = require('mongoose');
const TodoModel = require('./models/TodoModel'); // Adjust the path as needed
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

// Route to fetch tasks
app.get('/get', async (req, res) => {
    const todos = await TodoModel.find();
    res.send(todos);
});

// Route to create a new todo
app.post('/create', async (req, res) => {
    const newTodo = new TodoModel({ task: req.body.task });
    await newTodo.save();
    res.send(newTodo);
});

// Route to delete a todo
app.delete('/delete/:id', async (req, res) => {
    await TodoModel.findByIdAndDelete(req.params.id);
    res.sendStatus(204); // No content
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
