import {
    door_types,
} from '../structure.js';

import {
    Door
} from './Door.js' 




let instanceMaze

export class Maze {
    constructor() {
      if (instanceMaze) {
        throw new Error("Singleton Maze class can't be instantiated more than once.")
      }
      instanceMaze = this;
      this.rooms = [];
      this.doors = [];
      this.walls = [];
    }

    static getInstance(){
        if (!instanceMaze) {
            instanceMaze = new Maze();
        }
        return instanceMaze;
    }

    getWalls(){
        return this.walls;
    }

    getRooms(){
        return this.rooms;
    }

    getDoors(){
        return this.doors;
    }

    addWall(value){
        this.getWalls().push(value);
    }

    addRoom(value){
        this.getRooms().push(value);
    }

    addDoor(value){
        this.getDoors().push(value)
    }

    getExit(){
        let foundExit = this.doors.find(door => door.type == "EXIT");

        return foundExit;
    }

    getDottedDoors(){
        let lockedDoors = this.doors.find(door => door.type == "EXIT");

        return lockedDoors;
    }

    getMazeObject(pos) {

        const objectTypes = [
          { type: "Wall", array: this.getWalls() },
          { type: "Door", array: this.getDoors() },
          { type: "Room", array: this.getRooms() },
        ];
    
        for (const { type, array } of objectTypes) {
          const object = array.find(obj => obj.position === pos);
          if (object) {

            if(object instanceof Door){
                switch ( object.getType() ){
                    case door_types.NORMAL:
                        return "NORMAL_DOOR";
                        break;
                    case door_types.DOTTED:
                        return "DOTTED_DOOR";
                        break;
                    case door_types.EXIT:
                        return "EXIT";
                        break;
                }
            }


            return type;
          }
        }
    
        return "Unknown"; // Unknown if there isn't a value
    }
    

}

export function resetMazeInstance() {
    instanceMaze = null;
}