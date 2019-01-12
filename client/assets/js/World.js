define(require => {
    class World {
        constructor(map) {
            this.gravity = 0.05;
            this.gravitySpeed = 0;
            this.map = map;
            this.world = {
                height: 0,
                width: 0,
            };
        }

        static create(map) {
            return new World(map);
        }

        calcWorldSize() {
            const rows = this.map.tiles.length;
            const cols = this.map.tiles[0].length;
            const tileWidth = this.map.spriteImage.tileWidth;
            const tileHeight = this.map.spriteImage.tileHeight;

            this.world.height = rows * tileHeight;
            this.world.width = cols * tileWidth;
        }
    }

    return World;
});
