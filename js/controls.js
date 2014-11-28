var controls = {
  preload: function () {
    game.stage.backgroundColor = '#7ec0ee';
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

    this.title    = game.add.text(150, 50, 'CONTROLS', {font: '30px Arial', fill: '#ffffff'});
    this.space    = game.add.text(75, 150, 'Press SPACEBAR to jump...', {font: '30px Arial', fill: '#ffffff'});
    this.avoid    = game.add.text(125, 250, '...avoid the scissors.', {font: '30px Arial', fill: '#ffffff'});
    this.label    = game.add.text(125, 400, 'Press B to return!', {font: '30px Arial', fill: '#ffffff'});
    var bKey      = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
    bKey.onDown.add(this.returnToSplash, this);
  },
  returnToSplash: function() {
    game.time.events.remove(this.timer);
    game.state.start('splash');
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