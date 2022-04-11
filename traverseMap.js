class TraverseMap extends Phaser.Scene {
  text;
  npcs;
  doors;
  constructor() {
    super("playGame");
  }

  create() {
    this.loadRoom();
  }

  update() {
    
    this.movePlayerManager();
    this.checkNPCDialogue();
    this.changeRoom();
  }


  loadRoom(){
    this.background = this.add.tileSprite(0, 0, config.width, config.height , gameSettings.headRoom.background);
    this.background.setOrigin(0, 0);
    //console.log(gameSettings.headRoom.background);


    //Scaling rooms
    var bg = this.background;
    if(gameSettings.headRoom.background == "cityBG") {
      bg.x=0;
      bg.y=0;
      Align.scaleToGameW(this.background,1.1);
      
    }
    else if (gameSettings.headRoom.background == "elevatorBG") {
      bg.x=-30;
      bg.y=-30;
      Align.scaleToGameW(this.background,1.2);  
    }
    else if(gameSettings.headRoom.background == "tenthFloorBG") {
      bg.x=0;
      bg.y=0;
      Align.scaleToGameW(this.background,2);
    }
    else if(gameSettings.headRoom.background == "friendRoomBG") {
      bg.x=0;
      bg.y=-10;
      Align.scaleToGameW(this.background,2.5);
    }
    else if(gameSettings.headRoom.background == "stairsAndElevatorBG") {
      bg.x=-20;
      bg.y=-200;
      Align.scaleToGameW(this.background,1.6);
    }
    else if(gameSettings.headRoom.background == "stairsBG") {
      bg.x=0;
      bg.y=-60;
      Align.scaleToGameW(this.background,1.8);
    }

    //this.textBox =  this.add.tileSprite(locations.midWidth,locations.top,config.width,locations.top, "woodendoor");

    this.doors = new Object();
    if (gameSettings.headRoom.doors){
      for (const [room,location] of Object.entries(gameSettings.headRoom.doors)){

        this.doors[room] = this.add.sprite(location[0],location[1],"door1").setInteractive(); //change door 1 to custom door graphic
        this.doors[room].on('pointerdown', function(pointer){

          for (var r in this.doors){
              this.doors[r].destroy();
          }
          gameSettings.headRoom = location[2];
          gameSettings.changeRoom = true;
        });
      }
    }

    this.npcs = new Object();
    if (gameSettings.headRoom.npcs){
      for (const [name,info] of Object.entries(gameSettings.headRoom.npcs)){

        this.npcs[name] = this.add.sprite(info[0],info[1],name).setInteractive(); 
        var sentenceNum = 0;
        this.npcs[name].on('pointerdown', function(pointer){
          /*
          for (var n in npcs){
              doors[n].destroy();
          }
          gameSettings.headRoom = location[2];
          //todo: remove npcs
          gameSettings.changeRoom = true;*/
          gameSettings.dialogue = info[2].dialogue[sentenceNum];
          gameSettings.showDialogue = true;
          sentenceNum++;
                    
          if (sentenceNum > info[2].dialogue.length ){
            sentenceNum = 0;
            gameSettings.showDialogue = false;
          }

        });
      }
    }
    

    this.physics.world.setBoundsCollision();

    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
    //this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    //this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
 
  }
  
  changeRoom(){
    //TODO: checks if you click on a door, if you do it changes the room accordingly
    if (gameSettings.changeRoom){
      console.log("change room");
      this.loadRoom();
      gameSettings.changeRoom = false;
    }
  }

  checkNPCDialogue(){
    //Creates necesary dialogue
  
    if (this.text){
      this.text.destroy();
    }
    if (gameSettings.showDialogue){
      if (gameSettings.dialogue.includes("**")){
        //checks if it is a multiple choice question
        var choices = gameSettings.dialogue.split("**");
        gameSettings.dialogue = choices[0];
      }
      if (gameSettings.dialogue.includes(".")){     
      this.text = this.add.text(20,locations.top,gameSettings.dialogue, {fill:"black"});
      }
      else {
        this.text = this.add.text(20,locations.top,gameSettings.dialogue, {fontStyle:"italic",fill:"black"});
      }

      /*
      for (c in choices){
        this.add.sprite(20,locations.top,)
      }*/
    } 
  }

  movePlayerManager(){
    
      if(this.cursorKeys.left.isDown){
          this.player.setVelocityX(-gameSettings.playerSpeed);
      }else if(this.cursorKeys.right.isDown){
          this.player.setVelocityX(gameSettings.playerSpeed);
      } else {
        this.player.setVelocityX(0);
      }

      if(this.cursorKeys.up.isDown){
          this.player.setVelocityY(-gameSettings.playerSpeed);
      }else if(this.cursorKeys.down.isDown){
          this.player.setVelocityY(gameSettings.playerSpeed);
      } else {
        this.player.setVelocityY(0);
      }

  }




}
