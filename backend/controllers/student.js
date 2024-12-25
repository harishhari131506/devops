const pool = require('../db')
const q = require('../models/student')

const getStudents = (req,res)=>{
    pool.query(q.getallStudents , (err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows)
    })
}


const addStudents = (req, res) => {
    const { name, email, age, dob } = req.body;

    console.log('Request body:', req.body); // Debugging line

    pool.query(q.checkEmailExists, [email], (err, result) => {
        console.log(`Checking email: ${email}`);
        console.log(JSON.stringify(result.rows));

        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }

        if (result.rows.length) {
            res.send('Email Already Exists');
        } else {
            

        pool.query(q.insertQuery, [name, email, age, dob], (err, result) => {
            if (err) {
                console.error('Error inserting student:', err);
                res.status(500).send('Server error');
                return;
            }

            // Send the inserted student ID back as a confirmation
            console.log('Student inserted with ID:', result.rows[0].id);
            res.send(`Student added with ID: ${result.rows[0].id}`);
        });
        }
    });
};


module.exports = {
    getStudents , addStudents
}