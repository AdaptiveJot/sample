const express = require('express');
const mysql = require('mysql2');
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',           
    password: 'aj@mysql@', // Replace with your MySQL password
    database: 'studentdb'  // Ensure the correct database name
});

// Static files and public HTML files serving
app.use(express.static(__dirname));

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Add a student
app.post('/add', (req, res) => {
    const { name, email, age } = req.body;
    const sql = 'INSERT INTO students (name, email, age) VALUES (?, ?, ?)';
    db.query(sql, [name, email, age], (err, result) => {
        if (err) {
            console.error('Error adding student:', err);
            return res.status(500).json({ message: 'Failed to add student' });
        }
        res.json({ message: 'Student added successfully!' });
    });
});

// Update a student
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const sql = 'UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?';
    db.query(sql, [name, email, age, id], (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            return res.status(500).json({ message: 'Failed to update student' });
        }
        res.json({ message: 'Student updated successfully!' });
    });
});

// Delete a student
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            return res.status(500).json({ message: 'Failed to delete student' });
        }
        res.json({ message: 'Student deleted successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
