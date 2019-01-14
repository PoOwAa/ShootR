define(require => {
    return class LeaderBoard {
        static drawPlayerData(game) {
            console.log(`${game.self.name} ${game.latency} ms`);
        }
    };
});
