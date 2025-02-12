// require('dotenv').config({ path: __dirname + '/../.env' }); // Load environment variables from .env file

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000; // Set the server port

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON requests

// Database connection
const db = mysql.createConnection({
  host: 'db', // MySQL service name from Docker Compose
  user: 'ibtisam',
  password: 'ibtisam',
  database: 'test_db'
  // Alternative: Use environment variables for better security
  // host: process.env.DB_HOST,
  // user: process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  // database: process.env.MYSQL_DATABASE,
});

// Establish database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit process if database connection fails
  }
  console.log('Database connected.');
});

// ✅ API Test Route (To check if the backend is running)
app.get('/api/test', (req, res) => {
  res.json({ message: "API is working!" });
});

// ✅ CRUD API Routes for users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  db.query('INSERT INTO users (name, email, role) VALUES (?, ?, ?)', [name, email, role], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, name, email, role });
  });
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  db.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id, name, email, role });
  });
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
});

/**
 * 🚀 Serving API via Nginx (Recommended for Production)
 *
 * - Express should **only** handle API requests (`/api/*`).
 * - The frontend (React) will be handled separately by Nginx.
 * - Nginx will act as a **reverse proxy**, forwarding `/api/` requests to Express.
 *
 * 🔹 Example Nginx Configuration:
 * ```
 * server {
 *   listen 80;
 *   server_name example.com;
 *
 *   # Serve the React frontend (from /usr/share/nginx/html)
 *   location / {
 *     root /usr/share/nginx/html;
 *     index index.html;
 *     try_files $uri /index.html;
 *   }
 *
 *   # Proxy API requests to the Express backend
 *   location /api/ {
 *     proxy_pass http://backend:5000/;
 *     proxy_set_header Host $host;
 *     proxy_set_header X-Real-IP $remote_addr;
 *     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 *   }
 * }
 * ```
 *
 * - The frontend should be **built** and placed in `/usr/share/nginx/html/`.
 * - Nginx will serve all frontend requests (`/`).
 * - Only API requests (`/api/*`) will be sent to the backend.
 

// 🛑 Remove frontend serving from Express (since Nginx is handling it)

// Serve static files from the client/public directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

*/

// Start server
app.listen(port, () => {
  console.log(`🚀 API Server is running at http://localhost:${port}`);
});


/**
 📝 Notes

 In this setup:
🚀 Express is completely free, just serves API routes (actual backend logic)
✅ Nginx serves frontend as well as handles API requests (acts as a gateway). 
 */