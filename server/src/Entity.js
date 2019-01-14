const Config = require('config');
const Util = require('./Util');

class Entity {
    constructor(position = [0, 0]) {
        this.position = position;

        this.lastUpdateTime = 0;
        this.updateTimeDifference = 0;
    }

    isVisibleTo(player) {
        return (
            Util.inBound(
                this.getX(),
                player.getX() - Config.get('visibility_threshold_x')
            ),
            player.getX() + Config.get('visibility_threshold_y') &&
                Util.inBound(
                    this.getY(),
                    player.getY() - Config.get('visibility_threshold_y'),
                    player.getY() + Config.get('visibility_threshold_y')
                )
        );
    }

    update() {
        const currentTime = new Date().getTime();
        if (this.lastUpdateTime === 0) {
            this.updateTimeDifference = 0;
        } else {
            this.updateTimeDifference = currentTime - this.lastUpdateTime;
        }
        this.lastUpdateTime = currentTime;
    }

    getX() {
        return this.position[0];
    }

    getY() {
        return this.position[1];
    }
}

module.exports = Entity;
