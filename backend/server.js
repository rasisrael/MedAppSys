const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let events = [];

// Get all appointments
app.get('/appointments', (req, res) => {
    res.json(events);
});

// Add a new appointment
app.post('/appointments', (req, res) => {
    const newEvent = req.body;
    newEvent.rowNumber = events.length > 0 ? events[events.length - 1].rowNumber + 1 : 1;
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// Delete an appointment
app.delete('/appointments/:rowNumber', (req, res) => {
    const rowNumber = parseInt(req.params.rowNumber, 10);
    events = events.filter(event => event.rowNumber !== rowNumber);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
