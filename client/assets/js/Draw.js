define(require => {
    const config = require('./Config');

    class Draw {
        /**
         * Creates an instance of Draw.
         * @param {CanvasRenderingContext2D} context
         * @memberof Draw
         */
        constructor(context) {
            this.context = context;
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
         * Clear the canvas
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

        /**
         *
         *
         * @param {ShootRMap} map
         * @memberof Draw
         */
        drawMap(map) {
            /**
             * Save the state of context before changing it. It can improve
             * performance if the rest of context manipulation are static,
             * but with complex algorithm. Color of entities etc.
             *
             * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
             */
            this.context.save();

            /*******************************************************************
             * Custom scale for map
             *
             * With low resolution + downscale the app is consuming less CPU,
             * but the quality could be much worse. The best option should be
             * an eye catchy version with minimum CPU usage
             *
             * Resolution: 1920x1080    Scale: 1    CPU: ~20-25%
             * Resolution: 1440x810     Scale: 0.75 CPU: ~15-20%
             * Resolution: 960x540      Scale: 0.5  CPU: ~10-15%
             *****************************************************************/
            this.context.scale(map.scale.x, map.scale.y);

            /**
             * Draw the neccessary sprites in the map
             */
            // Rows
            for (let rowIndex = 0; rowIndex < map.tiles.length; rowIndex++) {
                const row = map.tiles[rowIndex];

                // Cols
                for (let colIndex = 0; colIndex < row.length; colIndex++) {
                    // The index of tile on the sprite image
                    const tileIndex = map.tiles[rowIndex][colIndex];

                    /**
                     * Sprite tile indexing starts with 0, so we can use -1
                     * in the map for "blank" sprites
                     *
                     * If you need background sprites, not environment, use
                     * CSS background-image on the canvas. Much faster
                     */
                    if (tileIndex === -1) {
                        continue;
                    }

                    // Coordinates of tile in sprite image
                    const clipX = map.spriteImage.getClipX(tileIndex);
                    const clipY = map.spriteImage.getClipY(tileIndex);

                    // Coordinates where to draw the sprite
                    const tileX = map.spriteImage.tileWidth * colIndex;
                    const tileY = map.spriteImage.tileHeight * rowIndex;

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

            // Change scale back to 1
            this.context.setTransform(1, 0, 0, 1, 0, 0);

            /**
             * Restore the saved state of context
             *
             * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
             */
            this.context.restore();
        }

        drawPlayer(isSelf, coords, name, health) {
            // Player name
            this.context.save();
            this.context.translate(coords[0], coords[1]);
            this.context.textAlign = 'center';
            this.context.font = '14px Helvetica';
            this.context.fillStyle = 'black';
            this.context.fillText(name, 0, -50);
            if (isSelf) {
                this.context.fillStyle = 'red';
            } else {
                this.context.fillStyle = 'green';
            }
            this.context.fillRect(-25, 0, 50, 100);
            this.context.restore();

            // Player health
            this.context.save();
            this.context.translate(coords[0], coords[1]);
            for (let i = 0; i < 10; i++) {
                if (i < health) {
                    this.context.fillStyle = 'green';
                } else {
                    this.context.fillStyle = 'red';
                }
                this.context.fillRect(-25 + 5 * i, -42, 5, 4);
            }
            this.context.restore();

            // Player shape
            // this.context.save();
            // this.context.translate(coords[0], coords[1]);
            // this.context.restore();
        }
    }

    return Draw;
});
