class MainMenu extends Phaser.Scene {
    constructor() {
      super("mainMenu");
    }
  
    //Add buttons and stuff to take you to a scenario and choose mode of play 
  
    create() {
      this.add.text(20, 20, "Main Menu: Press spacebar to play game");
        
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start("playGame");        }
        }
    
  }
  