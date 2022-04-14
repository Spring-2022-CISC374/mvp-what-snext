class MainMenu extends Phaser.Scene {
    constructor() {
      super("mainMenu");
    }

    create() {
      this.add.text(20, 20, "Main Menu");
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

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start("playGame");        }
        }
    
  }
  