var game = new Phaser.Game(500, 500, Phaser.AUTO, 'gameDiv');

game.state.add('splash', splashState);
game.state.add('level1Splash', level1Splash);
game.state.add('main', level1);
game.state.add('level2', level2);
game.state.add('controls', controls);
game.state.start('splash');

