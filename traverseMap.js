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
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    const restartButton = this.add.text(45, 15, 'Restart')
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.restart())
            .on('pointerover', () => restartButton.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => restartButton.setStyle({ fill: '#FFF' }));
    
  
          //TODO: figure out how to Abstract this?
          
    gameSettings.txtBox.dialogueBox.sprite.on('pointerdown',function(pointer){      
      if (!gameSettings.txtBox.answer1.sprite.visible){
              if (gameSettings.activeNpc.sentenceNum >= gameSettings.activeNpc.dialogue.length){
                gameSettings.activeNpc.sentenceNum = 0;
                gameSettings.dialogue = undefined;
              } else {
                gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];
                gameSettings.activeNpc.sentenceNum ++;
              }
            } 
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
       
    gameSettings.player = new npc('player','player skin', '');
    this.loadRoom();
  }

  update() {
    this.movePlayerManager(gameSettings.player.sprite,'player');
    this.timePlayerSteps++;

    //checks for and moves following npcs
    if (gameSettings.headRoom.npcs){
      for (const [name,info] of Object.entries(gameSettings.headRoom.npcs)){
        if (info[2].maxFollowingDistance != -999 && this.npcs[name]){
          if (info[2].maxFollowingDistance < Math.abs(this.npcs[name].x - gameSettings.player.sprite.x)){
            this.movePlayerManager(this.npcs[name], name,
                      this.npcs[name].x > gameSettings.player.sprite.x,
                      this.npcs[name].x < gameSettings.player.sprite.x );
          }

        }
      }
    }

    this.checkForCollisions();
    this.checkNPCDialogue();
    this.changeRoom();
  }

  restart(){
    this.scene.start("mainMenu");
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
   else if(gameSettings.headRoom.background == "tenthFloorBG" || gameSettings.headRoom.background == "sixthFloorBG") {
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
      this.dialogue = "A baby?";
      this.background.x=0;
      this.background.y=-60;
      Align.scaleToGameW(this.background,1.3);
    } 
    else if(gameSettings.headRoom.background == "eighthFloorBG") {
      this.background.x=-50;
      this.background.y=0;
      Align.scaleToGameW(this.background,1.7);
    }
    else if(gameSettings.headRoom.background == "fifthFloorBG") {
      this.background.x=0;
      this.background.y=0;
      Align.scaleToGameW(this.background,1.5);
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

    //Initializes player sprite
    gameSettings.player.dialogue = gameSettings.headRoom.starterDialogue;
    gameSettings.player.sprite = this.physics.add.sprite(locations.midWidth, locations.lowestHeight, "player_left").setInteractive();
    gameSettings.player.sprite.setCollideWorldBounds(true);

    if (gameSettings.player.dialogue){
      if (gameSettings.headRoom.showStarterDialogue){
            //set default dialogue
        gameSettings.activeNpc = gameSettings.player;
        gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum];
      }

      gameSettings.player.sprite.on('pointerdown', function(pointer){
        //Allows for iteration of personal dialogue
        gameSettings.activeNpc = gameSettings.player;
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

    } else {
      gameSettings.dialogue = '';
    }
       
  }
  
  changeRoom(){

    //checks if you click on a door, if you do it changes the room accordingly
    if (gameSettings.changeRoom){
      //deletes previous room

      gameSettings.changeRoom = false;

      if (this.npcs){
        for (var name in this.npcs){
          this.npcs[name].destroy();
        }
      }

      this.background.destroy();
      gameSettings.player.sprite.destroy();

      //creates new room
      if (gameSettings.startDeathScreen){
        this.scene.start("deathScreen");        
      } else {
        this.loadRoom();
      }
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
      }
      
      if (gameSettings.dialogue.includes("&&&")){
        //this indicates a conditional which could require a special function call in the form "text&&&functionName&inputs"
        for (var c in choices){
          if(choices[c].includes('&&&')){
            var parts = choices[c].split('&');
            choices[c] = parts[0];

            switch(parts[3]){ 
              //parts[3] == function/action name 
              //parts[4:] == parameters for functions
              case 'death':
                //launch death screen
                if (parts[4] == 'creep'){
                  for (var d in this.doors){
                    this.doors[d].on('pointerdown', function(pointer){
                      //this.background.destroy();
                      //gameSettings.player.sprite.destroy();  
                      var killerAnim = new npc("killerAnim","assets/spritesheets/killerAnimSprite.png",[]);
                      gameSettings.headRoom = new Room("killerAnimBG",{},{killerAnim:[locations.midWidthLeft, locations.midHeight, killerAnim]}, ["1asd","123","1234"]);
                      gameSettings.startDeathScreen = true;

                    });
                  }
                }
                break;
              case 'removeNPCs':
                //removes all npcs
                if (this.npcs){
                  for (var name in this.npcs){
                    this.npcs[name].destroy();
                  }
                }
                //TODO: add mechanic of them leaving?
                break;
              case 'policeCall':
                if (parts[4] == 'answerHere'){

                }


            }
          }

        }

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
          if (location[0] > gameSettings.player.sprite.x - 10 
              && location[0] < gameSettings.player.sprite.x + 10 ){//todo: abstract the 10 to scale
            gameSettings.headRoom = location[2];
            gameSettings.changeRoom = true;
          }
        }

        /*
        //checks if you're standing still on a npc and starts a conversation
        for (const [room,location] of Object.entries(gameSettings.headRoom.npcs)){
          //console.log(this.npcs[room].x);
          if (location[2].x > gameSettings.player.x - 10 
              && location[2].x < gameSettings.player.x + 10 ){//todo: abstract the 10 to scale
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
