define(require => {
    /**
     * World class
     *
     * The playing area.
     *
     * @class World
     */
    class World {
        /**
         * Creates an instance of World.
         * @param {ShootR} map
         * @memberof World
         */
        constructor(map) {
            this.gravity = 0.05;
            this.gravitySpeed = 0;
            this.map = map;
            this.world = {
                height: 0,
                width: 0,
            };
        }

        /**
         * Factory method for World class.
         *
         * @static
         * @param {*} map
         * @returns
         * @memberof World
         */
        static create(map) {
            return new World(map);
        }

        /**
         * Calculates the real size of the world.
         *
         * @returns void
         * @memberof World
         */
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
