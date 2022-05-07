var config = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x10AA44,
  scene: [LoadGame,TraverseMap,MainMenu,Align],
  pixelArt: true,
  // 1.1 set the physics to arcade
  physics: {
    default: "arcade",
    arcade:{
        debug: false
    }
  }
}
config.width = 960;
config.height = 640;
//TODO: make scalable

var locations = {
  left: config.width / 10,
  right: config.width - config.width / 10,
  lessRight: config.width - config.width / 8,
  furtherRight: config.width  - config.width / 15,
  midHeight: config.height / 2,
  midSlightLower: config.height / 1.7,
  midLowerHeight: config.height / 1.5,
  midUpperHeight: config.height / 3.5,
  lessLowHeight: config.height / 1.25,
  lowHeight: config.height / 1.2,
  lowerHeight: config.height / 1.15,
  moreLowerHeight: config.height / 1.10,
  lowestHeight: config.height / 1,
  midWidth: config.width / 2,
  midWidthLeft: config.width / 2.05,
  midWidthSlightRight: config.width / 1.95,
  midWidthRight: config.width / 1.45,
  niceWidth: config.width - (config.width / 5),
  top: config.height / 10,
  lessTop: config.height / 9
}


var gameSettings = {
  //All numbers here
    playerSpeed: 200,
    playerSize: config.width / 10,
    headRoom: undefined,
    dialogue: '', 
    changeRoom: false,
    activeNpc: undefined,
    txtBox: {
      dialogueBox: undefined,
      answer1: undefined,
      answer2: undefined,
      answer3: undefined
    },
    player: {
      sprite: undefined
    }
    
}

var game = new Phaser.Game(config);
