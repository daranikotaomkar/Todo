const { v4: uuidv4 } = require('uuid');
const db = require('../models/db');

const getTodos = (req, res) => {
  const userId = req.user.id;

  db.all(`SELECT * FROM todos WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching todos' });
    }
    res.json(rows);
  });
};

const createTodo = (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;
  const id = uuidv4();
  const status = 'pending';

  db.run(`INSERT INTO todos (id, user_id, title, status) VALUES (?, ?, ?, ?)`,
    [id, userId, title, status], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating todo' });
      }
      res.status(201).json({ message: 'Todo created successfully' });
  });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  db.run(`UPDATE todos SET status = ? WHERE id = ?`, [status, id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating todo' });
    }
    res.json({ message: 'Todo updated successfully' });
  });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM todos WHERE id = ?`, [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting todo' });
    }
    res.json({ message: 'Todo deleted successfully' });
  });
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
