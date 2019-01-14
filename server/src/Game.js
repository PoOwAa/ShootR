const HashMap = require('hashmap');
const Player = require('./Player');

class Game {
    constructor() {
        this.clients = new HashMap();

        this.players = new HashMap();
    }

    addNewPlayer(name, socket) {
        this.clients.set(socket.id, {
            socket,
            latency: 0,
        });

        this.players.set(socket.id, Player.generateNewPlayer(name, socket.id));
    }

    removePlayer(id) {
        if (this.clients.has(id)) {
            this.clients.remove(id);
        }

        if (this.players.has(id)) {
            this.players.remove(id);
        }
    }

    getPlayerNameBySocketId(id) {
        const player = this.players.get(id);
        if (player) {
            return player.name;
        }
        return null;
    }

    updatePlayer(id, keyboardState, timestamp) {
        const player = this.players.get(id);
        const client = this.clients.get(id);
        if (player) {
            player.updateOnInput(keyboardState);
        }
        if (client) {
            client.latency = new Date().getTime() - timestamp;
        }
    }

    getPlayers() {
        return this.players.values();
    }

    update() {
        const players = this.getPlayers();
        for (let i = 0; i < players.length; ++i) {
            players[i].update();
        }
    }

    sendState() {
        const ids = this.clients.keys();
        for (let i = 0; i < ids.length; ++i) {
            const currentPlayer = this.players.get(ids[i]);
            const currentClient = this.clients.get(ids[i]);

            currentClient.socket.emit('update', {
                self: currentPlayer,
                players: this.getPlayers().filter(player => {
                    if (player.id === currentPlayer.id) {
                        return false;
                    }
                    return true;
                }),
                latency: currentClient.latency,
            });
        }
    }
}

module.exports = Game;
