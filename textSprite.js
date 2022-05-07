class textSprite {
    text;
    sprite;
    x; xSize;
    y; ySize;
    color;
    context;
    constructor(context,x,y,xSize,ySize,color=0x000000){

        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
        this.context = context;
        this.color = color;

        this.drawRect(color);

        this.sprite.depth = 1;
        this.sprite.visible = false;
    }

    addText(dialogue=undefined, textStyle={fill:"black"}) {
        //console.log(dialogue);
        //console.log(this.text);
        if (this.text){
            this.text.destroy();
        }
        if (dialogue){
            this.sprite.visible = true;
            this.text = this.context.add.text(this.x,this.y,dialogue).setStyle(textStyle);
            this.text.depth = 2;
        }else{
            this.sprite.visible = false;
        }
    }

    drawRect(color){
        if (this.sprite){
            this.sprite.destroy();
            console.log("lah");
        }

        this.sprite = this.context.add.graphics();
        this.sprite.fillStyle(0xFFFFFF);//color);
        this.sprite.fillRoundedRect(this.x - 50, this.y, this.xSize, this.ySize, 32);
        this.sprite.setInteractive(new Phaser.Geom.Rectangle(this.x - 50, this.y, this.xSize, this.ySize), Phaser.Geom.Rectangle.Contains)
            //.on('pointerdown', () => console.log("hahh"))
            /*
            .on('pointerover', () => this.text.setStyle({fill: '#f39c12'}))
            .on('pointerover', () => console.log("hi"))
            .on('pointerout', () => console.log("hi2"))
            .on('pointerout', () => this.text.setStyle({fill: color}));
*/
    }

}
/*
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

}*/