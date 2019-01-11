const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.Server(app);

const PORT = process.env.PORT || 5000;
const FRAME_RATE = 1000 / 60;

app.set('port', PORT);
app.use(
    '/css',
    express.static(path.join(__dirname, '../../client/assets/css'))
);
app.use('/js', express.static(path.join(__dirname, '../../client/assets/js')));
app.use(
    '/sprites',
    express.static(path.join(__dirname, '../../client/assets/sprites'))
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

server.listen(PORT, () => {
    console.log('Starting server on port 5000');
});
