import React, { useState } from 'react';
import axios from 'axios';

function Create({ onTaskAdded }) {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task) return;

        // Send the task to the backend
        axios.post('http://localhost:3001/create', { task })
            .then((response) => {
                onTaskAdded(response.data); // Call the callback function with the new task
                setTask(''); // Clear the input field
            })
            .catch((error) => console.error("There was an error adding the task:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a new task"
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default Create;
