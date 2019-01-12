define(require => {
    const config = require('./Config');
    class SpriteImage {
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

        getClipX(tileIndex) {
            const col = tileIndex % this.cols;
            return col * this.tileWidth;
        }

        getClipY(tileIndex) {
            const row = Math.floor(tileIndex / this.cols);
            return row * this.tileHeight;
        }
    }

    console.log(config);
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
