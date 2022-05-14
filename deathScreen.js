class DeathScreen extends Phaser.Scene{

    timeScrolling = 0;
    dialogueIndex = 0;
    blurbs;

    constructor(){
        super("deathScreen");
    }

    create() {
        //console.log("here");
        this.background = this.add.tileSprite(0, 0, config.width, config.height, gameSettings.headRoom.background);
        this.background.setOrigin(0, 0);

        const restartButton = this.add.text(45, 15, 'Restart')
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => gameSettings.startDeathScreen = false)
            .on('pointerdown', () => this.scene.start("mainMenu"))
            .on('pointerover', () => restartButton.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => restartButton.setStyle({ fill: '#FFF' }));

        if (gameSettings.headRoom.background == "killerAnimBG") {
            this.background.x=-100;
            this.background.y=0;
            Align.scaleToGameW(this.background,1.5);
        }
        if (gameSettings.headRoom.background == "elevatorAnimBG") {
            this.background.x=-100;
            this.background.y=0;
            Align.scaleToGameW(this.background,1.7);
        }
        if (gameSettings.headRoom.background == "drugAnimBG") {
            this.background.x=0;
            this.background.y=0;
            Align.scaleToGameW(this.background,1);
        }
        if (gameSettings.headRoom.background == "fireAnimBG") {
            this.background.x=-100;
            this.background.y=0;
            Align.scaleToGameW(this.background,1.7);
        }



        this.killerBgm = this.sound.add("killerBgm");
        if (gameSettings.headRoom.background == "killerAnimBG") {
            console.log("hi");
            game.sound.stopAll();
            this.killerBgm.play();
          }
          this.titleMusic = this.sound.add("titleMusic");
          if (gameSettings.headRoom.background == "endScreen") {
            console.log("hi");
            game.sound.stopAll();
            this.titleMusic.play();
          }

        this.blurbs = new Object();
    }

    update() {
        if (gameSettings.startDeathScreen){
            if (this.timeScrolling % 100 == 0 && this.dialogueIndex < gameSettings.headRoom.starterDialogue.length){
                if (this.blurbs[this.dialogueIndex]){
                    this.blurbs[this.dialogueIndex].destroy();
                }
                this.blurbs[this.dialogueIndex] = this.add.text( locations.left, config.height - locations.top, gameSettings.headRoom.starterDialogue[this.dialogueIndex]);
                this.dialogueIndex++;
            }
            if (this.dialogueIndex >= gameSettings.headRoom.starterDialogue.length){
                if (this.blurbs[gameSettings.headRoom.starterDialogue.length-1].y > locations.midHeight){
                    this.dialogueIndex = 0;
                }
            }
            for (var b in this.blurbs){
                if (this.blurbs[b].y > -20){
                    this.blurbs[b].y -= 1;
                }
            }
            this.timeScrolling++;
        }
        
    }
}
