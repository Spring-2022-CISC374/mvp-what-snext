class LoadGame extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background", "assets/images/background.png");
    this.load.image("woodendoor", "assets/images/woodendoor.png");
    this.load.image("grass", "assets/images/grass.png");
    
    this.load.spritesheet("player", "assets/spritesheets/power-up.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });

    //load in npcs here

    this.load.spritesheet("npc1", "assets/spritesheets/ship.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("ship1", "assets/spritesheets/ship.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("door1", "assets/images/woodendoor.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });

  }

  create() {
    this.add.text(20, 20, "Loading game...");

    //add death gifs and animations here
    
    this.scene.start("mainMenu");
    
  }
}
