class Room {
    //contains doors which are linked lists to other rooms
    doors;
    npcs;
    //contains npcs
    constructor(background='background', doors={}, npcs = []){
        this.background = background;
        this.doors = doors;
        this.npcs = npcs;
    }

}

