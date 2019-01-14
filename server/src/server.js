const express = require('express');
const http = require('http');
const path = require('path');
const config = require('config');
const ShootRSocket = require('./ShootRSocket');
const Game = require('./Game');

const app = express();
const server = http.Server(app);

const PORT = config.get('Server.port');
const FRAME_RATE = config.get('Server.frameRate');

app.set('port', PORT);
app.use(
    '/css',
    express.static(path.join(__dirname, '../../client/assets/css'))
);
app.use('/js', express.static(path.join(__dirname, '../../client/assets/js')));
app.use(
    '/img',
    express.static(path.join(__dirname, '../../client/assets/img'))
);
app.use(
    '/sprites',
    express.static(path.join(__dirname, '../../client/assets/sprites'))
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

const game = new Game();
const socket = new ShootRSocket(server, game);
socket.listen();

server.listen(PORT, () => {
    console.log('Starting server on port 5000');
});

// Game loop
setInterval(() => {
    game.update();
    game.sendState();
}, FRAME_RATE);
