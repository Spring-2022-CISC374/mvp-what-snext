class DeathScreen extends Phaser.Scene{

    timeScrolling = 0;
    dialogueIndex = 0;
    blurbs;
    textStyle = {fill:"white"};
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
            this.textStyle =  {fill:"red"};
        }
        if (gameSettings.headRoom.background == "drugAnimBG") {
            this.background.x=0;
            this.background.y=0;
            Align.scaleToGameW(this.background,1);
        }
        if (gameSettings.headRoom.background == "fireAnimBG") {
            console.log("HELLLO HELP FIRE");
            this.background.x=-100;
            this.background.y=0;
            Align.scaleToGameW(this.background,1.8);
            this.textStyle =  {fill:"red"};
      
        }

        this.titleMusic = this.sound.add("titleMusic");
        
        if (gameSettings.headRoom.background == "endScreenHero") {
            this.titleMusic.play();
            this.starSprite = this.add.image(config.width - 40,50,"starSprite");
            this.starSprite = this.add.image(config.width - 105,50,"starSprite");
            this.starSprite = this.add.image(config.width - 170,50,"starSprite");
            this.heroSprite = this.add.image(config.width - 275,180,"heroSprite");
            this.textStyle =  {fill:"black"};
        }
        if (gameSettings.headRoom.background == "endScreenSidekick") {
            this.titleMusic.play();
            this.starSprite = this.add.image(config.width - 40,50,"starSprite");
            this.starSprite = this.add.image(config.width - 105,50,"starSprite");
            this.starSpriteGrey = this.add.image(config.width - 170,50,"starSpriteGrey");
            this.sidekickSprite = this.add.image(config.width - 285,180,"sidekickSprite");
            this.textStyle =  {fill:"black"};
        }
        if (gameSettings.headRoom.background == "endScreenAlly") {
            this.titleMusic.play();
            this.starSprite = this.add.image(config.width - 40,50,"starSprite");
            this.starSpriteGrey = this.add.image(config.width - 105,50,"starSpriteGrey");
            this.starSpriteGrey = this.add.image(config.width - 170,50,"starSpriteGrey");
            this.allySprite = this.add.image(config.width - 275,180,"allySprite");
            this.textStyle =  {fill:"black"};
        }
        if (gameSettings.headRoom.background == "endScreenSurvivor") {
            this.titleMusic.play();
            this.starSpriteGrey = this.add.image(config.width - 40,50,"starSpriteGrey");
            this.starSpriteGrey = this.add.image(config.width - 105,50,"starSpriteGrey");
            this.starSpriteGrey = this.add.image(config.width - 170,50,"starSpriteGrey");
            this.survivorSprite = this.add.image(config.width - 295,180,"survivorSprite");
            this.textStyle =  {fill:"black"};
        }


        this.killerBgm = this.sound.add("killerBgm");
        if (gameSettings.headRoom.background == "killerAnimBG") {
            game.sound.stopAll();
            this.killerBgm.play();
          }

        
        this.elevatorBGM = this.sound.add("elevatorBGM");
        if (gameSettings.headRoom.background == "elevatorAnimBG") {
            game.sound.stopAll();
            this.elevatorBGM.play();
        }

        this.drugBGM = this.sound.add("drugBGM");
        if (gameSettings.headRoom.background == "drugAnimBG") {
            game.sound.stopAll();
            this.drugBGM.play();
        }

        this.fireBGM = this.sound.add("fireBGM");
        if (gameSettings.headRoom.background == "fireAnimBG") {
            game.sound.stopAll();
            this.fireBGM.play();
          }



        this.blurbs = new Object();
    }

    update() {
        if (gameSettings.startDeathScreen){
            if (this.timeScrolling % 100 == 0 && this.dialogueIndex < gameSettings.headRoom.starterDialogue.length){
                if (this.blurbs[this.dialogueIndex]){
                    this.blurbs[this.dialogueIndex].destroy();
                }
                this.blurbs[this.dialogueIndex] = this.add.text( locations.left, config.height - locations.top, gameSettings.headRoom.starterDialogue[this.dialogueIndex], this.textStyle);
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
