var splashState = {
  preload: function () {
    game.stage.backgroundColor = '#7ec0ee';
    game.load.image('title', 'assets/flappyBeard.png');
    game.load.image('cloud', 'assets/cloud.png');
    game.load.image('beard', 'assets/beard.png');
  },
  create: function () {
    //clouds
    this.clouds = game.add.group();
    this.clouds.enableBody = true;
    this.clouds.createMultiple(3, 'cloud');

    this.beards = game.add.group();
    this.beards.enableBody = true;
    this.beards.createMultiple(5, 'beard');

    this.timer = game.time.events.loop(1500, this.addBeardsAndClouds, this);

    this.title        = this.game.add.sprite(100, 50, 'title');
    this.labelControl = game.add.text(100, 250, 'Press C for controls!', {font: '30px Arial', fill: '#ffffff'});
    this.label        = game.add.text(100, 400, 'Press space to start!', {font: '30px Arial', fill: '#ffffff'});
    var spaceKey      = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var cKey          = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
    spaceKey.onDown.add(this.startGame, this);
    game.input.onDown.add(this.startGame, this);
    cKey.onDown.add(this.controls, this);
  },
  startGame: function() {
    game.time.events.remove(this.timer);
    game.state.start('level1Splash');
  },
  controls: function() {
    game.time.events.remove(this.timer);
    game.state.start('controls');
  },
  addBeardsAndClouds: function() {
    this.addClouds();
    this.addBeards();
  },
  addClouds: function() {
    var cloud = this.clouds.getFirstDead();
    if(!cloud) { return; }
    cloud.reset(400, Math.floor(Math.random() * 600)+1);
    cloud.body.velocity.x = -Math.floor(Math.random() * 100)+1;
    cloud.checkWorldBounds = true;
    cloud.outOfBoundsKill = true;
  },
  addBeards: function() {
    var beards = this.beards.getFirstDead();
    if(!beards) { return; }
    beards.reset(400, Math.floor(Math.random() * 600)+1);
    beards.body.velocity.x = -Math.floor(Math.random() * 100)+20;
    beards.body.velocity.y = -Math.floor(Math.random() * 100)+20;
    beards.checkWorldBounds = true;
    beards.outOfBoundsKill = true;
  }
}