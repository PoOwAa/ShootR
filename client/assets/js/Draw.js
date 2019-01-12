define(require => {
    const config = require('./Config');

    class Draw {
        /**
         * Creates an instance of Draw.
         * @param {*} context
         * @memberof Draw
         */
        constructor(context) {
            this.context = context;

            this.sprites = [];
        }

        /**
         * Factory for Draw class
         *
         * @static
         * @param {*} context
         * @returns
         * @memberof Draw
         */
        static create(context) {
            return new Draw(context);
        }

        /**
         * Clears the canvas
         *
         * @memberof Draw
         */
        clear() {
            this.context.clearRect(
                0,
                0,
                config.Game.CANVAS_WIDTH,
                config.Game.CANVAS_HEIGHT
            );
        }

        drawMap(map) {
            // console.log(map);
            this.context.save();
            // Scale down sprite size
            this.context.scale(map.scale.x, map.scale.y);
            for (let rowIndex = 0; rowIndex < map.tiles.length; rowIndex++) {
                const row = map.tiles[rowIndex];
                // console.log(row);
                for (let colIndex = 0; colIndex < row.length; colIndex++) {
                    const tileIndex = map.tiles[rowIndex][colIndex];

                    if (tileIndex === -1) {
                        continue;
                    }
                    // console.log(titleIndex);
                    const clipX = map.spriteImage.getClipX(tileIndex);
                    const clipY = map.spriteImage.getClipY(tileIndex);
                    const tileX = map.spriteImage.tileWidth * colIndex;
                    const tileY = map.spriteImage.tileHeight * rowIndex;
                    // console.log(clipX, clipY, tileX, tileY);

                    // Draw sprite
                    this.context.drawImage(
                        map.spriteImage.image,
                        clipX,
                        clipY,
                        map.spriteImage.tileWidth,
                        map.spriteImage.tileHeight,
                        tileX,
                        tileY,
                        map.spriteImage.tileWidth,
                        map.spriteImage.tileHeight
                    );
                }
            }
            this.context.setTransform(1, 0, 0, 1, 0, 0);
            this.context.restore();
        }

        drawSprites() {
            this.context.save();

            this.context.restore();
        }
    }

    return Draw;
});
