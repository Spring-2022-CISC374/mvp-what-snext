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
  lessRight: config.width - config.width / 8,
  furtherRight: config.width  - config.width / 15,
  midHeight: config.height / 2,
  midSlightLower: config.height / 1.7,
  midLowerHeight: config.height / 1.5,
  midUpperHeight: config.height / 3.5,
  lessLowHeight: config.height / 1.25,
  lowHeight: config.height / 1.2,
  lowerHeight: config.height / 1.15,
  moreLowerHeight: config.height / 1.10,
  lowestHeight: config.height / 1,
  midWidth: config.width / 2,
  midWidthLeft: config.width / 2.05,
  midWidthSlightRight: config.width / 1.95,
  midWidthRight: config.width / 1.45,
  niceWidth: config.width - (config.width / 5),
  top: config.height / 10,
  lessTop: config.height / 9
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
var boy = new npc("boy","assets/spritesheets/boySprite.png", ["BESTIE: You made it!!","YOU: It was hard but I'm here in one piece.","BESTIE: Of course you did, we have the best security out there.","BESTIE: Absolutely nothing can go wrong.","FIRE ALARM: BEEP BEEP BEEEEEEEEP BEEPERS BEEPING BEP!!", "BESTIE: Well then...","BESTIE: Gotta blast!"]);
var car = new npc();
var baby = new npc("baby","assets/spritesheets/babySprite.png",["BABY: Goo goo ga ga \n**Talk to baby. \n**Ignore baby.",                       
  ["YOU: Are you lost?", "Yes!","Wow this baby can talk??", "YOU: Where is your mom?", "BABY: Yes!", "YOU: Is yes the only word you can say?","BABY: Yes!","Okay maybe this baby can't talk..."],
  [""]],100);
var babyAgain = new npc("babyAgain","assets/spritesheets/babySprite.png", []);  
var pettyMom = new npc("pettyMom","assets/spritesheets/pettyMomSprite.png", ["PETTY MOM: Thank you so much for bringing Baby to me!", "PETTY MOM: I didn't think he could even climb up to the tenth floor by himself.", "PETTY MOM: How did that baby even climb 2 up two whole flights of stairs??","YOU: Yep that's one strange baby.", "PETTY MOM: Excuse me??", "YOU: ...","PETTY MOM: Well climbing 2 flights up is better than 3 flights down.", "PETTY MOM: That's where the real danger is after all.", "YOU: Excuse me??","PETTY MOM: Oh look at the time...", "PETTY MOM: I've got to go get my weird baby out of this burning building", "BABY: Bye bye!"]);
var helplessManAgain = new npc("helplessManAgain","assets/spritesheets/helplessManSprite.png", []);  
var helplessMan = new npc("helplessMan","assets/spritesheets/helplessManSprite.png", ["HELPLESS MAN: Hey, you!","HELPLESS MAN: Me?","HELPLESS MAN: Where did everyone go?", "YOU: Uh, the building is on fire, Sir.", "HELPLESS MAN: Oh...", "HELPLESS MAN: Well this isn't good for my business.", "YOU: Business?", "HELPLESS MAN: Yeah, I sell candy to children.","That's concerning", "HELPLESS MAN: But now my customers are gone!", "HELPLESS MAN: I hope those children in apartment room 68 will come back.", "HELPLESS MAN: With a big family of 5 their parents were always working.","HELPLESS MAN: So the 3 children were always left with their babysitter.", "YOU: So you would buy candy and sell it to them?", "How nice", "HELPLESS MAN: Nope, I make the candy myself.", "HELPLESS MAN: You can tell it's my candy by the green wrappers.", "HELPLESS MAN: Want to try some, it's my newest recipe? \n**Eat it. \n**Don't eat it.", 
  [" "],
  ["YOU: No thanks.","HELPLESS MAN: Suit yourself"]],100);
var babyStanding = new npc("babyStanding","assets/spritesheets/baby2Sprite.png",[]);

var smoke = new npc("smoke","assets/spritesheets/smokeSprite.png",["What should I do? \n**Go inside. \n**Call 911. \n**Leave.", 
["DEATH"],
["RING...RING...RING...","POLICE OFFICER: 911, what’s your emergency?", "YOU: Ahh I’m too scared to speak","What happened \n** YOU: There’s a fire! \n**YOU: YOU: People are dying! \n**YOU: RED ORANGE! BOOM, ROAR!",
["POLICE OFFICER: Okay", "POLICE OFFICER: What is the address of your emergency??", "YOU: Oh I know this!!", "YOU: And Bestie called me weird for memorizing his address","YOU: Street ---- --- Apartment --- Floor number... \**n 7 \**n 6 \**n 5",
["incorrect","POLICE OFFICER: Okay, and how many people are in the room?", "YOU: There are... \n** 5 \n** 4 \n** 3",
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["correct","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
],
["incorrect","POLICE OFFICER: Okay, and how many people are in the room?", "YOU: There are... \n** 5 \n** 4 \n** 3",
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["correct","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
],
["correct","POLICE OFFICER: Okay, and how many people are in the room?", "YOU: There are... \n** 5 \n** 4 \n** 3",
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["correct","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
],],

["POLICE OFFICER: Do you know why people are dying?", "YOU: Because their room is on fire!", "POLICE OFFICER: What is the address of your emergency??", "YOU: Oh I know this!!", "YOU: And Bestie called me weird for memorizing his address","YOU: Street --- ---- Apartment --- Floor number... \**n 7 \**n 6 \**n 5",
["incorrect","POLICE OFFICER: Okay, and how many people are in the room?", "YOU: There are... \n** 5 \n** 4 \n** 3",
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["correct","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
],
["incorrect","POLICE OFFICER: Okay, and how many people are in the room?", "YOU: There are... \n** 5 \n** 4 \n** 3",
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["correct","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
],
["correct","POLICE OFFICER: Okay, and how many people are in the room?", "YOU: There are... \n** 5 \n** 4 \n** 3",

["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["correct","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
],],

["POLICE OFFICER: Please try to calm down and tell me the situation??", "YOU: FIRE!!", "POLICE OFFICER: What is the address of your emergency??", "YOU: Oh I know this!!", "YOU: And Bestie called me weird for memorizing his address","YOU: Street --- --- Apartment --- Floor number... \**n 7 \**n 6 \**n 5",
["incorrect","POLICE OFFICER: Okay, and how many people are in the room?", "YOU: There are... \n** 5 \n** 4 \n** 3",
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["correct","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
],

["incorrect","POLICE OFFICER: Okay, and how many people are in the room?", "YOU: There are... \n** 5 \n** 4 \n** 3",
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["correct","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
],

["correct","POLICE OFFICER: Okay, and how many people are in the room?", "YOU: There are... \n** 5 \n** 4 \n** 3",
["incorrect","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
["correct","POLICE OFFICER: Alright, we are sending the firemen over, now!"],
],],
],
["Leave building - end"]],100);










var speech = new npc("speech","assets/spritesheets/speechSprite.png",["Where'd Bestie go?","Note to self, take applications for a new bestie", "Now, I need to get out of this building"]);
var speechAgain = new npc("speechAgain","assets/spritesheets/speechSprite.png",["Hmm, stairs or elevator?"]);
var killerAnim = new npc("killerAnim","assets/spritesheets/killerAnimSprite.png",[]);

var fifthFloor = new Room("fifthFloorBG",{},{phone:[locations.furtherRight, locations.top,this.phone], smoke:[locations.left, locations.midSlightLower,this.smoke]});
var sixthFloor = new Room("sixthFloorBG",{fifthFloor:[locations.left, locations.midHeight,this.fifthFloor]},{phone:[locations.furtherRight, locations.top,this.phone], helplessMan:[locations.left, locations.lowHeight,this.helplessMan], helplessManAgain:[locations.left, locations.lowHeight,this.helplessManAgain]});
var eighthFloor = new Room("eighthFloorBG",{sixthFloor:[locations.midWidthLeft, locations.midHeight,this.sixthFloor]},{phone:[locations.furtherRight, locations.top,this.phone], pettyMom:[locations.furtherRight, locations.lowHeight, this.pettyMom], babyStanding:[locations.furtherRight, locations.moreLowerHeight, this.babyStanding]});
var stairs = new Room("stairsBG",{eighthFloor:[locations.left, locations.midHeight,this.eighthFloor]},{phone:[locations.furtherRight, locations.top,this.phone], baby:[locations.furtherRight, locations.lowHeight, this.baby], babyAgain:[locations.right, locations.lowHeight, this.babyAgain]});
var elevator2 = new Room("elevatorBG",{},{phone:[locations.furtherRight, locations.top,this.phone]});
var stairsAndElevator = new Room("stairsAndElevatorBG",{stairs:[locations.left, locations.midHeight,this.stairs], elevator2:[locations.right, locations.midHeight,this.elevator2]}, {phone:[locations.furtherRight, locations.top,this.phone],speechAgain:[locations.lessRight, locations.lessTop,this.speechAgain]});
var tenthFloor2 = new Room("tenthFloorBG",{stairsAndElevator:[locations.right, locations.midHeight,this.stairsAndElevator]},{phone:[locations.furtherRight, locations.top,this.phone],speech:[locations.lessRight, locations.lessTop,this.speech]});
var friendRoom = new Room("friendRoomBG",{tenthFloor2:[locations.right, locations.midHeight,this.tenthFloor2]},{phone:[locations.furtherRight, locations.top,this.phone], boy:[locations.left, locations.lowHeight,this.boy]});
var killerRoom = new Room("killerAnimBG",{},{killerAnim:[locations.midWidthLeft, locations.midHeight,this.killerAnim]});
var tenthFloor = new Room("tenthFloorBG",{friendRoom:[locations.left, locations.midHeight,this.friendRoom], killerRoom:[locations.furtherRight, locations.midHeight,this.killerRoom]},{creep:[locations.furtherRight,locations.midLowerHeight,this.creepyDude], people:[locations.midWidthRight,locations.midHeight,this.people],phone:[locations.furtherRight, locations.top,this.phone]});
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
    dialogue: "I should talk to mom before I leave or she'll get worried", 
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
