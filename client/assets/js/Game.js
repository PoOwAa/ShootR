define(require => {
    const config = require('./Config');
    const Draw = require('./Draw');
    const World = require('./World');
    // const ViewPort = require('./ViewPort')

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
        constructor(draw, map, viewPort = null) {
            this.draw = draw;
            this.viewPort = viewPort;
            this.world = World.create(map);
        }

        /**
         * Factory method for game
         *
         * @static
         * @param {*} canvasElement
         * @param {ShootRMap} map
         * @returns
         */
        static create(canvasElement, map) {
            canvasElement.width = config.Game.CANVAS_WIDTH;
            canvasElement.height = config.Game.CANVAS_HEIGHT;

            // Create 2 dimensional canvas
            const canvasContext = canvasElement.getContext('2d');
            const draw = Draw.create(canvasContext);
            // const viewPort = ViewPort.create();

            // Start a game instance
            const game = new Game(draw, map);
            return game;
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
            // TODO: Implement when there is server-client code
            return true;
        }

        /**
         * Draw the state of the game to the canvas
         *
         */
        drawGame() {
            // Clear the canvas
            this.draw.clear();

            // Draw the map
            // console.log(this.world);
            this.draw.drawMap(this.world.map);
        }
    };
});
