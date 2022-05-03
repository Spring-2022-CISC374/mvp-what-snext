class LoadGame extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    
    //load audio files
    this.load.audio("titleMusic", ["assets/sounds/titleMusic.mp3"]);
    this.load.audio("BGM", ["assets/sounds/BGM.mp3"]);

    //load background images
    this.load.image("titleScreenBG", "assets/images/titleScreen.png"); 
    this.load.image("friendRoomBG", "assets/images/friendRoom.png");
    this.load.image("tenthFloorBG", "assets/images/tenthFloor.png");
    this.load.image("elevatorBG", "assets/images/insideElevator.png");
    this.load.image("cityBG", "assets/images/cityBackground.png");
    this.load.image("stairsAndElevatorBG", "assets/images/stairsElevator.png");
    this.load.image("stairsBG", "assets/images/stairs.png");
    this.load.image("whiteSquare", "assets/images/whiteSquare.png"); 
    this.load.image("title", "assets/images/title.png");

    //load in charactors here

    //load player
    this.load.spritesheet("player_right", "assets/spritesheets/youSprite/legsTogetherFacingRight.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("player_left", "assets/spritesheets/youSprite/legsTogetherFacingLeft.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("player_left_left", "assets/spritesheets/youSprite/leftLegFrontFacingLeft.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("player_left_right", "assets/spritesheets/youSprite/leftLegFrontFacingRight.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });    
    this.load.spritesheet("player_right_left", "assets/spritesheets/youSprite/rightLegFrontFacingLeft.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("player_right_right", "assets/spritesheets/youSprite/rightLegFrontFacingRight.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    
    //load creep
    this.load.spritesheet("creep_right", "assets/spritesheets/creepSprite/legsTogetherFacingRight.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("creep_left", "assets/spritesheets/creepSprite/legsTogetherFacingLeft.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("creep_left_left", "assets/spritesheets/creepSprite/leftLegFrontFacingLeft.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("creep_left_right", "assets/spritesheets/creepSprite/leftLegFrontFacingRight.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });    
    this.load.spritesheet("creep_right_left", "assets/spritesheets/creepSprite/rightLegFrontFacingLeft.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("creep_right_right", "assets/spritesheets/creepSprite/rightLegFrontFacingRight.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });


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
    
  }
}
