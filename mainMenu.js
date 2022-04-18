class MainMenu extends Phaser.Scene {
    constructor() {
      super("mainMenu");
    }

    create() {
      this.add.text(20, 20, "Main Menu");
      this.background = this.add.tileSprite(0,0,config.width,config.height,"titleScreenBG");
      this.background.setOrigin(0,0);
      this.title = this.add.image(450,300,"title");
      const button = this.add.text(110, 80, 'Press Here to Play')
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start("playGame"))
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
        
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }


    update() {
        this.background.tilePositionX += 0.6;
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start("playGame");        }
        }
    
  }
  
