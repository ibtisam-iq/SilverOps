const mysql = require('mysql');

const db = mysql.createConnection({
  //host: 'localhost',
  //user: 'root',
  //password: 'IbtisamOps',
  //database: 'test_db'

  host: process.env.DB_HOST || 'mysql',  // 'mysql' is the service name used in docker-compose.yml
  user: process.env.DB_USER || 'root',       // MySQL user
  password: process.env.DB_PASSWORD || 'IbtisamOps', // MySQL password
  database: process.env.DB_NAME || 'test_db', // MySQL database name
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = db;

