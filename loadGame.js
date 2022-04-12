class LoadGame extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("friendRoomBG", "assets/images/friendRoom.png");
    this.load.image("tenthFloorBG", "assets/images/tenthFloor.png");
    this.load.image("elevatorBG", "assets/images/insideElevator.png");
    this.load.image("cityBG", "assets/images/cityBackground.png");
    this.load.image("stairsAndElevatorBG", "assets/images/stairsElevator.png");
    this.load.image("stairsBG", "assets/images/stairs.png");
    this.load.image("grass", "assets/images/grass.png");
    
    this.load.spritesheet("player", "assets/spritesheets/youSprite.png",{
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
      frameWidth: gameSettings.playerSize/2,
      frameHeight: gameSettings.playerSize/2
    });  

//new sprites
/*     this.load.spritesheet("theCar", "assets/spritesheets/carSprite.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    }); */
     this.load.spritesheet("concernedMom", "assets/spritesheets/momSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
    this.load.spritesheet("creepyDude", "assets/spritesheets/creep2Sprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("creepyDude2", "assets/spritesheets/creep2Sprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("car", "assets/spritesheets/carSprite.png",{
      frameWidth: gameSettings.playerSize*4,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("crowd1", "assets/spritesheets/crowd1Sprite.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("crowd2", "assets/spritesheets/crowd2Sprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("crowd3", "assets/spritesheets/crowd3Sprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("click", "assets/spritesheets/clickSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });    

  }

  create() {

    this.add.text(20, 20, "Loading game...");
    //add death gifs and animations here
    this.scene.start("mainMenu");

    //Align.scaleToGameW(background, .1);


    
  }
}
