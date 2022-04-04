var config = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x10AA44,
  scene: [LoadGame,TraverseMap,MainMenu],
  pixelArt: true,
  // 1.1 set the physics to arcade
  physics: {
    default: "arcade",
    arcade:{
        debug: false
    }
  }
}

var locations = {
  left: config.width / 10,
  right: config.width - config.width / 10,
  midHeight: config.height / 2,
  midWidth: config.width / 2,
  niceWidth: config.width - (config.width / 5),
  top: config.height / 10
}

var ship1 = new npc("ship1", "assets/spritesheets/ship.png", ['hello', "blahhh \n**q1 \n**q2 \n**g3",'world'] );
var ship2 = new npc("ship2", "assets/spritesheets/ship2.png", ['hello2', "blahhh2 \n**q1 \n**q2 \n**g3",'world2'] );


var roomC = new Room("woodendoor",{},{});
var roomB = new Room("background",{},{ship1:[locations.midWidth,locations.midHeight,this.ship1]});
var roomA = new Room("grass"
  ,{roomB:[locations.left, locations.midHeight,this.roomB], roomC:[locations.right, locations.midHeight,this.roomC]}
  ,{ship1:[locations.midWidth,locations.midHeight,this.ship1],ship2:[locations.niceWidth, locations.midHeight, this.ship2]});

var gameSettings = {
  //All numbers here
    playerSpeed: 200,
    playerSize: window.innerWidth / 25,
    headRoom: roomA,
    showDialogue: false,
    dialogue: "",
    changeRoom: true
}

var game = new Phaser.Game(config);
