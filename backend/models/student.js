const getallStudents = "SELECT * FROM students";
const checkEmailExists = "SELECT * FROM students WHERE email = $1";
const insertQuery = `
INSERT INTO students (name, email, age, dob)
VALUES ($1, $2, $3, $4) RETURNING id;
`

module.exports = {
    getallStudents,checkEmailExists,insertQuery
};