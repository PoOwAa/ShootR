/**
 * The Client.
 *
 * The client is communicating with the server via WebSocket (socket.io)
 * It's just a channel between Game and Server
 *
 */
define(require => {
    console.log('Client initailized');
    require('./jQuery');

    $(document).ready(() => {
        console.log('Document loaded successfully. Creating game');
        const maps = require('./Maps');
        const Game = require('./Game');

        // Start the game
        const game = Game.create(document.getElementById('canvas'), maps.earth);
        game.animate();
    });
});
