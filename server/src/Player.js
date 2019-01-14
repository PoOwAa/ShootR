const Util = require('./Util');
const Entity = require('./Entity');
const Config = require('config');

class Player extends Entity {
    constructor(position, name, id) {
        super();
        this.position = position;
        this.name = name;
        this.id = id;
        this.health = 9;
        this.speed = 5;
        this.size = [50, 100];
        this.velocity = [0, 0];
        this.jumping = true;
    }

    static generateNewPlayer(name, id) {
        return new Player(
            [
                // Util.getRandomInt(Config.get('Game.width')),
                // Util.getRandomInt(Config.get('Game.height')),
                400,
                100,
            ],
            name,
            id
        );
    }

    update() {
        super.update();

        this.velocity[1] += Config.get('Physics.gravity');

        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        // Friction
        this.velocity[0] *= Config.get('Physics.friction');
        this.velocity[1] *= Config.get('Physics.friction');

        // Don't fall down TODO: collapse
        if (this.position[1] > Config.get('World.maxY') - 2 * this.size[1]) {
            this.jumping = false;
            this.velocity[1] = 0;
            this.position[1] = Config.get('World.maxY') - 2 * this.size[1];
        }

        // Left-right TODO: collapse
        if (this.position[0] < Config.get('World.minX')) {
            this.position[0] = Config.get('World.maxX');
        }
        if (this.position[0] > Config.get('World.maxX')) {
            this.position[0] = Config.get('World.minX');
        }
    }

    updateOnInput(keyboardState) {
        if (keyboardState.up && this.jumping === false) {
            this.velocity[1] -= Config.get('Physics.velocityY');
            this.jumping = true;
        }
        if (keyboardState.left) {
            this.velocity[0] -= Config.get('Physics.velocityX');
        }
        if (keyboardState.right) {
            this.velocity[0] += Config.get('Physics.velocityX');
        }
    }
}

module.exports = Player;
