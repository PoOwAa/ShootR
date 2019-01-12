// User-defined configurations
define(require => {
    const Config = {
        Game: {
            CANVAS_WIDTH: 1920,
            CANVAS_HEIGHT: 1080,
        },
        Dir: {
            SPRITE: '/sprites/',
            IMG: '/img/',
        },
        Draw: {
            TILES_WIDTH: 48,
            TILES_HEIGHT: 48,
            IMG_SRCS: {
                bg: 'bg.jpg',
            },
            SPRITE_SRCS: {
                tiles: 'tileset.gif',
            },
        },
        Map: 'earth',
    };

    return Config;
});
