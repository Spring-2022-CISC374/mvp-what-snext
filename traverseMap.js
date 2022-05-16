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
    //this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    const restartButton = this.add.text(45, 15, 'Restart')
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.restart())
            .on('pointerover', () => restartButton.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => restartButton.setStyle({ fill: '#FFF' }));
    
  
    //TODO: figure out how to Abstract this? maybe with constant functions?
          
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
      if (typeof(gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 1]) == typeof(["a","b"])){
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
      if (typeof(gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 2]) == typeof(["a","b"])){
        gameSettings.activeNpc.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 2];
        gameSettings.activeNpc.sentenceNum = 1;
        gameSettings.dialogue = gameSettings.activeNpc.dialogue[0];

      } else {
            gameSettings.dialogue = gameSettings.activeNpc.dialogue[gameSettings.activeNpc.sentenceNum + 2];
            gameSettings.activeNpc.sentenceNum += 2;
      }
    });
       
    gameSettings.player = new npc('girl1','player skin', '');
    this.loadRoom();
    
  }

  update() {
    this.movePlayerManager(gameSettings.player.sprite, gameSettings.player.name);
    this.timePlayerSteps++;

    //checks for and moves following npcs if the player is moving
    if (gameSettings.headRoom.npcs){
      for (const [name,info] of Object.entries(gameSettings.headRoom.npcs)){
        if (info[2].maxFollowingDistance != -999 && this.npcs[name]){
          if (info[2].maxFollowingDistance < Math.abs(this.npcs[name].x - gameSettings.player.sprite.x)){
            if (Math.abs(gameSettings.player.sprite.body.velocity.x) > 0){
              this.movePlayerManager(this.npcs[name], name,
                (this.npcs[name].x > gameSettings.player.sprite.x),
                (this.npcs[name].x < gameSettings.player.sprite.x) );
            } else {
              this.movePlayerManager(this.npcs[name], name, false, false);
            }
          }
        }
      }
    }

    this.checkForCollisions();
    this.checkNPCDialogue();
    this.changeRoom();
  }

  restart(){
    game.sound.stopAll();
    this.scene.start("mainMenu");
  }

  loadRoom(){
    this.background = this.add.tileSprite(0, 0, config.width, config.height, gameSettings.headRoom.background);
    this.background.setOrigin(0, 0);
    //console.log("BG NAME.....   ", gameSettings.headRoom.sprit);
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
    else if(gameSettings.headRoom.background == "selectionBG") {
      this.background.x=-80;
      this.background.y=0;
      Align.scaleToGameW(this.background,1.35);
    }    
    else if(gameSettings.headRoom.background == "elevatorAnimBG") {
      this.background.x=0;
      this.background.y=0;
      Align.scaleToGameW(this.background,2.5);
    }

    /*
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
*/
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
    gameSettings.player.sprite = this.physics.add.sprite(locations.midWidth/0.85, locations.lowestHeight, gameSettings.player.name).setInteractive();
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
        //console.log("** ", gameSettings.dialogue);
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
      
      
      if (gameSettings.dialogue.includes('&&&')){
        //this indicates a conditional which could require a special function call in the form "text&&&functionName&inputs"
        for (var c in choices){
          if(choices[c].includes('&&&')){
            var parts = choices[c].split('&');
            choices[c] = parts[0];

            
            switch(parts[3]){ 
              //parts[3] == function/action name 
              //parts[4:] == parameters for functions
              case 'death':
              case 'addDoors':
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
              case 'death':
                //console.log("***** ", choices);
                //launch death screen
                if (parts[4] == 'creep'){
                  for (var d in this.doors){
                    this.doors[d].on('pointerdown', function(pointer){
                      //this.background.destroy();
                      //gameSettings.player.sprite.destroy();  
                      //game.sound.stopAll();
                     // game.BGM = this.killerBgm;
                      //game.sound.killerBgm.play("killerBgm");
                      //killerBgm.play();
                      //game.loadRoom.killerBgm.play();
                      //this.killerBgm.play(musicConfig);
                      var killerAnim = new npc("killerAnim","assets/spritesheets/killerAnimSprite.png",[]);
                      gameSettings.headRoom = new Room("killerAnimBG",{},{killerAnim:[locations.midWidthLeft, locations.midHeight, killerAnim]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: Two bodies were found at the Bestie residence at 5pm on a Friday.","REPORTER: Suspect was seen, following one of the children into the apartment.","REPORTER: The victim remained oblivious to the suspicious man behind them."]);
                      gameSettings.startDeathScreen = true;

                    });
                  }
                }

                if (parts[4] == 'fire'){
                  for (var d in this.doors){
                    this.doors[d].on('pointerdown', function(pointer){
                      //this.background.destroy();
                      //gameSettings.player.sprite.destroy();  
                      var fireAnim = new npc("fireAnim","assets/spritesheets/fireAnimSprite.png",[]);
                      game.sound.stopAll();
                      //this.creepBgm= this.sound.add("creepBgm");
                      //this.creepBgm.play(musicConfig);


                      gameSettings.headRoom = new Room("fireAnimBG",{},{fireAnim:[locations.midWidthLeft, locations.midHeight, fireAnim]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: Four of the bodies were identified as the burning room's residence.","REPORTER: The last body seemed to belong to a child who ran into the fire.","REPORTER: The child didn't seem to realize that fire could hurt them."]);
                      gameSettings.startDeathScreen = true;

                    });
                  }
                }

                if (parts[4] == 'elevator'){
                  for (var d in this.doors){
                    this.doors[d].on('pointerdown', function(pointer){
                      //this.background.destroy();
                      //gameSettings.player.sprite.destroy();  
                      var elevatorAnim = new npc("elevatorAnim","assets/spritesheets/elevatorAnimSprite.png",[]);
                      
                      game.sound.stopAll();
                      //this.creepBgm= this.sound.add("creepBgm");
                      //this.creepBgm.play(musicConfig);


                      gameSettings.headRoom = new Room("elevatorAnimBG",{},{elevatorAnim:[locations.midWidthLeft, locations.midHeight, elevatorAnim]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                      gameSettings.startDeathScreen = true;

                    });
                  }
                }

                if (parts[4] == 'end'){
                  for (var d in this.doors){
                    this.doors[d].on('pointerdown', function(pointer){
                      //this.background.destroy();
                      //gameSettings.player.sprite.destroy();  
                      var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                      
                      game.sound.stopAll();

                      gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: Our main story today includes a burning building and one heroic child","REPORTER: The big apartments caught fire at 5pm on a Friday.", "REPORTER: It trapped the children of apartment 68 among the flames.","REPORTER: They would have died...","REPORTER:However an observant child managed to get 911 the information the needed","REPORTER: Thus ends our segment for today.","REPORTER: Thank you for tuning in!"]);
                      gameSettings.startDeathScreen = true;

                    });
                  }
                }

                if (parts[4] == 'drug'){
                  for (var d in this.doors){
                    this.doors[d].on('pointerdown', function(pointer){
                      //this.background.destroy();
                      //gameSettings.player.sprite.destroy();  
                      var drugAnim = new npc("drugAnim","assets/spritesheets/drugAnimSprite.png",[]);
                      
                      game.sound.stopAll();
                      //this.creepBgm= this.sound.add("creepBgm");
                      //this.creepBgm.play(musicConfig);


                      gameSettings.headRoom = new Room("drugAnimBG",{},{drugAnim:[locations.midWidthLeft, locations.midHeight, drugAnim]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The cause of death appeared to be a mysterious substance the victim had eaten.","REPORTER: Upon further inspection the substance seemed to be laced with drugs.","REPORTER: No suspects have been found."]);
                      gameSettings.startDeathScreen = true;

                    });

              
                      const hsv = Phaser.Display.Color.HSVColorWheel();
              
                      this.background.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
              
                      this.input.on('pointerdown', function (pointer) {
              
                          const a = Phaser.Math.Between(0, 359);
                          const b = Phaser.Math.Between(0, 359);
                          const c = Phaser.Math.Between(0, 359);
                          const d = Phaser.Math.Between(0, 359);
              
                          image.setTint(hsv[a].color, hsv[b].color, hsv[c].color, hsv[d].color);
              
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
              
              case 'setPlayerSkin':
                gameSettings.player.name = gameSettings.activeNpc.name;
                break;
              case 'policeCall':
/*              
                if (parts[4] == 'correct'){
                  if (parts[5] == 'correct'){
                    if (parts[6] == 'correct'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                    else if (parts[6] == 'tooLittle'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                    else if (parts[6] == 'tooMuch'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                  }
                    else if(parts[4] == 'wrongFloor') {
                      if (parts[6] == 'correct'){
                        for (var d in this.doors){
                          this.doors[d].on('pointerdown', function(pointer){
                            //this.background.destroy();
                            //gameSettings.player.sprite.destroy();  
                            var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                            
                            game.sound.stopAll();
  
                            gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                            gameSettings.startDeathScreen = true;
      
                          });
                        }
                      }
                      else if (parts[6] == 'tooLittle'){
                        for (var d in this.doors){
                          this.doors[d].on('pointerdown', function(pointer){
                            //this.background.destroy();
                            //gameSettings.player.sprite.destroy();  
                            var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                            
                            game.sound.stopAll();
  
                            gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                            gameSettings.startDeathScreen = true;
      
                          });
                        }
                      }
                      else if (parts[6] == 'tooMuch'){
                        for (var d in this.doors){
                          this.doors[d].on('pointerdown', function(pointer){
                            //this.background.destroy();
                            //gameSettings.player.sprite.destroy();  
                            var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                            
                            game.sound.stopAll();
  
                            gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                            gameSettings.startDeathScreen = true;
      
                          });
                        }
                      }
                    }
                
                }


                 else if (parts[4] == 'Slow'){
                  if (parts[5] == 'correct'){
                    if (parts[6] == 'correct'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                    else if(parts[6] == 'tooLittle'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                    else if(parts[6] == 'tooMuch'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                  }
                  else if (parts[4] == 'wrongFloor') {
                    if (parts[6] == 'correct'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                    else if (parts[6] == 'tooLittle'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                    else if (parts[6] == 'tooMuch'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                  }
                }


                else if (parts[4] == 'verySlow'){
                  if (parts[5] == 'correct'){
                    if (parts[6] == 'correct'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                    else if (parts[6] == 'tooLittle'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                    else if (parts[6] == 'tooMuch'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                  }
                  else if(parts[4] == 'wrongFloor') {
                    if (parts[6] == 'correct'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                    else if (parts[6] == 'tooLittle'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                    else if (parts[6] == 'tooMuch'){
                      for (var d in this.doors){
                        this.doors[d].on('pointerdown', function(pointer){
                          //this.background.destroy();
                          //gameSettings.player.sprite.destroy();  
                          var endScreen = new npc("endScreen","assets/spritesheets/endScreen.png",[]);
                          
                          game.sound.stopAll();

                          gameSettings.headRoom = new Room("endScreenBG",{},{endScreen:[locations.midWidthLeft, locations.midHeight, endScreen]}, ["                       REPORTER: BREAKING NEWS!","REPORTER: One body was found at the big apartments at 5pm on a Friday.","REPORTER: The victim had tried to use the elevator to escape the fire.","REPORTER: However, the elevator had short circuited and dropped.","REPORTER: The child was killed on impact."]);
                          gameSettings.startDeathScreen = true;
    
                        });
                      }
                    }
                  }
                } 
*/

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

    if ((this.cursorKeys.left.isDown || (this.input.mousePointer.isDown && player.x > this.input.x + 10)) && left){
        player.setVelocityX(-gameSettings.playerSpeed);
        direction = '_left';
    } else if((this.cursorKeys.right.isDown || (this.input.mousePointer.isDown && player.x + 10 < this.input.x))&& right){
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
      
  //var siren = false;
    //if (this.input.mousePointer.isDown){
        //console.log("siren");
        //siren = true;
      //}
    //if (siren){
      //this.background.alpha-=0.1;
        //if(this.background.alpha==0){
          //this.background.alpha = 1.0;
        //}
    //}else{
      //this.background.alpha = 1.0;
    //}
    
   
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
