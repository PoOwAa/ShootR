class Util {
    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static getRandomHex() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
}

module.exports = Util;
