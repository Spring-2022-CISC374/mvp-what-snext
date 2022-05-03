class textSprite {
    text;
    sprite;
    x;
    y;
    context;
    constructor(context,x,y,xSize,ySize,background){
        this.sprite = context.add.tileSprite(x,y,xSize,ySize,background)
            .setInteractive();
        this.sprite.depth = 1;
        this.sprite.visible = false;
        this.x = x;
        this.y = y;
        this.context = context;
    }

    addText(dialogue=undefined, textStyle={fill:"black"}) {
        if (this.text){
            this.text.destroy();
        }
        if (dialogue){
            this.sprite.visible = true;
            this.text = this.context.add.text(this.x,this.y,dialogue,textStyle);
            this.text.depth = 2;
        }else{
            this.sprite.visible = false;
        }
    }

    getVisibility(){
        return this.sprite.visible;
    }
}