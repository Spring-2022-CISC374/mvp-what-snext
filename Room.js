class Room {
    //contains doors which are linked lists to other rooms
    doors;
    npcs;
    starterDialogue;
    showStarterDialogue;
    //contains npcs
    constructor(background='background', doors={}, npcs = [],starterDialogue = '',showStarterDialogue=false){
        this.background = background;
        this.doors = doors;
        this.npcs = npcs;
        this.starterDialogue = starterDialogue;
        this.showStarterDialogue = showStarterDialogue;
    }

}

