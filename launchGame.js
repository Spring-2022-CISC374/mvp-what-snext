var ship1 = new npc("ship1", "ship.png", ['hello', 'world'] );

var roomB = new Room("background");
var roomA = new Room("grass",[roomB],[ship1]);

var gameSettings = {
  //All numbers here
    playerSpeed: 200,
    playerSize: window.innerWidth / 25,
    headRoom: roomA
}

var config = {
  mouseclick: false,
  mousedown: false,
  dialogue: ["Hi", "how are you?","good\nokay\nbad","I am happy to hear that."],
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

var game = new Phaser.Game(config);
