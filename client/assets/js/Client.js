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
        const Input = require('./Input');
        const LeaderBoard = require('./LeaderBoard');

        const socket = io();

        // Start the game
        const game = Game.create(
            socket,
            {
                mapCanvas: document.getElementById('mapCanvas'),
                gameCanvas: document.getElementById('canvas'),
            },
            maps.earth
        );

        $('#startGame').submit(startGame);
        $('#startGame').click(startGame);

        function startGame() {
            console.log('Starting game...');
            // Listen to keyboard
            Input.applyEventHandlers(document.getElementById('canvas'));

            socket.emit('new-player', { name: 'Test' }, () => {
                $('#canvas').focus();
                // Render game
                console.log('Player created, drawing the game');
                game.animate();

                setInterval(() => {
                    LeaderBoard.drawPlayerData(game);
                }, 1000);
            });
        }
    });
});
