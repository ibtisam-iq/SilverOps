// require('dotenv').config({ path: __dirname + '/../.env' }); // Load environment variables from .env file
const mysql = require('mysql2');

// Create a connection to the database using environment variables
const db = mysql.createConnection({

  host: 'db',
  user: 'ibtisam',
  password: 'ibtisam',
  database: 'test_db'


  //host: process.env.DB_HOST,
  //user: process.env.MYSQL_USER,
  //password: process.env.MYSQL_PASSWORD,
  //database: process.env.MYSQL_DATABASE,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');

  // Create database if it doesn't exist
  db.query(`CREATE DATABASE IF NOT EXISTS test_db`, err => {
    if (err) console.error('Database creation failed:', err.stack);
  });

  db.end(); // Close initial connection
});

module.exports = db;