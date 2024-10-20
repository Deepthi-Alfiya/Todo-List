import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleAdd = (newTodo) => {
        setTodos([...todos, newTodo]); // Add the new todo to the state
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`) // Make sure your backend can handle this
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id)); // Remove the todo from state
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h2>Todo List</h2>
            <Create onAdd={handleAdd} />
            {
                todos.length === 0
                    ?
                    <div>
                        <h2>No Record</h2>
                    </div>
                    :
                    todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox' onClick={() => handleDelete(todo._id)}>
                                <BsCircleFill className='icon' />
                                <p>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className='icon' /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;
