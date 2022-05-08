class LoadGame extends Phaser.Scene {

  city;

  constructor() {
    super("bootGame");
  }

  preload(){
    
    this.initStory();

    //load audio files
    this.load.audio("titleMusic", ["assets/sounds/titleMusic.mp3"]);
    this.load.audio("BGM", ["assets/sounds/BGM.mp3"]);

    //load background images
    this.load.image("killerAnimBG", "assets/images/killerAnim.png");
    this.load.image("eighthFloorBG", "assets/images/eighthFloor.png");
    this.load.image("sixthFloorBG", "assets/images/sixthFloor.png");
    this.load.image("fifthFloorBG", "assets/images/fifthFloor.png");
    this.load.image("titleScreenBG", "assets/images/titleScreen.png"); 
    this.load.image("friendRoomBG", "assets/images/friendRoom.png");
    this.load.image("tenthFloorBG", "assets/images/tenthFloor.png");
    this.load.image("elevatorBG", "assets/images/insideElevator.png");
    this.load.image("cityBG", "assets/images/cityBackground.png");
    this.load.image("stairsAndElevatorBG", "assets/images/stairsElevator.png");
    this.load.image("stairsBG", "assets/images/stairs.png");
    this.load.image("whiteSquare", "assets/images/whiteSquare.png"); 
    this.load.image("title", "assets/images/title.png");

    //load in charactors here

      //load player
    this.load.spritesheet("player_right", "assets/spritesheets/youSprite/legsTogetherFacingRight.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("player_left", "assets/spritesheets/youSprite/legsTogetherFacingLeft.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("player_left_left", "assets/spritesheets/youSprite/leftLegFrontFacingLeft.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("player_left_right", "assets/spritesheets/youSprite/leftLegFrontFacingRight.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });    
    this.load.spritesheet("player_right_left", "assets/spritesheets/youSprite/rightLegFrontFacingLeft.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("player_right_right", "assets/spritesheets/youSprite/rightLegFrontFacingRight.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    
    //load creep
    this.load.spritesheet("creep_right", "assets/spritesheets/creepSprite/legsTogetherFacingRight.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("creep_left", "assets/spritesheets/creepSprite/legsTogetherFacingLeft.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("creep_left_left", "assets/spritesheets/creepSprite/leftLegFrontFacingLeft.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("creep_left_right", "assets/spritesheets/creepSprite/leftLegFrontFacingRight.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });    
    this.load.spritesheet("creep_right_left", "assets/spritesheets/creepSprite/rightLegFrontFacingLeft.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("creep_right_right", "assets/spritesheets/creepSprite/rightLegFrontFacingRight.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });


    this.load.spritesheet("whiteSquareSprite", "assets/spritesheets/whiteSquareS.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
/*
    this.load.spritesheet("phone", "assets/spritesheets/phoneSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); */
     this.load.spritesheet("concernedMom", "assets/spritesheets/momSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
    this.load.spritesheet("creep", "assets/spritesheets/creep2Sprite.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("creepyDude2", "assets/spritesheets/creep2Sprite.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    });
    this.load.spritesheet("car", "assets/spritesheets/carSprite.png",{
      frameWidth: gameSettings.playerSize*5,
      frameHeight: gameSettings.playerSize*5
    });
    this.load.spritesheet("boy", "assets/spritesheets/boySprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("click", "assets/spritesheets/clickSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });    
    this.load.spritesheet("people", "assets/spritesheets/peopleSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });    
    this.load.spritesheet("baby", "assets/spritesheets/babySprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
    this.load.spritesheet("babyAgain", "assets/spritesheets/babySprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
    this.load.spritesheet("babyStanding", "assets/spritesheets/baby2Sprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
    this.load.spritesheet("pettyMom", "assets/spritesheets/pettyMomSprite.png",{
      frameWidth: gameSettings.playerSize*2,
      frameHeight: gameSettings.playerSize*2
    }); 
    this.load.spritesheet("helplessMan", "assets/spritesheets/helplessManSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
    this.load.spritesheet("helplessManAgain", "assets/spritesheets/helplessManSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
    this.load.spritesheet("smoke", "assets/spritesheets/smokeSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
    this.load.spritesheet("speech", "assets/spritesheets/speechSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("speechAgain", "assets/spritesheets/speechSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("killerAnim", "assets/spritesheets/killerAnimSprite.png",{
      frameWidth: gameSettings.playerSize*8,
      frameHeight: gameSettings.playerSize*8
    });
  }   


  initStory (){
    //Initializes story
      var people = new npc("people", "assets/spritesheets/peopleSprite.png", ["I could try to capture their attention, so he leaves"]);
      var concernedMom = new npc("concernedMom", "assets/spritesheets/momSprite.png", ['CONCERNED MOM: I charged your phone, call me if you need anything.', "YOU: Ill be fine mom.",'CONCERNED MOM: Just be careful, Honey.','CONCERNED MOM: Remember to use your arrow keys to move.', 'YOU: I know how to cross the street, Mom.', 'CONCERNED MOM: I know, but its your first sleepover.','CONCERNED MOM: I want you to be prepared.', 'YOU: Dont worry, Im not a little kid anymore.', 'CONCERNED MOM: Just promise me that you will click on things if you ever need help.', 'YOU: I promise.', 'CONCERNED MOM: You can even click on people!!', 'YOU: Bye Mom!!', 'Its justa sleepover','What could go wrong?']);
      var creepyDude2 = new npc("creep","assets/spritesheets/creep2Sprite.png",['Who is this guy?', "Why is he so close?", "He's been following me ever since I left Mom", "I better get out quick"],100);
      var creepyDude = new npc("creep","assets/spritesheets/creep2Sprite.png",["He's still here, this is getting weird.", "What should I do? \n**Start yelling. \n**Call Mom. \n**Ignore.",
                            ["YOU: WHY ARE YOU FOLLOWING ME?","RANDOM GUY: Dude I think that kid is being harrassed.","OTHER RANDOM GUY: Maybe we should keep an eye on him."],
                            ["CONCERNED MOM: Hi Sweetie, is everything alright?","CONCERNED MOM: Do you want me to come get you?","YOU: No, I'm almost at Bestie's house.","CONCERNED MOM: Okay, I'll stay on the phone with you, until you get there then."],
                            ["I'm sure he just lives in the building.&&&death&creep","Screaming for help would be embarrassing anyways."]],100);
      var boy = new npc("boy","assets/spritesheets/boySprite.png", ["BESTIE: You made it!!","YOU: It was hard but I'm here in one piece.","BESTIE: Of course you did, we have the best security out there.","BESTIE: Absolutely nothing can go wrong.","FIRE ALARM: BEEP BEEP BEEEEEEEEP BEEPERS BEEPING BEP!!", "BESTIE: Well then...","BESTIE: Gotta blast!","&&&removeNPCs"]);
      var car = new npc();
      var baby = new npc("baby","assets/spritesheets/babySprite.png",["BABY: Goo goo ga ga \n**Talk to baby. \n**Ignore baby.",                       
        ["YOU: Are you lost?", "Yes!","Wow this baby can talk??", "YOU: Where is your mom?", "BABY: Yes!", "YOU: Is yes the only word you can say?","BABY: Yes!","Okay maybe this baby can't talk..."],
        [""]]);
      var pettyMom = new npc("pettyMom","assets/spritesheets/pettyMomSprite.png", ["PETTY MOM: Thank you so much for bringing Baby to me!", "PETTY MOM: I didn't think he could even climb up to the tenth floor by himself.", "PETTY MOM: How did that baby even climb 2 up two whole flights of stairs??","YOU: Yep that's one strange baby.", "PETTY MOM: Excuse me??", "YOU: ...","PETTY MOM: Well climbing 2 flights up is better than 3 flights down.", "PETTY MOM: That's where the real danger is after all.", "YOU: Excuse me??","PETTY MOM: Oh look at the time...", "PETTY MOM: I've got to go get my weird baby out of this burning building", "BABY: Bye bye!"]);
      var helplessManAgain = new npc("helplessManAgain","assets/spritesheets/helplessManSprite.png", []);  
      var helplessMan = new npc("helplessMan","assets/spritesheets/helplessManSprite.png", ["HELPLESS MAN: Hey, you!","HELPLESS MAN: Me?","HELPLESS MAN: Where did everyone go?", "YOU: Uh, the building is on fire, Sir.", "HELPLESS MAN: Oh...", "HELPLESS MAN: Well this isn't good for my business.", "YOU: Business?", "HELPLESS MAN: Yeah, I sell candy to children.","That's concerning", "HELPLESS MAN: But now my customers are gone!", "HELPLESS MAN: I hope those children in apartment room 68 will come back.", "HELPLESS MAN: With a big family of 5 their parents were always working.","HELPLESS MAN: So the 3 children were always left with their babysitter.", "YOU: So you would buy candy and sell it to them?", "How nice", "HELPLESS MAN: Nope, I make the candy myself.", "HELPLESS MAN: You can tell it's my candy by the green wrappers.", "HELPLESS MAN: Want to try some, it's my newest recipe? \n**Eat it. \n**Don't eat it.", 
        [" "],
        ["YOU: No thanks.","HELPLESS MAN: Suit yourself"]]);
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
      ["Leave building - end"]]);

      var speech = new npc("speech","assets/spritesheets/speechSprite.png",["Where'd Bestie go?","Note to self, take applications for a new bestie", "Now, I need to get out of this building"]);
      var speechAgain = new npc("speechAgain","assets/spritesheets/speechSprite.png",["Hmm, stairs or elevator?"]);
      var killerAnim = new npc("killerAnim","assets/spritesheets/killerAnimSprite.png",[]);

      var fifthFloor = new Room("fifthFloorBG",{},{smoke:[locations.left, locations.midSlightLower, smoke]});
      var sixthFloor = new Room("sixthFloorBG",{fifthFloor:[locations.left, locations.midHeight, fifthFloor]},{ helplessMan:[locations.left, locations.lowHeight, helplessMan], helplessManAgain:[locations.left, locations.lowHeight, helplessManAgain]});
      var eighthFloor = new Room("eighthFloorBG",{sixthFloor:[locations.midWidthLeft, locations.midHeight, sixthFloor]},{ pettyMom:[locations.furtherRight, locations.lowHeight,  pettyMom], babyStanding:[locations.furtherRight, locations.moreLowerHeight,  babyStanding]});
      var stairs = new Room("stairsBG",{eighthFloor:[locations.left, locations.midHeight, eighthFloor]},{ baby:[locations.furtherRight, locations.lowHeight,  baby]});
      var elevator2 = new Room("elevatorBG",{},{});
      var stairsAndElevator = new Room("stairsAndElevatorBG",{stairs:[locations.left, locations.midHeight, stairs], elevator2:[locations.right, locations.midHeight, elevator2]}, {speechAgain:[locations.lessRight, locations.lessTop, speechAgain]});
      var tenthFloor2 = new Room("tenthFloorBG",{stairsAndElevator:[locations.right, locations.midHeight, stairsAndElevator]},{speech:[locations.lessRight, locations.lessTop, speech]});
      var friendRoom = new Room("friendRoomBG",{tenthFloor2:[locations.right, locations.midHeight, tenthFloor2]},{ boy:[locations.left, locations.lowHeight, boy]});
      var killerRoom = new Room("killerAnimBG",{},{killerAnim:[locations.midWidthLeft, locations.midHeight, killerAnim]});
      var tenthFloor = new Room("tenthFloorBG",{friendRoom:[locations.left, locations.midHeight, friendRoom], killerRoom:[locations.furtherRight, locations.midHeight, killerRoom]},{creep:[locations.furtherRight,locations.midLowerHeight, creepyDude], people:[locations.midWidthRight,locations.midHeight, people]});
      var elevator = new Room("elevatorBG",{tenthFloor:[locations.left, locations.midHeight, tenthFloor]},{creep:[locations.midWidthSlightRight,locations.lowerHeight, creepyDude2]});
      this.city = new Room("cityBG"
        ,{elevator:[locations.left, locations.midHeight, elevator]}
        ,{concernedMom:[locations.niceWidth, locations.lowHeight,  concernedMom],car:[locations.midWidth, locations.lowHeight,  car]}
        ,["I should talk to mom before I leave or she'll get worried"],true);
      //var characterSelect = new Room("selectionBG",{city:[locations.midWidth,locations.lowHeight, city]},{girl:[locations.left, locations.midHeight, girl],boy:[locations.left, locations.midHeight, boy]});

      gameSettings.headRoom = this.city;
      gameSettings.changeRoom = true;

  }



  create() {

    this.add.text(20, 20, "Loading game...");
    //add death gifs and animations here
    this.scene.start("mainMenu");
    //this.scene.start("deathScreen");
    
  }
}
