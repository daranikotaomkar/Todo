import React, { useState } from 'react';
import { addTodo } from '../services/api';

const TodoForm = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = await addTodo({ title });
    onTodoAdded(todo);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;
