const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true,               // Include credentials in requests
 }));
 app.use(bodyParser.json());
app.use(session({
secret: SECRET_KEY,
resave: false,
saveUninitialized: true,
}));
// Create a connection to the database
const connection = mysql.createConnection({
host: 'localhost', // Replace with your host
user: 'root', // Replace with your MySQL username
password: 'Hom@3368189', // Replace with your MySQL password
database: 'node_db3' // Replace with your database name
});
// Connect to the database
connection.connect(err => {
if (err) {
 console.error('Error connecting to the database:', err);
  return;
}
console.log('Connected to the MySQL database.');
});
// Middleware to check if user is authenticated
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        console.error('Invalid token:', err);
        return res.sendStatus(403); // Invalid token
      }
      console.log('Authenticated user:', user);
      req.user = user;
      next();
    });
  } else {
    console.error('No token provided');
    res.sendStatus(401); // No token provided
  }
 };
// User Registration
// User Registration
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  connection.query(query, [username, hashedPassword, role], (err, results) => {
      if (err) {
          console.error('Error registering user:', err);
          res.status(500).json({ error: 'Database error' });
          return;
      }
      const userId = results.insertId;
      const token = jwt.sign({ id: userId, username, role }, SECRET_KEY, { expiresIn: '1h' });
      res.status(201).json({ message: 'User registered successfully' });
  });
});

// User Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], async (err, results) => {
      if (err) {
          console.error('Error fetching user:', err);
          res.status(500).json({ error: 'Database error' });
          return;
      }
      if (results.length > 0) {
          const user = results[0];
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (isValidPassword) {
              const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
              req.session.user = { username: user.username, role: user.role };
              res.json({ token });
          } else {
              res.status(401).json({ error: 'Invalid password' });
          }
      } else {
          res.status(401).json({ error: 'User not found' });
      }
  });
});

// Get all appointments for the logged-in user
app.get('/appointments', authenticateJWT, (req, res) => {
  const { username, role } = req.user;
  let query;
  let params;
  if (role === 'doctor') {
      query = 'SELECT * FROM appointments WHERE rowDoctor = ?';
      params = [username];
  } else {
      query = 'SELECT * FROM appointments WHERE rowPatient = ?';
      params = [username];
  }
  connection.query(query, params, (err, results) => {
      if (err) {
          console.error('Error fetching appointments:', err);
          res.status(500).json({ error: 'Database error' });
          return;
      }
      res.json(results);
  });
});



// Add a new appointment
app.post('/appointments', authenticateJWT, (req, res) => {
  const { rowDescription, rowDoctor, rowDate, rowTime, rowPatient } = req.body;
  const query = 'INSERT INTO appointments (rowDescription, rowDoctor, rowDate, rowTime, rowPatient) VALUES (?, ?, ?, ?, ?)';
  const values = [rowDescription, rowDoctor, rowDate, rowTime, rowPatient];
  connection.query(query, values, (err, results) => {
      if (err) {
          console.error('Error adding appointment:', err);
          res.status(500).json({ error: 'Database error' });
          return;
      }
      const newEvent = { id: results.insertId, rowDescription, rowDoctor, rowDate, rowTime, rowPatient };
      res.status(201).json(newEvent);
  });
});



// Delete an appointment
app.delete('/appointments/:id', authenticateJWT, (req, res) => {
const id = parseInt(req.params.id, 10);
connection.query('DELETE FROM appointments WHERE id = ?', [id], (err, results) => {
  if (err) {
   console.error('Error deleting appointment:', err);
   res.status(500).json({ error: 'Database error' });
    return;
  } res.status(204).end();
});
});
// Update an appointment
app.put('/appointments/:id', authenticateJWT, (req, res) => {
const id = parseInt(req.params.id, 10);
const { rowDescription, rowDoctor, rowDate, rowTime, rowPatient } = req.body;
const query = 'UPDATE appointments SET rowDescription = ?, rowDoctor = ?, rowDate = ?,rowTime = ?, rowPatient = ? WHERE id = ?';
const values = [rowDescription, rowDoctor, rowDate, rowTime, rowPatient, id];
connection.query(query, values, (err, results) => {
  if (err) {
   console.error('Error updating appointment:', err);
   res.status(500).json({ error: 'Database error' });
    return;
  } res.json({ id, rowDescription, rowDoctor, rowDate, rowTime, rowPatient });
});
});
// Logout
app.post('/logout', (req, res) => {
req.session.destroy();
res.status(200).json({ message: 'Logged out successfully' });
});
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
//   const bodyParser = require('body-parser');
//   const cors = require('cors');
//   const mysql = require('mysql2');
//   const app = express();
//   const PORT = 3000;
//   app.use(cors());
//   app.use(bodyParser.json());
//   // Create a connection to the database
//   const connection = mysql.createConnection({
//     host: 'localhost',   // Replace with your host
//     user: 'root',        // Replace with your MySQL username
//     password: 'Hom@3368189', // Replace with your MySQL password
//     database: 'node_db' // Replace with your database name
//   });
//   // Connect to the database
//   connection.connect(err => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return;
//     }
//     console.log('Connected to the MySQL database.');
//   });
//   // Get all appointments
//   app.get('/appointments', (req, res) => {
//     connection.query('SELECT * FROM appointments', (err, results) => {
//       if (err) {
//         console.error('Error fetching appointments:', err);
//         res.status(500).json({ error: 'Database error' });
//         return;
//       }
//       res.json(results);
//     });
//   });
//   // Add a new appointment
//   app.post('/appointments', (req, res) => {
//     const { rowDescription, rowDoctor, rowDate, rowTime, rowPatient } = req.body;
//     const query = 'INSERT INTO appointments (rowDescription, rowDoctor, rowDate, rowTime, rowPatient) VALUES (?, ?, ?, ?, ?)';
//     const values = [rowDescription, rowDoctor, rowDate, rowTime, rowPatient];
//     connection.query(query, values, (err, results) => {
//       if (err) {
//         console.error('Error adding appointment:', err);
//         res.status(500).json({ error: 'Database error' });
//         return;
//       }
//       const newEvent = { id: results.insertId, rowDescription, rowDoctor, rowDate, rowTime, rowPatient };
//       res.status(201).json(newEvent);
//     });
//   });
//   // Delete an appointment
//   app.delete('/appointments/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     connection.query('DELETE FROM appointments WHERE id = ?', [id], (err, results) => {
//       if (err) {
//         console.error('Error deleting appointment:', err);
//         res.status(500).json({ error: 'Database error' });
//         return;
//       }
//       res.status(204).end();
//     });
//   });
//   // Update an appointment
// app.put('/appointments/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const { rowDescription, rowDoctor, rowDate, rowTime, rowPatient } = req.body;
//   const query = 'UPDATE appointments SET rowDescription = ?, rowDoctor = ?, rowDate = ?, rowTime = ?, rowPatient = ? WHERE id = ?';
//   const values = [rowDescription, rowDoctor, rowDate, rowTime, rowPatient, id];
//   connection.query(query, values, (err, results) => {
//     if (err) {
//       console.error('Error updating appointment:', err);
//       res.status(500).json({ error: 'Database error' });
//       return;
//     }
//     res.json({ id, rowDescription, rowDoctor, rowDate, rowTime, rowPatient });
//   });
//  });
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });