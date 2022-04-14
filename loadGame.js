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
    this.load.image("whiteSquare", "assets/images/whiteSquare.png"); 
    //this.load.image("rightArrow", "assets/images/rightArrow.png"); 
    
    this.load.spritesheet("player", "assets/spritesheets/youSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });

    //load in npcs here

    this.load.spritesheet("whiteSquareSprite", "assets/spritesheets/whiteSquareS.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 

    this.load.spritesheet("phone", "assets/spritesheets/phoneSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
     this.load.spritesheet("concernedMom", "assets/spritesheets/momSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
    this.load.spritesheet("creepyDude", "assets/spritesheets/creep2Sprite.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("creepyDude2", "assets/spritesheets/creep2Sprite.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("car", "assets/spritesheets/carSprite.png",{
      frameWidth: gameSettings.playerSize*5,
      frameHeight: gameSettings.playerSize*5
    });
    this.load.spritesheet("girl", "assets/spritesheets/girlSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("boy", "assets/spritesheets/boySprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("click", "assets/spritesheets/clickSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });    
    this.load.spritesheet("people", "assets/spritesheets/peopleSprite.png",{
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
