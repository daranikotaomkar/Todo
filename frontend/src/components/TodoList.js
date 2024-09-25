import React from 'react';
import { updateTodoStatus, deleteTodo } from '../services/api';

const TodoList = ({ todos, onStatusUpdated, onTodoDeleted }) => {
  const handleStatusChange = async (id, status) => {
    await updateTodoStatus(id, { status });
    onStatusUpdated();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    onTodoDeleted();
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <select
            value={todo.status}
            onChange={(e) => handleStatusChange(todo.id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
