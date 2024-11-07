import express from 'express'
import bodyParser from 'body-parser';
import db from './db.js'
const app = express();
app.use(bodyParser.json());

app.post('/students', (req, res) => {
    const { name, age, grade } = req.body;
    const query = 'INSERT INTO students (name, age, grade) VALUES (?, ?, ?)';
    db.query(query, [name, age, grade], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: result.insertId, name, age, grade });
    });
});
 
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

app.get('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM students WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send("Student not found");
        res.status(200).json(results[0]);
    });
});

app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, grade } = req.body;
    const query = 'UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?';
    db.query(query, [name, age, grade, id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send("Student not found");
        res.status(200).send("Student updated successfully");
    });
});

app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send("Student not found");
        res.status(200).send("Student deleted successfully");
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
