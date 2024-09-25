// Add this line at the top with your other requires
const express = require('express');
const cors = require('cors');
const app = express();

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the Todo API!');
});

// Your other routes go here...
// For example: 
// app.use('/api/auth', authRoutes);
// app.use('/api/todos', todoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
