class MainMenu extends Phaser.Scene {
    constructor() {
      super("mainMenu");
    }

    create() {
      game.sound.stopAll();
      function touchStarted() {
        getAudioContext().resume();
      }
      this.titleMusic = this.sound.add("titleMusic");
      var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
      }

      this.BGM= this.sound.add("BGM");
      //const musicButton = this.add.text(110, 80, 'Play music').on('pointerdown', () => this.titleMusic.play(musicConfig));
      //this.titleMusic.play(musicConfig);
      this.add.text(20, 20, "Main Menu");
      this.background = this.add.tileSprite(0,0,config.width,config.height,"titleScreenBG");
      this.background.setOrigin(0,0);
      this.title = this.add.image(450,300,"title");

      const musicButton = this.add.text(75, 130, 'Play Music')
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.titleMusic.play(musicConfig))
            .on('pointerover', () => musicButton.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => musicButton.setStyle({ fill: '#FFF' })); 
            
      const playButton = this.add.text(110, 80, 'Press Here to Play')
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start("playGame"))
            .on('pointerdown', () => this.titleMusic.stop())
            .on('pointerdown', () => this.BGM.play(musicConfig))
            .on('pointerover', () => playButton.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => playButton.setStyle({ fill: '#FFF' }));
        
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      var lg = new LoadGame();
      lg.initStory();
    }


    update() {
        this.background.tilePositionX += 0.6;
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
          //I like having this here
          this.titleMusic.stop();
          this.scene.start("playGame");        
        } 
    }
    
  }
  
