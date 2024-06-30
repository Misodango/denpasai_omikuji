const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(express.json());
app.use(cors()); // CORSを有効化

let lastReceivedData = null;

app.post('/receive-data', (req, res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);
    lastReceivedData = receivedData;
    res.json({ status: 'success', receivedData });
});

app.get('/get-last-data', (req, res) => {
    res.json(lastReceivedData || {});
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
