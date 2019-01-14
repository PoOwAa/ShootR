define(require => {
    const config = require('./Config');

    return class ViewPort {
        constructor(selfCoords = []) {
            this.selfCoords = selfCoords;
        }

        update(position) {
            this.selfCoords = position.slice();
        }

        toCanvasX(x) {
            return x - (this.selfCoords[0] - config.Game.CANVAS_WIDTH / 2);
        }

        toCanvasY(y) {
            return y - (this.selfCoords[1] - config.Game.CANVAS_HEIGHT / 2);
        }

        toCanvasCoords(position) {
            const translateX =
                this.selfCoords[0] - config.Game.CANVAS_WIDTH / 4;
            const translateY =
                this.selfCoords[1] - config.Game.CANVAS_HEIGHT / 4;
            return [
                position.position[0] - translateX,
                position.position[1] - translateY,
            ];
        }
    };
});
