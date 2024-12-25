require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/student')
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./db')
// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.json())
const checkAndCreateTable = async () => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    email VARCHAR(255) UNIQUE,  -- Ensure the email field is unique
    dob DATE
  );
`;


  const insertSampleDataQuery = `
    INSERT INTO students (name, age, email, dob)
    VALUES
      ('John Doe', 22, 'john.doe@example.com', '2002-05-15'),
      ('Jane Smith', 24, 'jane.smith@example.com', '2000-11-30')
    ON CONFLICT (email) DO NOTHING;  -- Prevent inserting duplicates based on email
  `;

  try {
    // 1. Create the table if it doesn't exist

    await pool.query(createTableQuery);
    console.log("Table 'students' is ready.");

    // 2. Insert sample data if the table is empty (optional)
    const result = await pool.query('SELECT COUNT(*) FROM students');
    if (parseInt(result.rows[0].count) === 0) {
      // Only insert if the table is empty
      await pool.query(insertSampleDataQuery);
      console.log("Sample data inserted into 'students' table.");
    } else {
      console.log("Table already has data. Skipping sample data insertion.");
    }
  } catch (err) {
    console.error("Error checking/creating table or inserting data:", err);
  }
};

// checkAndCreateTable();
app.get('/api' , async(req,res) => {
  res.send("Hello world")
})

app.use("/api/students" , studentRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
