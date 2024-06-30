const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let lastReceivedData = null;  // 最後に受信したデータを保存する変数

app.post('/receive-data', (req, res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);
    lastReceivedData = receivedData;  // データを保存
    res.json({ status: 'success', receivedData });
});

app.get('/get-last-data', (req, res) => {
    res.json(lastReceivedData || {});  // 保存されたデータを返す
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
