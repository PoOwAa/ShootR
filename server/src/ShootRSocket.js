const socketIO = require('socket.io');

class ShootRSocket {
    constructor(server, game) {
        this.io = socketIO(server);
        this.game = game;
    }

    listen() {
        this.io.on('connection', socket => {
            console.log(`Someone just connected: ${socket.id}`);
            this.socket = socket;

            this.newPlayerEvent();
            this.disconnectEvent();
            this.playerAction();
        });
    }

    newPlayerEvent() {
        this.socket.on('new-player', (data, cb) => {
            console.log(`Player: ${this.socket.id} connected`);
            this.game.addNewPlayer(data.name, this.socket);
            cb();
        });
    }

    disconnectEvent() {
        this.socket.on('disconnect', () => {
            console.log(`Player ${this.socket.id} disconnected`);
            this.game.removePlayer(this.socket.id);
        });
    }

    playerAction() {
        this.socket.on('player-action', data => {
            this.game.updatePlayer(
                this.socket.id,
                data.keyboardState,
                data.timestamp
            );
        });
    }
}

module.exports = ShootRSocket;
