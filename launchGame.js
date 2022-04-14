var config = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x10AA44,
  scene: [LoadGame,TraverseMap,MainMenu,Align],
  pixelArt: true,
  // 1.1 set the physics to arcade
  physics: {
    default: "arcade",
    arcade:{
        debug: false
    }
  }
}
config.width = 960;
config.height = 640;
//if (config.width > config.height){
 // config.width = config.height;
//} else {
//  config.height = config.width;
//}
//TODO: Its a square, width and height are the same

var locations = {
  left: config.width / 10,
  right: config.width - config.width / 10,
  furtherRight: config.width  - config.width / 15,
  midHeight: config.height / 2,
  midLowerHeight: config.height / 1.5,
  lowHeight: config.height / 1.2,
  lowerHeight: config.height / 1.15,
  lowestHeight: config.height / 1,
  midWidth: config.width / 2,
  midWidthLeft: config.width / 2.05,
  midWidthSlightRight: config.width / 1.95,
  midWidthRight: config.width / 1.45,
  niceWidth: config.width - (config.width / 5),
  top: config.height / 10
}

var phone = new npc("phone", "assets/spritesheets/phoneSprite.png", []);
var people = new npc("people", "assets/spritesheets/peopleSprite.png", ["I could try to capture their attention, so he leaves"]);
var concernedMom = new npc("concernedMom", "assets/spritesheets/momSprite.png", ['CONCERNED MOM: I charged your phone, call me if you need anything.', "YOU: Ill be fine mom.",'CONCERNED MOM: Just be careful, Honey.','CONCERNED MOM: Remember to use your arrow keys to move.', 'YOU: I know how to cross the street, Mom.', 'CONCERNED MOM: I know, but its your first sleepover.','CONCERNED MOM: I want you to be prepared.', 'YOU: Dont worry, Im not a little kid anymore.', 'CONCERNED MOM: Just promise me that you will click on things if you ever need help.', 'YOU: I promise.', 'CONCERNED MOM: You can even click on people!!', 'YOU: Bye Mom!!']);
var creepyDude2 = new npc("creepyDude","assets/spritesheets/creep2Sprite.png",['Who is this guy?', "Why is he so close?", "He's been following me ever since I left Mom", "I better get out quick"]);
var creepyDude = new npc("creepyDude2","assets/spritesheets/creep2Sprite.png",["He's still here, this is getting weird.", "What should I do? \n\n**-> Go over to crowd and start yelling. \n**-> Call Mom. \n**-> Pretend not to notice and walk to bestie's house."]);
var girl = new npc("girl","assets/spritesheets/girlSprite.png", []);
var boy = new npc("boy","assets/spritesheets/boySprite.png", []);

var stairs = new Room("stairsBG",{},{phone:[locations.furtherRight, locations.top,this.phone]});
var elevator2 = new Room("elevatorBG",{},{phone:[locations.furtherRight, locations.top,this.phone]});
var stairsAndElevator = new Room("stairsAndElevatorBG",{stairs:[locations.midWidthLeft, locations.midHeight,this.stairs], elevator2:[locations.right, locations.midHeight,this.elevator2]}, {phone:[locations.furtherRight, locations.top,this.phone]});
var tenthFloor2 = new Room("tenthFloorBG",{stairsAndElevator:[locations.right, locations.midHeight,this.stairsAndElevator]},{phone:[locations.furtherRight, locations.top,this.phone]});
var friendRoom = new Room("friendRoomBG",{tenthFloor2:[locations.right, locations.midHeight,this.tenthFloor2]},{phone:[locations.furtherRight, locations.top,this.phone], boy:[locations.left, locations.lowHeight,this.boy]});
var tenthFloor = new Room("tenthFloorBG",{friendRoom:[locations.left, locations.midHeight,this.friendRoom]},{creepyDude:[locations.furtherRight,locations.midLowerHeight,this.creepyDude], people:[locations.midWidthRight,locations.midHeight,this.people],phone:[locations.furtherRight, locations.top,this.phone]});
var elevator = new Room("elevatorBG",{tenthFloor:[locations.left, locations.midHeight,this.tenthFloor]},{creepyDude2:[locations.midWidthSlightRight,locations.lowerHeight,this.creepyDude2],phone:[locations.furtherRight, locations.top,this.phone]});
var city = new Room("cityBG"
  ,{elevator:[locations.left, locations.midHeight,this.elevator]}
  ,{concernedMom:[locations.niceWidth, locations.lowHeight, this.concernedMom],car:[locations.midWidth, locations.lowHeight, this.car],phone:[locations.furtherRight, locations.top,this.phone]});
//var characterSelect = new Room("selectionBG",{city:[locations.midWidth,locations.lowHeight,this.city]},{girl:[locations.left, locations.midHeight,this.girl],boy:[locations.left, locations.midHeight,this.boy]});








var gameSettings = {
  //All numbers here
    playerSpeed: 200,
    playerSize: config.width / 10,
    headRoom: city,
    showDialogue: false, //TODO: switch this out for visible if possible
    dialogue: "", //TODO: is this neccesary?
    changeRoom: true
}

var game = new Phaser.Game(config);
