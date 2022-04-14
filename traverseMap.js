class TraverseMap extends Phaser.Scene {
  text;
  npcs;
  doors;
  dialogueBox;
  //sentenceNum;//TODO: fix this so its not shared with multiple npcs
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
    this.background = this.add.tileSprite(0, 0, config.width, config.height, gameSettings.headRoom.background);
    this.background.setOrigin(0, 0);

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

    this.doors = new Object();
    if (gameSettings.headRoom.doors){
      for (const [room,location] of Object.entries(gameSettings.headRoom.doors)){
        //Adds doors and door click listener to change room
        this.doors[room] = this.add.sprite(location[0],location[1],"rightArrow").setInteractive(); //TODO: change rightArrow to custom door graphic
        this.doors[room].on('pointerdown', function(pointer){

          for (var r in this.doors){
              this.doors[r].destroy();
          }
          gameSettings.headRoom = location[2];
          gameSettings.changeRoom = true;
        });
      }
    }

    //this.sentenceNum = 0;
    this.npcs = new Object();
    if (gameSettings.headRoom.npcs){
      for (const [name,info] of Object.entries(gameSettings.headRoom.npcs)){
        //Adds npcs and npc click listeners to change dialogue
        this.npcs[name] = this.add.sprite(info[0],info[1],name).setInteractive(); 
        var sentenceNum = 0;
        this.npcs[name].on('pointerdown', function(pointer){
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

    this.dialogueBox =  this.add.tileSprite(locations.mid,locations.top,config.width,locations.top, "whiteSquare").setInteractive();
    /*this.dialogueBox.visible = false;
    this.dialogueBox.on('pointerdown', function(pointer){
      //TODO: make this advance the dialogue
      console.log("change dialogue");
    });
    //
    /*
    var sprite = this.add.sprite(200, 200, 'whiteSquare');
    sprite.inputEnabled = true;
    sprite.input.enableDrag();

    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: sprite.width, align: "center", backgroundColor: "#ffff00" };

    var text = this.add.text(0, 0, "- text on a sprite -\ndrag me", style);
    text.anchor.set(0.5);
*///
    this.physics.world.setBoundsCollision();

    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
    //this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    //this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
 
  }
  
  changeRoom(){
    //checks if you click on a door, if you do it changes the room accordingly
    if (gameSettings.changeRoom){
      console.log("change room");
      this.loadRoom();
      gameSettings.changeRoom = false;
    }
  }

  checkNPCDialogue(){
    //Creates necesary charactor dialogue
  
    if (this.text){
      this.text.destroy();
      this.dialogueBox.visible = true;
    } 
    
    if (gameSettings.showDialogue){
      var choices = [gameSettings.dialogue];
      console.log(gameSettings.dialogue);
      if (gameSettings.dialogue.includes("**")){
        //checks if it is a multiple choice question
        //choices = gameSettings.dialogue.split("**");
        choices[0] = gameSettings.dialogue.replaceAll("**","\n");//todo:temporary
          
        
      } 
      if (gameSettings.dialogue.includes(".")){     
        this.text = this.add.text(20,locations.top,choices[0], {fill:"black"});
      }
      else {
        this.text = this.add.text(20,locations.top,choices[0], {fontStyle:"italic",fill:"black"});
      }

      //console.log(choices);
      //TODO: Fix this
     /* for (let i=1;i<choices.length;i++){
        //console.log(c);
        this.add.sprite(locations.oneThird * i,locations.mid, choices[i] , "whiteSquareSprite", "whiteSquareSprite");
      }
*/
    } else {
      this.dialogueBox.visible = false;
    }
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
