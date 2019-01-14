define(require => {
    const config = require('./Config');
    const Draw = require('./Draw');
    const World = require('./World');
    const ViewPort = require('./ViewPort');
    const Input = require('./Input');

    /**
     * The Game.
     *
     * This class controls the rendering process
     *
     * @class Game
     */
    return class Game {
        /**
         * Creates an instance of Game.
         * @param {Draw} draw
         * @param {ShootRMap} map
         * @param {ViewPort | null} [viewPort=null]
         */
        constructor(socket, draw, mapDraw, map, viewPort = null) {
            this.socket = socket;

            this.draw = draw;
            this.mapDraw = mapDraw;
            this.viewPort = viewPort;
            this.world = World.create(map);

            this.self = null;
            this.players = {};
            this.latency = 0;
        }

        /**
         * Factory method for game
         *
         * @static
         * @param {*} canvasElement
         * @param {ShootRMap} map
         * @returns
         */
        static create(socket, canvasElement, map) {
            const mapCanvas = canvasElement.mapCanvas;
            const gameCanvas = canvasElement.gameCanvas;
            mapCanvas.width = gameCanvas.width = config.Game.CANVAS_WIDTH;
            mapCanvas.height = gameCanvas.height = config.Game.CANVAS_HEIGHT;

            // Map Canvas
            const mapCanvasCtx = mapCanvas.getContext('2d');
            const mapDraw = Draw.create(mapCanvasCtx);
            // Game Canvas
            const canvasContext = gameCanvas.getContext('2d');
            const draw = Draw.create(canvasContext);
            // Create 2 dimensional canvas
            const viewPort = new ViewPort();

            // Start a game instance
            const game = new Game(socket, draw, mapDraw, map, viewPort);
            game.init();
            return game;
        }

        init() {
            console.log('Starting to listen to server');
            // Draw the map
            // TODO: if viewPort is dynamic, move this into loop
            this.mapDraw.drawMap(this.world.map);
            this.socket.on('update', data => {
                this.receiveGameState(data);
            });
        }

        receiveGameState(state) {
            this.self = state['self'];
            this.players = state['players'];
            this.latency = state['latency'];
        }

        /**
         * Loop
         *
         * Using requestAnimationFrame instead of
         * setInterval / any self made loop
         *
         * ~60 FPS
         */
        animate() {
            this.animationFrameId = window.requestAnimationFrame(() => {
                this.run();
            });
        }

        /**
         * Stop the loop
         *
         */
        stopAnimation() {
            window.cancelAnimationFrame(this.animationFrameId);
        }

        run() {
            this.update();
            this.drawGame();
            this.animate();
        }

        /**
         * Update the game, according to the server state
         *
         * @returns
         */
        update() {
            if (this.self) {
                this.viewPort.update(this.self['position']);
                const keyboardState = {
                    up: Input.UP,
                    right: Input.RIGHT,
                    down: Input.DOWN,
                    left: Input.LEFT,
                };
                var packet = {
                    keyboardState,
                    timestamp: new Date().getTime(),
                };

                this.socket.emit('player-action', packet);
            }
        }

        /**
         * Draw the state of the game to the canvas
         *
         */
        drawGame() {
            if (this.self) {
                // Clear the canvas
                this.draw.clear();

                // Draw self
                this.draw.drawPlayer(
                    true,
                    // this.viewPort.toCanvasCoords(this.self),
                    this.self['position'],
                    this.self['name'],
                    this.self['health']
                );

                // Draw other players
                for (let i = 0; i < this.players.length; ++i) {
                    this.drawing.drawPlayer(
                        false,
                        // this.viewPort.toCanvasCoords(this.players[i]),
                        this.players[i]['position'],
                        this.players[i]['name'],
                        this.players[i]['health']
                    );
                }
            }
        }
    };
});
