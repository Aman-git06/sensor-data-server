const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS and parse form data
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Store sensor data in memory
let sensorData = [];

// POST endpoint to receive data from ESP32
app.post('/sensor-data', (req, res) => {
  const { temperature, humidity } = req.body;
  const newData = {
    temperature: parseFloat(temperature),
    humidity: parseFloat(humidity),
    timestamp: new Date().toISOString()
  };
  
  sensorData.push(newData);
  console.log('Received:', newData);
  res.status(200).send('Data received');
});

// GET endpoint to retrieve data as JSON
app.get('/data', (req, res) => {
  res.json(sensorData);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
