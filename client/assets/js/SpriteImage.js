define(require => {
    const config = require('./Config');

    /**
     * SpriteImage
     *
     * It contains the actual Image and the metadata for the sprite
     *
     * @class SpriteImage
     */
    class SpriteImage {
        /**
         * Creates an instance of SpriteImage.
         * @param {string} image        The src of the sprite file
         * @param {number} tileWidth    Tiles width in pixels. MUST have the same tile width in 1 sprite.
         * @param {number} tileHeight   Tiles height in pixels. MUST have the same tile height in 1 sprite.
         * @param {number} rows
         * @param {number} cols
         * @param {number[]} [environment=[]]
         * @memberof SpriteImage
         */
        constructor(
            image,
            tileWidth,
            tileHeight,
            rows,
            cols,
            environment = []
        ) {
            this.image = new Image();
            this.image.src = image;
            this.tileWidth = tileWidth;
            this.tileHeight = tileHeight;
            this.rows = rows;
            this.cols = cols;
            this.environment = environment;
        }

        /**
         * Get the starting X coordinate for the given tile in the sprite.
         *
         * @param {number} tileIndex
         * @returns {number}
         * @memberof SpriteImage
         */
        getClipX(tileIndex) {
            const col = tileIndex % this.cols;
            return col * this.tileWidth;
        }

        /**
         * Get the starting Y coordinate for the given tile in the sprite.
         *
         * @param {number} tileIndex
         * @returns
         * @memberof SpriteImage
         */
        getClipY(tileIndex) {
            const row = Math.floor(tileIndex / this.cols);
            return row * this.tileHeight;
        }
    }

    /**
     * The List of spriteImages
     *
     * TODO: maybe move this out to config.js?
     */
    const spriteImages = {
        earthTiles: new SpriteImage(
            `${config.Dir.SPRITE}tileset.gif`,
            48,
            48,
            2,
            5,
            [1, 3, 4, 6, 7]
        ),
    };

    return spriteImages;
});
