class TraverseMap extends Phaser.Scene {
  npcs;
  doors;
  timePlayerSteps = 0;

  constructor() {
    super("playGame");
  }

  create() {
    gameSettings.txtBox.dialogueBox = new textSprite(this,locations.left,locations.top,config.width*.75,locations.top, "whiteSquare");
    gameSettings.txtBox.answer1 = new textSprite(this, locations.left,locations.midUpperHeight,config.width/4,locations.top, "whiteSquare");
    gameSettings.txtBox.answer2 = new textSprite(this, locations.midWidth - locations.left,locations.midUpperHeight,config.width/4,locations.top, "whiteSquare");
    gameSettings.txtBox.answer3 = new textSprite(this, locations.right - (locations.left * 2),locations.midUpperHeight,config.width/4,locations.top, "whiteSquare");
    gameSettings.headRoom = gameSettings.defaultHeadRoom;
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    const button = this.add.text(45, 15, 'Restart')
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.restart())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    
  
          //TODO: Abstract this
          
    gameSettings.txtBox.dialogueBox.sprite.on('pointerdown',function(pointer){      
      if (!gameSettings.txtBox.answer1.sprite.visible){
              if (gameSettings.activeNpc.sentenceNum >= gameSettings.activeNpc.dialogue.length){
                gameSettings.activeNpc.sentenceNum = 0;
                gameSettings.dialogue = undefined;
              } else {
                gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];
                gameSettings.activeNpc.sentenceNum ++;
              }
            } else {}
    });
        
    gameSettings.txtBox.answer1.sprite.on('pointerdown',function(pointer){
        if (typeof(gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum]) == typeof(["a","b"])){
              gameSettings.activeNpc.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];
              gameSettings.activeNpc.sentenceNum = 1;
              gameSettings.dialogue = gameSettings.activeNpc.dialogue[0];
    
        } else {
              
              gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];
              if (gameSettings.txtBox.answer3.sprite.visible) {
                gameSettings.activeNpc.sentenceNum += 3;
              } else if (gameSettings.txtBox.answer2.sprite.visible) {
                gameSettings.activeNpc.sentenceNum += 2;
              }
        }
    });

    gameSettings.txtBox.answer2.sprite.on('pointerdown',function(pointer){
      if (typeof(gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum]) == typeof(["a","b"])){
        gameSettings.activeNpc.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 1];
        gameSettings.activeNpc.sentenceNum = 1;
        gameSettings.dialogue = gameSettings.activeNpc.dialogue[0];

      } else {
            gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 1];
    
            if (gameSettings.txtBox.answer3.sprite.visible) {
              gameSettings.activeNpc.sentenceNum += 3;
            } else {
              gameSettings.activeNpc.sentenceNum += 2;
            }
      }
    });
    
    gameSettings.txtBox.answer3.sprite.on('pointerdown',function(pointer){
      if (typeof(gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum]) == typeof(["a","b"])){
        gameSettings.activeNpc.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 2];
        gameSettings.activeNpc.sentenceNum = 1;
        gameSettings.dialogue = gameSettings.activeNpc.dialogue[0];

      } else {
            gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 2];
            gameSettings.activeNpc.sentenceNum += 2;
      }
    });
       
    this.loadRoom();
  }

  update() {
    this.movePlayerManager(this.player,'player');
    this.timePlayerSteps++;

    //checks for and moves following npcs
    if (gameSettings.headRoom.npcs){
      for (const [name,info] of Object.entries(gameSettings.headRoom.npcs)){
        if (info[2].maxFollowingDistance != -999 && this.npcs[name]){
          if (info[2].maxFollowingDistance < Math.abs(this.npcs[name].x - this.player.x)){
            this.movePlayerManager(this.npcs[name], name,
                      this.npcs[name].x > this.player.x,
                      this.npcs[name].x < this.player.x );
          }

        }
      }
    }

    this.checkForCollisions();
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

    //Scaling rooms

   if (gameSettings.headRoom.background == "elevatorBG") {
      this.background.x=-50;
      this.background.y=-120;
      Align.scaleToGameW(this.background,1.2);  
    }
    else if(gameSettings.headRoom.background == "tenthFloorBG") {
      this.background.x=-50;
      this.background.y=0;
      Align.scaleToGameW(this.background,1.6);
    }
    else if(gameSettings.headRoom.background == "friendRoomBG") {
      this.background.x=0;
      this.background.y=-10;
      Align.scaleToGameW(this.background,1.7);
    }
    else if(gameSettings.headRoom.background == "stairsAndElevatorBG") {
      this.background.x=-140;
      this.background.y=-120;
      Align.scaleToGameW(this.background,1.2);
    }
    else if(gameSettings.headRoom.background == "stairsBG") {
      this.background.x=0;
      this.background.y=-60;
      Align.scaleToGameW(this.background,1.3);
    } 

    //Initialize Room Objects
    if (gameSettings.txtBox.dialogueBox.text){
      gameSettings.txtBox.dialogueBox.addText();
      gameSettings.txtBox.answer1.addText();
      gameSettings.txtBox.answer2.addText();
      gameSettings.txtBox.answer3.addText();
    } 

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
        this.npcs[name] = this.physics.add.sprite(info[0],info[1],name).setInteractive(); 

        this.npcs[name].on('pointerdown', function(pointer){
          gameSettings.activeNpc = info[2];
          if (!gameSettings.txtBox.answer1.sprite.visible){

            if (gameSettings.activeNpc.sentenceNum >= gameSettings.activeNpc.dialogue.length){
              gameSettings.activeNpc.sentenceNum = 0;
              gameSettings.dialogue = undefined;
            } else {
              gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];
              gameSettings.activeNpc.sentenceNum++;
            }
          }
        });
      }
    }

    this.physics.world.setBoundsCollision();
    this.player = this.physics.add.sprite(locations.midWidth, locations.lowestHeight, "player_left");
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
          //change text style
          textStyle = {fontStyle:"italic",fill:"black"};          
      } if (gameSettings.dialogue.includes("&&&")){
        //this indicates a conditional which could require a special function call
        //TODO: implement this
      }
      
    }
      
    gameSettings.txtBox.dialogueBox.addText(choices[0],textStyle);
    gameSettings.txtBox.answer3.addText(choices[3]);
    gameSettings.txtBox.answer2.addText(choices[2]);
    gameSettings.txtBox.answer1.addText(choices[1]);
    
  }

  movePlayerManager(player,name,left=true,right=true){
    //allows player movement with arrow keys

    if (this.timePlayerSteps > 40){
      this.timePlayerSteps = 0;
    }

    var frontLeg = '';

    if ( this.timePlayerSteps < 10){
      frontLeg = '_left';
    } else if ( this.timePlayerSteps < 20){
      frontLeg = '';
    } else if ( this.timePlayerSteps < 30) {
      frontLeg ='_right';
    } else {
      frontLeg = '';
    }
    
    var direction = '';

    if (this.cursorKeys.left.isDown && left){
        player.setVelocityX(-gameSettings.playerSpeed);
        direction = '_left';
    } else if(this.cursorKeys.right.isDown && right){
        player.setVelocityX(gameSettings.playerSpeed);
        direction = '_right';
    } else {
        player.setVelocityX(0);
        frontLeg = '';

        if (player.texture.key.endsWith('right')){
          direction = '_right';
        } else {
          direction = '_left';
        }

    }

    player.setTexture(name + frontLeg + direction);

  }


  checkForCollisions(){
    if (!this.cursorKeys.right.isDown && this.cursorKeys.left.isDown){

        //checks if you're standing still on a door and switches rooms
        for (const [room,location] of Object.entries(gameSettings.headRoom.doors)){
          if (location[0] > this.player.x - 10 
              && location[0] < this.player.x + 10 ){//todo: abstract the 10 to scale
            gameSettings.headRoom = location[2];
            gameSettings.changeRoom = true;
          }
        }

        /*
        //checks if you're standing still on a npc and starts a conversation
        for (const [room,location] of Object.entries(gameSettings.headRoom.npcs)){
          //console.log(this.npcs[room].x);
          if (location[2].x > this.player.x - 10 
              && location[2].x < this.player.x + 10 ){//todo: abstract the 10 to scale
            if (gameSettings.activeNpc != this.npcs[room] && this.npcs[room].sentenceNum == 0) { 
              // only starts conversations to keep things from getting confusing
              gameSettings.activeNpc = this.npcs[room];
              gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];

            }
          }
        }
        */
    }

  }


}
