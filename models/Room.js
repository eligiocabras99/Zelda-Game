import * as fs from 'fs';
//import promptSync from 'prompt-sync';
//const prompt = promptSync();
import * as readlineSync from 'readline-sync'; // Module for synchronous reading of input

import {
    colorMap,
    directionMap,

} from '../structure.js';

import{
    Position
} from './Position.js';

import{
    Entity
} from './Entity.js';

import{
    Item
} from './Item.js';

import {
    Maze
} from './Maze.js'    

import {
    Treasure
} from './Treasure.js'; 

import{
    Monster
} from './Monster.js'; 



export class Room{

    constructor(id){
        this.position;
        this.id = id;
        this.objects = [];
        this.entities = [];
        Maze.getInstance().addRoom(this);
    }

    getId(){
        return this.id;
    }

    getPosition(){
        return this.position;
    }
    
    //Return Room instance with given id
    static getInstance(id){

        let foundRoom = Maze.getInstance().getRooms().find(room => room.id === id);

        if (!foundRoom) {
            foundRoom = new Room(id);
        }

        return foundRoom;

    }

    //Return the Room instance with given pos
    static getInstancePos(pos){

        let foundRoom = Maze.getInstance().getRooms().find(room => room.position === pos);

        return foundRoom;

    }

    getObjects(){
        return this.objects;
    }

    //Display the objects in this room
    displayObjects(){
        for(let obj of this.getObjects()){
            if(obj instanceof Treasure){
                console.log("There's the " + obj.getName() + ", which gives you " + obj.getMoney() + " dollar!")
            }else{
                console.log("There's the " + obj.getName() + ", a weapon!" )
            }
        }
    }

    //Display the entities in this room
    displayEntities(){

        for(let obj of this.getEntities()){

            //difference between the case in which the monster is dead or not
            if(obj instanceof Monster && obj.getIsDead() == false){
                console.log("There's the monster " + obj.getName() + ", that is waiting to kill you beside a locked door! ")
            }else if(obj instanceof Monster && obj.getIsDead() == true){

                console.log("There's the monster " + obj.getName() + ", but dont' worry, it's dead!")
            }else{
                console.log("There's the " + obj.getName() + "!" )
            }
        }

    }


    getEntities(){
        return this.entities;
    }

    //Add entity in the room
    addEntities(value){

        if (!(value instanceof Entity)) {
            throw new Error("L'oggetto deve essere un'istanza di Entity");
        }

        //there can be a maximum of one monster in this room
        if ((value instanceof Monster) && this.getEntities().length == 1) {
            throw new Error("It is impossible add other objects. There cannot be more than one monster in the room ")
        }else{
            this.getEntities().push(value);
        }
        
    }

    //remove entity from the room
    removeEntities(value){

        if (!(value instanceof Entity)) {
            throw new Error("L'oggetto deve essere un'istanza di Entity");
        }

        if ((value instanceof Monster)) {
            throw new Error("It is impossible remove other objects")
        }else{
            this.entities = this.getEntities().filter(item => item !== value);
        }
        
    }

    //This function needs to print the description of the room, which number is passed in input, from a file called Rooms.txt, which is located in the folder called "files"
    displayRoomDescription() {

        let fileRoom = './files/Rooms.txt'; //relative path of the file
        let room = this.getId(); //Room id
    
        //Promise for the synchronous execution of this function, because without that and the await statement in its called,
        //the reading file operation is executed in asynchronous mode.
        //When it reads a file asynchronously using fs.readFile, the program continues to perform other operations,
        // and  this denies the correct play of the game in the terminal
        return new Promise((resolve, reject) => {
        fs.readFile(fileRoom, 'utf8', (err, data) => {
            if (err) {
            reject(err);
            } else {
            var lines = data.toString().split('\n'); //Convert data output in string format, and split it into single lines, in order to put into an array of lines
            console.log(colorMap.red("Currently you are in " + lines[room])); //Display only the line of the room passed in input (ex. room = 1, it show the description of The first room, etc.)
            resolve();
        }
        });
        });

    }

    //In order this function shows: Room Description, Possible_exits, objects, entities
    async displayRoomInfo(){

        
        await this.displayRoomDescription();
        console.log("Currently you can leave the room in the following directions: ")
        await this.getPossibleExits();
        this.displayObjects();
        this.displayEntities();

    }

    setPosition(position){
        this.position = position;
    }

    //Add object in the room
    addObject(value){

        if (!(value instanceof Item)) {
            throw new Error("L'oggetto deve essere un'istanza di Item");
        }

        if (this.getObjects().length == 5) {
            console.log("It is impossible add other objects. There cannot be more than five items in the room ");
        }else{
            this.getObjects().push(value);
        }

    }

    //remove object from the room
    removeObject(value){
        this.objects = this.getObjects().filter(item => item !== value);
    }

    processExits(print) {
        return new Promise((resolve, reject) => {

            const exitsMap = {
                ["NORMAL_DOOR"]: { exit: true},
                ["DOTTED_DOOR"]: { exit: false}, 
                ["EXIT"]: {exit: true},
                ["Wall"]: { exit: false}
                //All the cases that I can encounter when trying to exit a room, exit _ true if the player can leave the room through this type of exit.
            };
    
            const currentRoomPos = this.getPosition();
            const maze = Maze.getInstance();
            let directionsAllowed = [];
            let door_valid_type;
           
            /*
            From the currentRoom, It returns the type of object specified in the getMazeObject method 
            of the Maze class, where some values from the exitsMap are included.
            */ 
            const checkExit = (offset) => {
                const newPos = Position.getInstance(currentRoomPos.getX() + offset.dx, currentRoomPos.getY() + offset.dy);
                door_valid_type = maze.getMazeObject(newPos);
                return door_valid_type;
            };
    
            for (const direction in directionMap) { //For all direction
                if (directionMap.hasOwnProperty(direction)) {
                    const { dx , dy } = directionMap[direction]; //How much it moves on the x and y axes for the current direction (information saved in the directionMap in the structure.js file)
                    const exitType = exitsMap[checkExit({ dx , dy })];
                    if (exitType && exitType.exit) {
                        const nextPos = Position.getInstance(currentRoomPos.getX() + 2 * dx, currentRoomPos.getY() + 2 * dy); //Next Room position in this direction
                        if (Room.getInstancePos(nextPos)) { //If is possible to go in another room
                            if(print){
                                const roomToGo = Room.getInstancePos(nextPos).getId();
                                console.log(colorMap.cyan(`At Direction ${direction}, you could exit to go to Room ${roomToGo}`));
                            }
                        } else if (print) { //The other possible case, in which the player can move, is the exit
                            console.log(colorMap.cyan(`At Direction ${direction}, you could exit from the castle!`));
                        }
                        directionsAllowed.push(direction); //It saves the directions allowed from the player current room
                    }
                }
            }
            resolve(directionsAllowed);  //Return array with all allowed direction from the room
        });
    }

    // print exit: getPossibleExits
    getPossibleExits() {
        return this.processExits(true);
    }

    //Array of possibleExits: getDirectionsAllowed
    getDirectionsAllowed() {
        return this.processExits(false);
    }

    toString() {
        return `(Room ${this.getId()}, ${this.getPosition()}, objects: ${this.getObjects()}, entities: ${this.getEntities()} ).`;
    }

}