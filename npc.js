class npc {

    skin;
    dialogue;
    name;
    sentenceNum;

    constructor(name, skin, dialogue){//, context=null, width=gameSettings.playerSize, height=gameSettings.playerSize){
        this.name = name;
        this.skin = skin;
        this.dialogue = dialogue;
        this.sentenceNum = 0;
        //this.loadSpritesheet(context,width,height);
    }


    //TODO: Implement this
    /*
    loadSpritesheet(context, width=gameSettings.playerSize, height=gameSettings.playerSize){
        context.load.spritesheet(this.name, this.skin, {
            frameWidth: this.width,
            frameHeight: this.height
        });
   }*/
}