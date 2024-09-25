const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./todo-app.db');

// POST route for user signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4(); // Generate unique ID

    // Insert user into database
    db.run(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`, [id, name, email, hashedPassword], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id, name, email });
    });
});

// Export the router
module.exports = router;
