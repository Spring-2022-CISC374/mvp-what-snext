class Siren extends Phaser.Scene {
    constructor(){
        super("mainMenu");
        this.time.events.repeat(Phaser.Timer.SECOND*0.2,changeAlpha,this);

    }

changeAlpha(){
    if (this.background.alpha == 1.5){
        this.background.alpha = 0.5
    }
    this.background.alpha += 0.1;
}

}
//var siren = false;
    //if (this.input.mousePointer.isDown){
        //console.log("siren");
        //siren = true;
      //}
    //if (siren){
      //this.background.alpha-=0.1;
        //if(this.background.alpha==0){
          //this.background.alpha = 1.0;
        //}
    //}else{
      //this.background.alpha = 1.0;
    //}