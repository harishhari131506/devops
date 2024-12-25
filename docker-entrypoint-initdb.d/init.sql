-- Create the 'students' table if it doesn't exist
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    email VARCHAR(255) UNIQUE, 
    dob DATE
);

-- Insert a single entry into the 'students' table
INSERT INTO students (name, age, email, dob)
VALUES 
    ('John Doe', 20, 'john.doe@example.com', '2004-05-15');
