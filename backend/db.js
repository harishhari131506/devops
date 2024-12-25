const { Pool } = require('pg');

// PostgreSQL connection

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });


  // Function to check if the table exists and create it if not

  module.exports = pool;