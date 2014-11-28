var level1 = {
  preload: function () {
    game.stage.backgroundColor = '#7ec0ee';
    game.load.image('beard', 'assets/beard.png');
    game.load.image('pipe', 'assets/scissors.png');
    game.load.image('cloud', 'assets/cloud.png');
  },
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //clouds
    this.clouds = game.add.group();
    this.clouds.enableBody = true;
    this.clouds.createMultiple(10, 'cloud');

    //beard
    this.beard = this.game.add.sprite(100, 245, 'beard');
    game.physics.arcade.enable(this.beard);
    this.beard.body.gravity.y = 1000;
    this.beard.anchor.set(-0.2, 0.5);

    //jump key handler
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
    game.input.onDown.add(this.jump, this);
    //pipes
    this.pipes = game.add.group();
    this.pipes.enableBody = true;
    this.pipes.createMultiple(20, 'pipe');

    //event loop
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
    this.cloudTimer = game.time.events.loop(2000, this.addClouds, this);
    //score
    this.score = 0;
    this.labelScore = game.add.text(20, 20, '0', {font: '30px Arial', fill: '#ffffff'});
  },
  update: function () {
    if (this.beard.inWorld === false) {
      this.restartGame();
    }
    if(this.beard.angle < 20) {
      this.beard.angle++;
    }
    game.physics.arcade.overlap(this.beard, this.pipes, this.hitPipe, null, this);
  },
  jump: function () {
    if(this.beard.alive === false) {
      return;
    }
    this.beard.body.velocity.y = -350;
    var animation = game.add.tween(this.beard);

    animation.to({angle: -20}, 100);
    animation.start();
  },
  addClouds: function() {
    var cloud = this.clouds.getFirstDead();
    if(!cloud) { return; }
    cloud.reset(400, Math.floor(Math.random() * 100)+1);
    cloud.body.velocity.x  = -Math.floor(Math.random() * 100)+1;
    cloud.checkWorldBounds = true;
    cloud.outOfBoundsKill  = true;
  },
  addOnePipe: function(x, y) {
    var pipe = this.pipes.getFirstDead();
    if(!pipe) { return; }

    pipe.reset(x,y);
    pipe.body.velocity.x  = -200;

    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill  = true;
  },
  addRowOfPipes: function() {
    var hole = Math.floor(Math.random()*5)+1;

    for(var i=0; i<8; i++) {
      if(1 !== hole && i !== hole+1 && i !== hole+2) {
        this.addOnePipe(400, i * 60 + 10);
      }
    }
    this.score++;
    this.labelScore.text = this.score;
  },
  hitPipe: function() {
    if(this.beard.alive === false) {
      return;
    }
    this.beard.alive = false;
    game.time.events.remove(this.timer);
    game.time.events.remove(this.cloudTimer);

    this.clouds.forEachAlive(function(cloud) {
      cloud.body.velocity.x = 0;
    });
    this.pipes.forEachAlive(function(pipe) {
      pipe.body.velocity.x = 0;
    }, this);
  },
  restartGame: function () {
    game.state.start('main');
  }
};