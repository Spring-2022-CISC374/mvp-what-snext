class TraverseMap extends Phaser.Scene {
  npcs;
  doors;
  timePlayerSteps = 0;

  constructor() {
    super("playGame");
  }

  create() {
    gameSettings.txtBox.dialogueBox = new textSprite(this,locations.left,locations.top,config.width*1.5,locations.top, "whiteSquare");
    gameSettings.txtBox.answer1 = new textSprite(this, locations.left,locations.midUpperHeight,config.width/3,locations.top, "whiteSquare");
    gameSettings.txtBox.answer2 = new textSprite(this, locations.midWidth,locations.midUpperHeight,config.width/3,locations.top, "whiteSquare");
    gameSettings.txtBox.answer3 = new textSprite(this, locations.right,locations.midUpperHeight,config.width/3,locations.top, "whiteSquare");
    gameSettings.headRoom = gameSettings.defaultHeadRoom;
    this.loadRoom();
  }

  update() {
    this.movePlayerManager(this.player);
    this.checkNPCDialogue();
    this.changeRoom();
  }

  restart(){
    gameSettings.headRoom = gameSettings.defaultHeadRoom;
    gameSettings.changeRoom = true;
  }

  loadRoom(){
    this.background = this.add.tileSprite(0, 0, config.width, config.height, gameSettings.headRoom.background);
    this.background.setOrigin(0, 0);

    const button = this.add.text(45, 15, 'Restart')
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.restart())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    
   //Scaling rooms
   var bg = this.background; 
   if (gameSettings.headRoom.background == "elevatorBG") {
      bg.x=-50;
      bg.y=-120;
      Align.scaleToGameW(this.background,1.2);  
    }
    else if(gameSettings.headRoom.background == "tenthFloorBG") {
      bg.x=-50;
      bg.y=0;
      Align.scaleToGameW(this.background,1.6);
    }
    else if(gameSettings.headRoom.background == "friendRoomBG") {
      bg.x=0;
      bg.y=-10;
      Align.scaleToGameW(this.background,1.7);
    }
    else if(gameSettings.headRoom.background == "stairsAndElevatorBG") {
      bg.x=-140;
      bg.y=-120;
      Align.scaleToGameW(this.background,1.2);
    }
    else if(gameSettings.headRoom.background == "stairsBG") {
      bg.x=0;
      bg.y=-60;
      Align.scaleToGameW(this.background,1.3);
    } 

    //Initialize Room Objects
    //if (gameSettings.txtBox.dialogueBox.text){
      gameSettings.txtBox.dialogueBox.addText();
      gameSettings.txtBox.answer1.addText();
      gameSettings.txtBox.answer2.addText();
      gameSettings.txtBox.answer3.addText();
    //} 

    //TODO: Add back button/door
    this.doors = new Object();
    if (gameSettings.headRoom.doors){
      for (const [room,location] of Object.entries(gameSettings.headRoom.doors)){
        //Adds doors and door click listener to change room
        this.doors[room] = this.add.sprite(location[0],location[1],"click").setInteractive(); //TODO: change rightArrow to custom door graphic
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
        //Adds npcs and npc click listeners to change dialogue
        this.npcs[name] = this.add.sprite(info[0],info[1],name).setInteractive(); 
        this.npcs[name].on('pointerdown', function(pointer){
          gameSettings.activeNpc = info[2];
          if (gameSettings.activeNpc.sentenceNum >= gameSettings.activeNpc.dialogue.length){
            gameSettings.activeNpc.sentenceNum = 0;
            gameSettings.dialogue = undefined;
          } else {
            gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];
            gameSettings.activeNpc.sentenceNum++;
          }

        });
      }
    }

      //TODO: Abstract this
      gameSettings.txtBox.dialogueBox.sprite.on('pointerdown',function(pointer){
        if (!gameSettings.txtBox.answer1.sprite.visible){
          gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];
        }
      });
    
      gameSettings.txtBox.answer1.sprite.on('pointerdown',function(pointer){
        gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];
        if (gameSettings.txtBox.answer3.sprite.visible) {
          gameSettings.activeNpc.sentenceNum += 3;
        } else if (gameSettings.txtBox.answer2.sprite.visible) {
          gameSettings.activeNpc.sentenceNum += 2;
        }
      });
      gameSettings.txtBox.answer2.sprite.on('pointerdown',function(pointer){
        gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 1];
        if (gameSettings.txtBox.answer3.sprite.visible) {
          gameSettings.activeNpc.sentenceNum += 3;
        } else {
          gameSettings.activeNpc.sentenceNum += 2;
        }
      });
      gameSettings.txtBox.answer3.sprite.on('pointerdown',function(pointer){
        gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 2];
        gameSettings.activeNpc.sentenceNum += 2;
      });
   

    this.physics.world.setBoundsCollision();
    this.player = this.physics.add.sprite(locations.midWidth, locations.lowestHeight, "player_left");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
 
   
  }
  
  changeRoom(){


    //checks if you click on a door, if you do it changes the room accordingly
    if (gameSettings.changeRoom){
      //deletes previous room
      gameSettings.changeRoom = false;
      gameSettings.dialogue = undefined;

      if (this.npcs){
        for (var name in this.npcs){
          this.npcs[name].destroy();
        }
      }

      this.background.destroy();
      this.player.destroy();

      //creates new room
      this.loadRoom();
    }
  } 

  checkNPCDialogue(){
    //Creates necesary charactor dialogue
        
    var choices = [gameSettings.dialogue];
    var textStyle = {fill:"black"};
    if (gameSettings.dialogue){
      if (gameSettings.dialogue.includes("**")){
        //checks if it is a multiple choice question
        choices = gameSettings.dialogue.split("**");
      } 
      //TODO: move all this fun text parsing stuff to the textSprite function?
      if (!((gameSettings.dialogue.includes(".")) 
          || (gameSettings.dialogue.includes("!!")) 
          || (gameSettings.dialogue.includes("??"))     
          || (gameSettings.dialogue.includes("**")))){  
        textStyle = {fontStyle:"italic",fill:"black"};          
      }
      
    }
      
    gameSettings.txtBox.dialogueBox.addText(choices[0],textStyle);
    gameSettings.txtBox.answer3.addText(choices[3]);
    gameSettings.txtBox.answer2.addText(choices[2]);
    gameSettings.txtBox.answer1.addText(choices[1]);
    
  }

  movePlayerManager(player){
    //allows player movement with arrow keys

    if (this.timePlayerSteps > 40){
      this.timePlayerSteps = 0;
    }

    if (this.cursorKeys.left.isDown){
        player.setVelocityX(-gameSettings.playerSpeed);

        if ( this.timePlayerSteps < 10){
          //TODO: abstract this
          player.setTexture('player_left_left');
        } else if ( this.timePlayerSteps < 20){
          player.setTexture('player_left');
        } else if ( this.timePlayerSteps < 30) {
          player.setTexture('player_right_left');
        } else {
          player.setTexture('player_left');
        }

    } else if(this.cursorKeys.right.isDown){

        player.setVelocityX(gameSettings.playerSpeed);

        if ( this.timePlayerSteps < 10){
          player.setTexture('player_left_right');
        } else if ( this.timePlayerSteps < 20){
          player.setTexture('player_right');
        } else if ( this.timePlayerSteps < 30) {
          player.setTexture('player_right_right');
        } else {
          player.setTexture('player_right');
        }

    } else {
        player.setVelocityX(0);

        if (player.texture.key.endsWith('right')){
          player.setTexture('player_right');
        } else {
          player.setTexture('player_left');
        }

        //checks if you're standing still on a door and switches rooms
        for (const [room,location] of Object.entries(gameSettings.headRoom.doors)){
          if (location[0] > this.player.x - 10 
              && location[0] < this.player.x + 10 ){//todo: abstract the 10 to scale
            gameSettings.headRoom = location[2];
            gameSettings.changeRoom = true;
          }
        }

        //checks if you're standing still on a npc and starts a conversation
        for (const [name,location] of Object.entries(gameSettings.headRoom.npcs)){
          if (location[0] > this.player.x - 10 
              && location[0] < this.player.x + 10 ){//todo: abstract the 10 to scale
            if (gameSettings.activeNpc != location[2] && location[2].sentenceNum == 0) { 
              // only starts conversations to keep things from getting confusing
              gameSettings.activeNpc = location[2];
              gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];

            }
          }
        }

    }

    this.timePlayerSteps++;

      //TODO: Add hit detection, so you can go through doors without clicking on them

      //Shows player as walking
  }




}
