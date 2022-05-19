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
    this.load.audio("killerBgm", ["assets/sounds/killerBgm.mp3"]);
    this.load.audio("drugBGM", ["assets/sounds/drugBGM.mp3"]);
    this.load.audio("fireBGM", ["assets/sounds/fireBGM.mp3"]);
    this.load.audio("elevatorBGM", ["assets/sounds/elevatorBGM.mp3"]);
    this.load.audio("alarmBGM", ["assets/sounds/alarmBGM.mp3"]);

    //load background images
    this.load.image("drugAnimBG", "assets/images/drugAnim.png");
    this.load.image("elevatorAnimBG", "assets/images/elevatorAnim.png");
    this.load.image("fireAnimBG", "assets/images/fireAnim.png");
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
    this.load.image("selectionBG", "assets/images/selectRoom.png");
    this.load.image("endScreenHero", "assets/images/endScreenHero.png");
    this.load.image("heroSprite", "assets/images/heroSprite.png");
    this.load.image("sidekickSprite", "assets/images/sidekickSprite.png");
    this.load.image("allySprite", "assets/images/allySprite.png");
    this.load.image("survivorSprite", "assets/images/survivorSprite.png");
    this.load.image("endScreenSidekick", "assets/images/endScreenSidekick.png");
    this.load.image("endScreenAlly", "assets/images/endScreenAlly.png");
    this.load.image("endScreenSurvivor", "assets/images/endScreenSurvivor.png");
    this.load.image("starSprite", "assets/images/starSprite.png");
    this.load.image("starSpriteGrey", "assets/images/starSpriteGrey.png");

    //load in charactors here

    //load player
    this.loadMovableCharacters('creep',2);
    this.loadMovableCharacters('boy1');
    this.loadMovableCharacters('boy2');
    this.loadMovableCharacters('boy3');
    this.loadMovableCharacters('boy4');
    this.loadMovableCharacters('girl1');
    this.loadMovableCharacters('girl2');
    this.loadMovableCharacters('girl3');
    this.loadMovableCharacters('girl4');
    this.loadMovableCharacters('girl5');

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
    this.load.spritesheet("babyStanding", "assets/spritesheets/baby2Sprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
    this.load.spritesheet("pettyMom", "assets/spritesheets/pettyMomSprite.png",{
      frameWidth: gameSettings.playerSize*3,
      frameHeight: gameSettings.playerSize*3
    }); 
    this.load.spritesheet("helplessMan", "assets/spritesheets/helplessManSprite.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    }); 
    this.load.spritesheet("smoke", "assets/spritesheets/smokeSprite.png",{
      frameWidth: gameSettings.playerSize*4,
      frameHeight: gameSettings.playerSize*4
    }); 
    this.load.spritesheet("candy", "assets/spritesheets/candy.png",{
      frameWidth: gameSettings.playerSize*3,
      frameHeight: gameSettings.playerSize*3
    }); 
    this.load.spritesheet("coming", "assets/spritesheets/coming.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });
    this.load.spritesheet("comingAgain", "assets/spritesheets/coming.png",{
      frameWidth: gameSettings.playerSize,
      frameHeight: gameSettings.playerSize
    });

  }   

  loadMovableCharacters(name, playerSizeMultiplyer=1){
    var startPath = 'assets/spritesheets/' + name;

    this.load.spritesheet(name, (startPath +  '/legsTogetherFacingLeft.png'),{
      frameWidth: gameSettings.playerSize * playerSizeMultiplyer,
      frameHeight: gameSettings.playerSize * playerSizeMultiplyer
    });
    this.load.spritesheet((name + '_right'), (startPath +  '/legsTogetherFacingRight.png'),{
      frameWidth: gameSettings.playerSize * playerSizeMultiplyer,
      frameHeight: gameSettings.playerSize * playerSizeMultiplyer
    });
    this.load.spritesheet((name + '_left'), (startPath +  '/legsTogetherFacingLeft.png'),{
      frameWidth: gameSettings.playerSize * playerSizeMultiplyer,
      frameHeight: gameSettings.playerSize * playerSizeMultiplyer
    });
    this.load.spritesheet((name + '_left_left'), (startPath +  '/leftLegFrontFacingLeft.png'),{
      frameWidth: gameSettings.playerSize * playerSizeMultiplyer,
      frameHeight: gameSettings.playerSize * playerSizeMultiplyer
    });
    this.load.spritesheet((name + '_left_right'), (startPath +  '/leftLegFrontFacingRight.png'),{
      frameWidth: gameSettings.playerSize * playerSizeMultiplyer,
      frameHeight: gameSettings.playerSize * playerSizeMultiplyer
    });    
    this.load.spritesheet((name + '_right_left'), (startPath +  '/rightLegFrontFacingLeft.png'),{
      frameWidth: gameSettings.playerSize * playerSizeMultiplyer,
      frameHeight: gameSettings.playerSize * playerSizeMultiplyer
    });
    this.load.spritesheet((name + '_right_right'), (startPath +  '/rightLegFrontFacingRight.png'),{
      frameWidth: gameSettings.playerSize * playerSizeMultiplyer,
      frameHeight: gameSettings.playerSize * playerSizeMultiplyer
    });    
  }

  initStory (){
    //Initializes story
      var people = new npc("people", "assets/spritesheets/peopleSprite.png", ["I could try to capture their attention, so he leaves"]);
      var concernedMom = new npc("concernedMom", "assets/spritesheets/momSprite.png", ['CONCERNED MOM: I charged your phone, call me if you need anything.', "YOU: Ill be fine mom.",'CONCERNED MOM: Just be careful, Honey.','CONCERNED MOM: Remember to use your arrow keys to move.', 'YOU: I know how to cross the street, Mom.', 'CONCERNED MOM: I know, but its your first sleepover.','CONCERNED MOM: I want you to be prepared.', 'YOU: Dont worry, Im not a little kid anymore.', 'CONCERNED MOM: Just promise me you will click on people if you ever need help.', 'YOU: I promise.','CONCERNED MOM: Also click the red arrows to change rooms OR...', 'YOU: or walk to the end of the screen to change rooms, I know.', 'CONCERNED MOM: You can even restart if you miss me!!', 'YOU: Bye Mom!!', 'Its just a sleepover','What could go wrong? &&&death&addDoors']);
      var creepyDude2 = new npc("creep","assets/spritesheets/creep2Sprite.png",['Who is this guy?', "Why is he so close?", "He's been following me ever since I left Mom", "I better get out quick &&&death&addDoors"],100);
      var creepyDude = new npc("creep","assets/spritesheets/creep2Sprite.png",["He's still here, this is getting weird", "What should I do? \n**Start yelling. \n**Call Mom. \n**Ignore.",
                            ["YOU: WHY ARE YOU FOLLOWING ME??","RANDOM GUY: Dude I think that kid is being harrassed.","OTHER RANDOM GUY: Maybe we should keep an eye on him.&&&death&addDoors"],
                            ["CONCERNED MOM: Hi Sweetie, is everything alright??","CONCERNED MOM: Do you want me to come get you??","YOU: No, I'm almost at Bestie's house.","CONCERNED MOM: Okay, I'll stay on the phone with you, until you get there then.&&&death&addDoors"],
                            ["I'm sure he just lives in the building","Screaming for help would be embarrassing anyways &&&death&addDoors&creep"]],100);
      var boy = new npc("boy","assets/spritesheets/boySprite.png", ["BESTIE: You made it!!","YOU: It was hard but I'm here in one piece.","BESTIE: Of course you did, we have the best security out there.","BESTIE: Absolutely nothing can go wrong.","FIRE ALARM: BEEP BEEP BEEEEEEEEP BEEPERS BEEPING BEP!!&&&extras&alarm", "BESTIE: Well then.", "YOU: What happened to the lights??", "YOU: I thought you said nothing can go wrong??","BESTIE: ...","BESTIE: Gotta blast!! &&&death&addDoors","&&&removeNPCs"]);
      var car = new npc();
      var candy = new npc("candy","assets/spritesheets/candy.png",["Wow, that's a lot of candy!"]);
      var baby = new npc("baby","assets/spritesheets/babySprite.png",["BABY: Goo goo ga ga. \n**Talk to baby. \n**Ignore baby.&&&extras&baby",                       
        ["YOU: Are you lost??", "Yes!!","Wow this baby can talk?", "YOU: Where is your mom??", "BABY: Yes!!", "YOU: Is yes the only word you can say??","BABY: Yes!!","Okay maybe this baby can't talk... &&&death&addDoors"],
        ["&&&death&addDoors"]]);
      var pettyMom = new npc("pettyMom","assets/spritesheets/pettyMomSprite.png", ["PETTY MOM: Thank you so much for bringing Baby to me!! &&&death&addDoors","Did the baby follow me down?","PETTY MOM: I didn't think he could even climb up to the tenth floor by himself.", "YOU: Yep that's one strange baby.", "PETTY MOM: Excuse me??", "YOU: ...","PETTY MOM: Well atleast he went to the tenth floor instead of the fifth floor.", "PETTY MOM: That's where the real danger is after all.", "YOU: Excuse me??","PETTY MOM: Oh look at the time...", "PETTY MOM: I need to get my weird baby out of this burning building.", "BABY: Bye bye!!"]); 
      var helplessMan = new npc("helplessMan","assets/spritesheets/helplessManSprite.png", ["YOU: Me??","HELPLESS MAN: Where did everyone go??", "YOU: Uh, the building is on fire, Sir.", "HELPLESS MAN: Oh.", "HELPLESS MAN: Well this isn't good for my business.", "YOU: Business??", "HELPLESS MAN: Yeah, I sell candy to children.","That's concerning", "HELPLESS MAN: But now my customers are gone!!", "HELPLESS MAN: I hope those children in apartment room 68 will come back.", "HELPLESS MAN: With a big family of 5 their parents were always working.","HELPLESS MAN: So the 3 children were always left with their babysitter.", "YOU: So you would buy candy and sell it to them??", "How nice", "HELPLESS MAN: Nope, I make the candy myself.", "HELPLESS MAN: Want to try some, it's my newest recipe. \n**Eat it. \n**Don't eat it.", 
        ["I feel strange.","You'll be fine.","In fact as my newest customer I won't even charge you!!", "*Weird stomach noises* Uh thanks.","&&&death&addDoors&drug"],
        ["YOU: No thanks.","HELPLESS MAN: Suit yourself.", "&&&death&addDoors"]]);
      var babyStanding = new npc("babyStanding","assets/spritesheets/baby2Sprite.png",[]);

      var smoke = new npc("smoke","assets/spritesheets/smokeSprite.png",["Oh no! There's so much smoke"]);

      var killerAnim = new npc("killerAnim","assets/spritesheets/killerAnimSprite.png",[]);
      var coming = new npc();
      var comingAgain = new npc();
      var insideFire = new Room("fireAnimBG",{},{smoke:[locations.left, locations.midSlightLower, smoke]});
      var exit = new Room("endScreenBG",{},{});

      var fifthFloor = new Room("fifthFloorBG",{insideFire:[locations.left, locations.midHeight, insideFire], exit:[locations.right, locations.midHeight, exit]},{smoke:[locations.left, locations.midSlightLower, smoke]}, ["What should I do? \n**Leave. \n**Go inside. \n**Call 911.", 
      ["There's no time", "I've got to help them &&&death&addDoors&fire"],


      ["RING...RING...RING...","POLICE OFFICER: 911, whats your emergency??", "YOU: Ahh Im too scared to speak","What happened \n** YOU: Theres a fire! \n**YOU: YOU: People are dying! \n**YOU: AAAAAAAAH",
      ["POLICE OFFICER: Okay", "POLICE OFFICER: What is the address of your emergency??", "YOU: Oh I know this!!", "YOU: And Bestie called me weird for memorizing his address","YOU: Street ---- --- Apartment --- Floor number... ** 7 ** 6 ** 5",
      ["incorrect","POLICE OFFICER: Okay, and how many people are in the room??", "YOU: There are... ** 5 ** 4 ** 3",
      ["incorrect &&&death&addDoors&correct&wrongFloor&tooMuch","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["correct &&&death&addDoors&correct&wrongFloor&correct","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["incorrect &&&death&addDoors&correct&wrongFloor&tooLittle","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ],
      ["incorrect","POLICE OFFICER: Okay, and how many people are in the room??", "YOU: There are... ** 5 ** 4 ** 3",
      ["incorrect &&&death&addDoors&correct&wrongFloor&tooMuch","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["correct &&&death&addDoors&correct&wrongFloor&correct","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["incorrect &&&death&addDoors&correct&wrongFloor&tooLittle","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ],
      ["correct","POLICE OFFICER: Okay, and how many people are in the room??", "YOU: There are... ** 5 ** 4 ** 3",
      ["incorrect &&&death&addDoors&correct&correct&tooMuch","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["correct &&&death&addDoors&correct&correct&correct","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["incorrect &&&death&addDoors&correct&correct&tooLittle","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ],],

      ["POLICE OFFICER: Do you know why people are dying??", "YOU: Because their room is on fire!!", "POLICE OFFICER: What is the address of your emergency??", "YOU: Oh I know this!", "YOU: And Bestie called me weird for memorizing his address","YOU: Street --- ---- Apartment --- Floor number... \**n 7 \**n 6 \**n 5",
      ["incorrect","POLICE OFFICER: Okay, and how many people are in the room??", "YOU: There are... ** 5 ** 4 ** 3",
      ["incorrect &&&death&addDoors&slow&wrongFloor&tooMuch","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["correct &&&death&addDoors&slow&wrongFloor&correct","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["incorrect &&&death&addDoors&slow&wrongFloor&tooLittle","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ],
      ["incorrect","POLICE OFFICER: Okay, and how many people are in the room??", "YOU: There are... ** 5 ** 4 ** 3",
      ["incorrect &&&death&addDoors&slow&wrongFloor&tooMuch","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["correct &&&death&addDoors&slow&wrongFloor&correct","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["incorrect &&&death&addDoors&slow&wrongFloor&tooLittle","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ],
      ["correct","POLICE OFFICER: Okay, and how many people are in the room??", "YOU: There are... ** 5 ** 4 ** 3",
      ["incorrect &&&death&addDoors&slow&correct&tooMuch","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["correct &&&death&addDoors&slow&correct&correct","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["incorrect &&&death&addDoors&slow&correct&tooLittle","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ],],

      ["POLICE OFFICER: Please try to calm down and tell me the situation??", "YOU: FIRE!!", "POLICE OFFICER: What is the address of your emergency??", "YOU: Oh I know this!!", "YOU: And Bestie called me weird for memorizing his address","YOU: Street --- --- Apartment --- Floor number... \**n 7 \**n 6 \**n 5",
      ["incorrect","POLICE OFFICER: Okay, and how many people are in the room??", "YOU: There are... ** 5 ** 4 ** 3",
      ["incorrect &&&death&addDoors&verySlow&wrongFloor&tooMuch","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["correct &&&death&addDoors&verySlow&wrongFloor&correct","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["incorrect &&&death&addDoors&verySlow&wrongFloor&tooLittle","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ],
      ["incorrect","POLICE OFFICER: Okay, and how many people are in the room??", "YOU: There are... ** 5 ** 4 ** 3",
      ["incorrect &&&death&addDoors&verySlow&wrongFloor&tooMuch","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["correct &&&death&addDoors&verySlow&wrongFloor&correct","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["incorrect &&&death&addDoors&verySlow&wrongFloor&tooLittle","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ],
      ["correct","POLICE OFFICER: Okay, and how many people are in the room??", "YOU: There are... ** 5 ** 4 ** 3",
      ["incorrect &&&death&addDoors&verySlow&correct&tooMuch","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["incorrect &&&death&addDoors&verySlow&correct&correct","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ["correct &&&death&addDoors&verySlow&correct&correct","POLICE OFFICER: Alright, we are sending the firemen over, now!!"],
      ],],
      ],
      ["I should get out of here! &&&death&addDoors&leave"]],true);
      var sixthFloor = new Room("sixthFloorBG",{fifthFloor:[locations.left, locations.midHeight, fifthFloor]},{ helplessMan:[locations.left, locations.lowHeight, helplessMan],candy:[locations.lessRight, locations.lowHeight, candy]},["HELPLESS MAN: Hey, you!"],true);
      var eighthFloor = new Room("eighthFloorBG",{sixthFloor:[locations.midWidthLeft, locations.midHeight, sixthFloor]},{ pettyMom:[locations.furtherRight, locations.lowHeight,  pettyMom], babyStanding:[locations.furtherRight, locations.moreLowerHeight,  babyStanding]},["PETTY MOM: Thank you so much for bringing Baby to me!!&&&death&addDoors"],true);
      var stairs = new Room("stairsBG",{eighthFloor:[locations.left, locations.midHeight, eighthFloor]},{ baby:[locations.furtherRight, locations.lowHeight,  baby]},["A baby?"],true);
      var stairsAndElevator = new Room("stairsAndElevatorBG",{stairs:[locations.left, locations.midHeight, stairs]}, {},["Hmm, stairs or elevator? ** Elevator. ** Stairs.",["Taking the stairs does seem safer","&&&death&addDoors"],["Taking the elevator does seem faster","&&&death&addDoors&elevator"]],true);
      var tenthFloor2 = new Room("tenthFloorBG",{stairsAndElevator:[locations.right, locations.midHeight, stairsAndElevator]},{},["Where'd Bestie go?","Note to self, take applications for a new bestie", "Now, I need to get out of this building &&&death&addDoors"],true); 
      var friendRoom = new Room("friendRoomBG",{tenthFloor2:[locations.right, locations.midHeight, tenthFloor2]},{ boy:[locations.left, locations.lowHeight, boy]});
      var tenthFloor = new Room("tenthFloorBG",{friendRoom:[locations.left, locations.midHeight, friendRoom]},{creep:[locations.furtherRight,locations.midLowerHeight, creepyDude], people:[locations.midWidthRight,locations.midHeight, people]});
      var elevator = new Room("elevatorBG",{tenthFloor:[locations.left, locations.midHeight, tenthFloor]},{creep:[locations.midWidthSlightRight,locations.lowerHeight, creepyDude2]});
      var city = new Room("cityBG"
        ,{elevator:[locations.left, locations.midHeight, elevator]}
        ,{concernedMom:[locations.niceWidth, locations.lowHeight,  concernedMom],car:[locations.midWidth, locations.lowHeight,  car]}
        ,["I should talk to mom before I leave or she'll get worried"],true);
      //var characterSelect = new Room("selectionBG",{city:[locations.midWidth,locations.lowHeight, city]},{girl:[locations.left, locations.midHeight, girl],boy:[locations.left, locations.midHeight, boy]});

      gameSettings.changeRoom = true;


      var selectionDialogue = ["Do you want to pick me? **yes **no", "&&&setPlayerSkin", "Choose a player"];
      var playerSelect = new Room("selectionBG",{city:[locations.furtherRight, locations.top, city]},
        {'girl1': [locations.midWidthSlightRight,locations.lowerHeight, new npc('girl1','', selectionDialogue)]        
        ,'girl2': [locations.midWidthFurtherLeft,locations.lowerHeight, new npc('girl2','',selectionDialogue)]        
        ,'girl3': [locations.midWidthEvenFurtherLeft,locations.lowerHeight, new npc('girl3','',selectionDialogue)]        
        ,'girl4': [locations.midWidthEvenEvenFurtherLeft/1.45,locations.lowerHeight, new npc('girl4','',selectionDialogue)]        
        ,'girl5': [locations.midWidthEvenEvenFurtherLeft/3.6,locations.lowerHeight, new npc('girl5','',selectionDialogue)]        
        ,'boy1': [locations.right/1.12,locations.lowerHeight, new npc('boy1','',selectionDialogue)]        
        ,'boy2': [locations.right/1.35,locations.lowerHeight, new npc('boy2','',selectionDialogue)]        
        ,'boy3': [locations.right/0.97,locations.lowerHeight, new npc('boy3','',selectionDialogue)]        
        ,'boy4': [locations.midWidth/1.6,locations.midSlightLower*1.15, new npc('boy4','',selectionDialogue)]        
        ,'girl3': [locations.midWidth/1.12,locations.midSlightLower*1.15, new npc('girl3','',selectionDialogue)] 
        , coming: [locations.midWidth/0.85,locations.midSlightLower*1.15,coming]  
        , comingAgain: [locations.midWidth/0.7,locations.midSlightLower*1.15,comingAgain]     
        },["Choose a player &&&death&addDoors"],true);
      
        gameSettings.headRoom = playerSelect;

  }

  create() {

    this.add.text(20, 20, "Loading game...");
    //add death gifs and animations here
    this.scene.start("mainMenu");
    //this.scene.start("deathScreen");
    
  }
}
