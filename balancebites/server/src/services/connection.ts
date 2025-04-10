import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME); // Prints "Name: John Doe Age: 30"
    console.error('Environment variables not set!');
    process.exit(1);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection()
  .then(conn => {
    console.log('Successfully connected to MySQL database at:', process.env.DB_HOST);
    conn.release();
  })
  .catch(err => {
    console.error('Failed to connect to MySQL:', err.message);
    process.exit(1);
});

console.log('Connected to MySQL database');
console.log(process.env.DB_HOST);

export default pool;