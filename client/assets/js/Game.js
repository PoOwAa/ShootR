define(require => {
    const config = require('./Config');
    const Draw = require('./Draw');
    const World = require('./World');
    // const ViewPort = require('./ViewPort')

    return class Game {
        constructor(draw, map, viewPort = null) {
            this.draw = draw;
            this.viewPort = viewPort;
            this.world = World.create(map);
        }

        static create(canvasElement, map) {
            canvasElement.width = config.Game.CANVAS_WIDTH;
            canvasElement.height = config.Game.CANVAS_HEIGHT;

            const canvasContext = canvasElement.getContext('2d');
            const draw = Draw.create(canvasContext);
            // const viewPort = ViewPort.create();

            const game = new Game(draw, map);
            return game;
        }

        animate() {
            this.animationFrameId = window.requestAnimationFrame(() => {
                this.run();
            });
        }

        stopAnimation() {
            window.cancelAnimationFrame(this.animationFrameId);
        }

        run() {
            this.update();
            this.drawGame();
            this.animate();
        }

        update() {
            // TODO: Implement when there is server-client code
            return true;
        }

        drawGame() {
            // Clear the canvas
            this.draw.clear();

            // Draw the map
            // console.log(this.world);
            this.draw.drawMap(this.world.map);
        }
    };
});
