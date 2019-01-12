define(require => {
    console.log('Client initailized');
    require('./jQuery');

    $(document).ready(() => {
        const maps = require('./Maps');
        console.log('Document loaded successfully. Creating game');
        const Game = require('./Game');

        const game = Game.create(document.getElementById('canvas'), maps.earth);
        game.animate();
    });
});
