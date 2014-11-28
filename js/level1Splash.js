var level1Splash = {
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

    this.title  = this.game.add.sprite(100, 50, 'title');
    this.label  = game.add.text(150, 200, 'Level 1!', {font: '30px Arial', fill: '#ffffff'});
    this.label2 = game.add.text(150, 400, 'Get Ready...!', {font: '30px Arial', fill: '#ffffff'});
    this.i      = 3;
    setTimeout(function(self) {
      self.countInterval = setInterval(countDown.bind(self),1000);
    }, 1000, this)
    
  },
  startGame: function() {
    game.time.events.remove(this.timer);
    game.state.start('main');
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

function countDown() {
  this.label2.text = '      '+this.i+'      ';
  this.i--;
  if(this.i < 0) {
    clearInterval(this.countInterval);
    this.startGame();
  }
}