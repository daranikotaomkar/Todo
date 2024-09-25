import React, { useState, useEffect } from 'react';
import { getTodos } from '../services/api';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const DashboardPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleTodoAdded = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleStatusUpdated = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleTodoDeleted = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <TodoForm onTodoAdded={handleTodoAdded} />
      <TodoList
        todos={todos}
        onStatusUpdated={handleStatusUpdated}
        onTodoDeleted={handleTodoDeleted}
      />
    </div>
  );
};

export default DashboardPage;
