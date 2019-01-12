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
            BASE_SPRITE_URL: '/sprites/',
            BASE_IMG_URL: '/img/',
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
