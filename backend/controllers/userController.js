const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/db');

// JWT secret
const secret = 'your-secret-key';

// Signup controller
const signup = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const id = uuidv4();

  db.run(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`, 
    [id, name, email, hashedPassword], 
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'User registration failed.' });
      }
      res.status(201).json({ message: 'User registered successfully.' });
  });
};

// Login controller
const login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
    res.json({ token });
  });
};

module.exports = { signup, login };
