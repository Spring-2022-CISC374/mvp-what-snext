class TraverseMap extends Phaser.Scene {
  npcs;
  doors;
  dialogueBox;
  answer1;
  answer2;
  answer3;

  constructor() {
    super("playGame");
  }

  create() {
    this.dialogueBox = new textSprite(this,locations.left,locations.top,config.width*1.5,locations.top, "whiteSquare");
    this.answer1 = new textSprite(this, locations.left,locations.midUpperHeight,config.width/3,locations.top, "whiteSquare");
    this.answer2 = new textSprite(this, locations.midWidth,locations.midUpperHeight,config.width/3,locations.top, "whiteSquare");
    this.answer3 = new textSprite(this, locations.right,locations.midUpperHeight,config.width/3,locations.top, "whiteSquare");
    gameSettings.headRoom = gameSettings.defaultHeadRoom;
    this.loadRoom();
  }

  update() {
    this.movePlayerManager();
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
    if (this.dialogueBox.text){
      this.dialogueBox.addText();
      this.answer1.addText();
      this.answer2.addText();
      this.answer3.addText();
    } 

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
    this.dialogueBox.sprite.on('pointerdown',function(pointer){
      if (!this.answer1.sprite.visible){
        gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];
      }
    });
    this.answer1.sprite.on('pointerdown',function(pointer){
      gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];
    });
    this.answer2.sprite.on('pointerdown',function(pointer){
      gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 1];
      gameSettings.activeNpc.sentenceNum += 1;
    });
    this.answer3.sprite.on('pointerdown',function(pointer){
      gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 2];
      gameSettings.activeNpc.sentenceNum += 2;
    });

    this.physics.world.setBoundsCollision();
    this.player = this.physics.add.sprite(locations.midWidth, locations.lowestHeight, "player");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
 
    /*
    this.physics.add.overlap(this.player, this.npcs, function(player, npc) {
      console.log(npc.name);
    }, null, this);
    */
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
      
    this.dialogueBox.addText(choices[0],textStyle);
    this.answer3.addText(choices[3]);
    this.answer2.addText(choices[2]);
    this.answer1.addText(choices[1]);
    
  }

  movePlayerManager(){
    //allows player movement with arrow keys
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

      //TODO: Add hit detection, so you can go through doors without clicking on them
  }




}
