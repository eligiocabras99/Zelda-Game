import {
   door_types,
} from '../structure.js';

import {
    Maze
} from './Maze.js';

export class Door{
    constructor(position, type) {
        this.position = position
        this.type = type;
        Maze.getInstance().addDoor(this);
    }

    static getInstance(pos){
        
        let foundDoor = Maze.getInstance().getDoors().find(door => door.position === pos);

        if (!foundDoor) {
            foundDoor = new Door(pos);
        }

        return foundDoor;
    
    }

    getPosition(){
        return this.position;
    }

    getType(){
        return this.type;
    }

    setType(value){
        this.type = value;
    }

    unlockDoor(){
        this.setType(door_types.NORMAL);
    }

}