const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: 'Admin123', // replace with your MySQL password
  database: 'neurostack' // replace with your MySQL database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = db;
