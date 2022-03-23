class TraverseMap extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.loadRoom();
  }

  update() {

    this.movePlayerManager();
    this.checkNPCs();
    this.changeRoom();
    
  }

  loadRoom(){
    this.background = this.add.tileSprite(0, 0, config.width, config.height , gameSettings.headRoom.background);
    this.background.setOrigin(0, 0);

    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow"
    });

    this.physics.world.setBoundsCollision();

    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
    //this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    var pointer = this.input.activePointer;
  }

  changeRoom(){
    //TODO: checks if you click on a door, if you do it changes the room accordingly
    /*this.Room.door = this.add.door().setInteractive();
    this.Room.door.on('pointerdown', function (pointer){
        
        gameSettings.headRoom = roomA;
        loadRoom();

    });
    */
    this.input.on('pointerdown', function () { 
      console.log("hi1");
      //gameSettings.headRoom = gameSettings.headRoom.doors[0];
      //this.loadRoom();
    });
    
  }

  checkNPCs(){
    //TODO: checks if npc is clicked, if it is, triggers corresponding dialogue scene 
    /*this.Room.npc = this.add.npc().setInteractive();
    this.Room.npc.on('pointerdown', function (pointer){
      
      this.scene.start("dialogue");

    })*/
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

      
      //TODO: add go to mouse click 
      /*if(this.pointer.Down){
        this.player.setX(pointer.worldX);
        this.player.setY(pointer.worldY);
      }*/
  }




}
