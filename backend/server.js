const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const mysql = require('mysql2');
  const app = express();
  const PORT = 3000;
  app.use(cors());
  app.use(bodyParser.json());
  // Create a connection to the database
  const connection = mysql.createConnection({
    host: 'localhost',   // Replace with your host
    user: 'root',        // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'node_db' // Replace with your database name
  });
  // Connect to the database
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the MySQL database.');
  });
  // Get all appointments
  app.get('/appointments', (req, res) => {
    connection.query('SELECT * FROM appointments', (err, results) => {
      if (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(results);
    });
  });
  // Add a new appointment
  app.post('/appointments', (req, res) => {
    const { rowDescription, rowDoctor, rowDate, rowTime, rowPatient } = req.body;
    const query = 'INSERT INTO appointments (rowDescription, rowDoctor, rowDate, rowTime, rowPatient) VALUES (?, ?, ?, ?, ?)';
    const values = [rowDescription, rowDoctor, rowDate, rowTime, rowPatient];
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error adding appointment:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      const newEvent = { rowNumber: results.insertId, rowDescription, rowDoctor, rowDate, rowTime, rowPatient };
      res.status(201).json(newEvent);
    });
  });
  // Delete an appointment
  app.delete('/appointments/:id', (req, res) => {
    const rowNumber = parseInt(req.params.id, 10);
    connection.query('DELETE FROM appointments WHERE rowNumber = ?', [rowNumber], (err, results) => {
      if (err) {
        console.error('Error deleting appointment:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.status(204).end();
    });
  });
  // Update an appointment
app.put('/appointments/:id', (req, res) => {
  const rowNumber = parseInt(req.params.id, 10);
  const { rowDescription, rowDoctor, rowDate, rowTime, rowPatient } = req.body;
  const query = 'UPDATE appointments SET rowDescription = ?, rowDoctor = ?, rowDate = ?, rowTime = ?, rowPatient = ? WHERE rowNumber = ?';
  const values = [rowDescription, rowDoctor, rowDate, rowTime, rowPatient, rowNumber];
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error updating appointment:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ rowNumber, rowDescription, rowDoctor, rowDate, rowTime, rowPatient });
  });
 });
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });