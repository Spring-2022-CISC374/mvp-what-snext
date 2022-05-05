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
        debug: true
    }
  }
}
config.width = 960;
config.height = 640;
//TODO: make scalable

var locations = {
  left: config.width / 10,
  right: config.width - config.width / 10,
  furtherRight: config.width  - config.width / 15,
  midHeight: config.height / 2,
  midLowerHeight: config.height / 1.5,
  midUpperHeight: config.height / 3.5,
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


//Initializes story
var phone = new npc("phone", "assets/spritesheets/phoneSprite.png", ["Contacts: \n**Call No One \n**Call Mom. \n**Call 911.","a1","a2","a3","blah"]);
var people = new npc("people", "assets/spritesheets/peopleSprite.png", ["I could try to capture their attention, so he leaves"]);
var concernedMom = new npc("concernedMom", "assets/spritesheets/momSprite.png", ['CONCERNED MOM: I charged your phone, call me if you need anything.', "YOU: Ill be fine mom.",'CONCERNED MOM: Just be careful, Honey.','CONCERNED MOM: Remember to use your arrow keys to move.', 'YOU: I know how to cross the street, Mom.', 'CONCERNED MOM: I know, but its your first sleepover.','CONCERNED MOM: I want you to be prepared.', 'YOU: Dont worry, Im not a little kid anymore.', 'CONCERNED MOM: Just promise me that you will click on things if you ever need help.', 'YOU: I promise.', 'CONCERNED MOM: You can even click on people!!', 'YOU: Bye Mom!!', 'Its justa sleepover','What could go wrong?']);
var creepyDude2 = new npc("creep","assets/spritesheets/creep2Sprite.png",['Who is this guy?', "Why is he so close?", "He's been following me ever since I left Mom", "I better get out quick"],100);
var creepyDude = new npc("creep","assets/spritesheets/creep2Sprite.png",["He's still here, this is getting weird.", "What should I do? \n**Start yelling. \n**Call Mom. \n**Ignore.",
                      ["YOU: WHY ARE YOU FOLLOWING ME?","RANDOM GUY: Dude I think that kid is being harrassed.","OTHER RANDOM GUY: Maybe we should keep an eye on him."],
                      ["CONCERNED MOM: Hi Sweetie, is everything alright?","CONCERNED MOM: Do you want me to come get you?","YOU: No, I'm almost at Bestie's house.","CONCERNED MOM: Okay, I'll stay on the phone with you, until you get there then."],
                      ["I'm sure he just lives in the building.","Screaming for help would be embarrassing anyways."]],100);
var girl = new npc("girl","assets/spritesheets/girlSprite.png", []);
var boy = new npc("boy","assets/spritesheets/boySprite.png", ["BESTIE: You made it!!","YOU: It was hard but I'm here in one piece.","BESTIE: Of course you did, we have the best security out there.","BESTIE: Absolutely nothing can go wrong.","FIRE ALARM: BEEP BEEP BEEEEEEEEP BEEPERS BEEPING BEP!!"]);
var car = new npc();

var stairs = new Room("stairsBG",{},{phone:[locations.furtherRight, locations.top,this.phone]});
var elevator2 = new Room("elevatorBG",{},{phone:[locations.furtherRight, locations.top,this.phone]});
var stairsAndElevator = new Room("stairsAndElevatorBG",{stairs:[locations.midWidthLeft, locations.midHeight,this.stairs], elevator2:[locations.right, locations.midHeight,this.elevator2]}, {phone:[locations.furtherRight, locations.top,this.phone]});
var tenthFloor2 = new Room("tenthFloorBG",{stairsAndElevator:[locations.right, locations.midHeight,this.stairsAndElevator]},{phone:[locations.furtherRight, locations.top,this.phone]});
var friendRoom = new Room("friendRoomBG",{tenthFloor2:[locations.right, locations.midHeight,this.tenthFloor2]},{phone:[locations.furtherRight, locations.top,this.phone], boy:[locations.left, locations.lowHeight,this.boy]});
var tenthFloor = new Room("tenthFloorBG",{friendRoom:[locations.left, locations.midHeight,this.friendRoom]},{creep:[locations.furtherRight,locations.midLowerHeight,this.creepyDude], people:[locations.midWidthRight,locations.midHeight,this.people],phone:[locations.furtherRight, locations.top,this.phone]});
var elevator = new Room("elevatorBG",{tenthFloor:[locations.left, locations.midHeight,this.tenthFloor]},{creep:[locations.midWidthSlightRight,locations.lowerHeight,this.creepyDude2],phone:[locations.furtherRight, locations.top,this.phone]});
var city = new Room("cityBG"
  ,{elevator:[locations.left, locations.midHeight,this.elevator]}
  ,{concernedMom:[locations.niceWidth, locations.lowHeight, this.concernedMom],car:[locations.midWidth, locations.lowHeight, this.car],phone:[locations.furtherRight, locations.top,this.phone]});
//var characterSelect = new Room("selectionBG",{city:[locations.midWidth,locations.lowHeight,this.city]},{girl:[locations.left, locations.midHeight,this.girl],boy:[locations.left, locations.midHeight,this.boy]});


var gameSettings = {
  //All numbers here
    playerSpeed: 200,
    playerSize: config.width / 10,
    headRoom: undefined,
    defaultHeadRoom: city,
    dialogue: "I should talk to mom, she always helps me get my bearings", 
    changeRoom: false,
    activeNpc: undefined,
    txtBox: {
      dialogueBox: undefined,
      answer1: undefined,
      answer2: undefined,
      answer3: undefined
    }
}

var game = new Phaser.Game(config);
