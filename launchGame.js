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

var locations = {
  left: config.width / 10,
  right: config.width - config.width / 10,
  midHeight: config.height / 2,
  midLowerHeight: config.height / 1.5,
  lowHeight: config.height / 1.2,
  lowerHeight: config.height / 1.1,
  midWidth: config.width / 2,
  midWidthLeft: config.width / 2.05,
  midWidthRight: config.width / 1.95,
  niceWidth: config.width - (config.width / 5),
  top: config.height / 10
}

var phone = new npc("phone", "assets/spritesheets/phoneSprite.png", []);
var crowd1 = new npc("crowd1", "assets/spritesheets/crowd1Sprite.png", ["I could try to capture their attention, so he leaves"]);
var crowd2 = new npc("crowd2", "assets/spritesheets/crowd2Sprite.png", ["I could try to capture their attention, so he leaves"]);
var crowd3 = new npc("crowd3", "assets/spritesheets/crowd3Sprite.png", ["I could try to capture their attention, so he leaves"]);
var car = new npc("car", "assets/spritesheets/carSprite.png", []);
var concernedMom = new npc("concernedMom", "assets/spritesheets/momSprite.png", ['CONCERNED MOM: I charged your phone, remember to call me if you need anything.', "YOU: Ill be fine mom",'CONCERNED MOM: I also packed your backpack with everything I thought you might need.', 'Click on an item and then click the button to use it.', 'Why is there a brick in here?!', 'CONCERNED MOM: I know I may have gone overboard, but its your first sleepover and I just want you to be prepared.', 'YOU: Dont worry, Im not a little kid anymore.']);
var creepyDude2 = new npc("creepyDude","assets/spritesheets/creep2Sprite.png",['Who is this guy?', "Why is he so close?", "He's been following me ever since I left Mom", "I better get out quick"]);
var creepyDude = new npc("creepyDude2","assets/spritesheets/creep2Sprite.png",["He's still here, this is getting weird.", "What should I do? \n**Go over to crowd and start yelling \n**call Mom \n**pretend not to notice and walk to bestie's house"]);


var stairs = new Room("stairsBG",{},{});
var elevator2 = new Room("elevatorBG",{},{});
var stairsAndElevator = new Room("stairsAndElevatorBG",{stairs:[locations.left, locations.midHeight,this.stairs], elevator2:[locations.right, locations.midHeight,this.elevator2]});
var tenthFloor2 = new Room("tenthFloorBG",{stairsAndElevator:[locations.right, locations.midHeight,this.stairsAndElevator]});
var friendRoom = new Room("friendRoomBG",{tenthFloor2:[locations.right, locations.midHeight,this.tenthFloor2]});
var tenthFloor = new Room("tenthFloorBG",{friendRoom:[locations.left, locations.midHeight,this.friendRoom]},{creepyDude:[locations.right,locations.midLowerHeight,this.creepyDude]}, {crowd1:[locations.midWidth,locations.midHeight,this.crowd1]}, {crowd2:[locations.midWidthRight,locations.midHeight,this.crowd2]}, {crowd3:[locations.midWidthLeft,locations.midHeight,this.crowd3]});
var elevator = new Room("elevatorBG",{tenthFloor:[locations.left, locations.midHeight,this.tenthFloor]},{creepyDude2:[locations.midWidth,locations.lowHeight,this.creepyDude2]});
var city = new Room("cityBG"
  ,{elevator:[locations.left, locations.midHeight,this.elevator]}
  ,{concernedMom:[locations.niceWidth, locations.lowHeight, this.concernedMom],car:[locations.midWidth, locations.lowerHeight, this.car]});

var gameSettings = {
  //All numbers here
    playerSpeed: 200,
    playerSize: window.innerWidth / 10,
    headRoom: city,
    showDialogue: false,
    dialogue: "",
    changeRoom: true
}

var game = new Phaser.Game(config);
