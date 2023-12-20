import {
    monsterMap,
    places,
    colorMap,
    directionMap
} from '../structure.js';

// classi Position, room (position e  treasure), Door, Princess

import {
    Room
} from './Room.js'

import{
    Position
} from './Position.js';

import {
    Door
} from './Door.js' 

import {
    Treasure
} from './Treasure.js' 


import{
    Princess
} from './Princess.js'





let instancePlayer 

export class Player {
    constructor() {
      if (instancePlayer) {
        throw new Error("Singleton Player class can't be instantiated more than once.")
      }
      instancePlayer = this;
      this.name = "";
      this.position = Position.getInstance(1,1);
      this.bag = []
      this.money = 0
      this.hasPrincess = false;
    }

    static getInstance(){
        if (!instancePlayer) {
            instancePlayer = new Player();
        }
        return instancePlayer;
    }

    getName() {
        return this.name;
    }

    //GET CURRENT ROOM
    getRoom() {
        return Room.getInstancePos(this.getPosition());
    }

    getPosition() {
        return this.position;
    }

    getX(){
        return this.position.getX();
    }

    getY(){
        return this.position.getY();
    }

    getBagObjects(){
        return this.bag;
    }

    getMoney(){
        return this.money;
    }

    getHasPrincess(){
        return this.hasPrincess;
    }

    setHasPrincess(value){
        this.hasPrincess = value;
    }

    setName(value) {
        this.name = value;
    }

    setPosition(value) {
        if (!(value instanceof Position)) {
            throw new Error("Invalid argument. Expected an instance of Position.");
        }
        this.position = value;

        if(this.getHasPrincess()){
            Princess.getInstance().setPosition(value);
        }
    }

    addBagObjects(value){

        this.bag.push(value); //add to list bag
        this.getRoom().removeObject(value);
        
        if (value instanceof Treasure){
            this.addMoney(value.getMoney());
        }
    }

    removeBagObjects(value){
        this.bag = this.getBagObjects().filter(item => item !== value);

        if (value instanceof Treasure){
            this.removeMoney(value.getMoney());
        }
    }

    addMoney(value){
        this.money += value;
    }

    removeMoney(value){
        this.money -= value;
    }

    move(dir) {
    
        const { dx, dy } = directionMap[dir];
        let currentPos = Position.getInstance(this.getX(), this.getY());
        let newPos = Position.getInstance(currentPos.getX() + dx, currentPos.getY() + dy);
        let roomPlayerPos = this.getRoom().getPosition();

        //if (Maze.getInstance().getMazeObject(newPos) === "Door") {
            if(Room.getInstancePos(Position.getInstance(roomPlayerPos.getX() + 2 * dx, roomPlayerPos.getY() + 2 * dy))){
                newPos = Position.getInstance(currentPos.getX() + 2 * dx, currentPos.getY() + 2 * dy);
            }else{
                //EXIT CASE
                newPos = Position.getInstance(currentPos.getX() + dx, currentPos.getY() + dy);
            }    
       // }
           
        this.setPosition(newPos);
        console.log(`You move ${dir}`);

    }

    //Pick function (obj to drop passed as parameter)
    pick(obj){
        //Find the obj if it's inside the room
        let objectToPick = this.getRoom().getObjects().find(object => object.name === obj);

        if(!objectToPick){
            console.log("This object isn't in the room!");
        }else{
            this.addBagObjects(objectToPick);
            console.log(`You pick the ${obj} successfully!!`);
        }

    }

    //Drop function (obj to drop passed as parameter)
    drop(obj){
        //Find the obj if it's inside the room
        let objectToDrop = this.getBagObjects().find(object => object.name === obj);

        if(!objectToDrop){
            console.log("This object isn't in your bag!");
        }else if(this.getRoom().getObjects().length < 5){
            this.removeBagObjects(objectToDrop);
            this.getRoom().addObject(objectToDrop);
            console.log(`You drop the ${obj} successfully!!`);
        }

    }

    //Attack function
    attack(){
        this.getRoom().getEntities()[0].setIsDead(true); //The monster dies
        //Unlock door
        let xDoor = monsterMap[this.getRoom().getEntities()[0].getName()].doorLockX;
        let yDoor = monsterMap[this.getRoom().getEntities()[0].getName()].doorLockY;

        let doorToUnlock = Door.getInstance(Position.getInstance(xDoor,yDoor));
        doorToUnlock.unlockDoor();

    }

    //With look command the player can see current room situation
    async look(){
        await Player.getInstance().getRoom().displayRoomInfo();
    }

    //Take the princess if the player reaches room nine.
    async takePrincess(){
        var player = Player.getInstance(); 
        let roomTarget = Room.getInstance(places.NINE);

        if (player.getPosition() == roomTarget.getPosition()){
            player.setHasPrincess(true);
            roomTarget.removeEntities(Princess.getInstance());
            console.log("You reach the princess! Now you must go out to the castle in order to win the game!")
        }

    }

    //Display player info (bag and cash)
    displayInfo(){

        if (this.getBagObjects().length > 0){
            let objectsName = this.getBagObjects().map(item => item.getName()).join(', '); //After the last item, there isn't a comma
            console.log(colorMap.green("Your bag contains the following items: " + objectsName.trim() + "."));
        }else{
            console.log(colorMap.green("Currently, your bag is empty"));
        }

        console.log(colorMap.green("Current Cash is: " + this.getMoney()));
        
    }
    
    toString() {
        return `(Player: ${this.getName()}, \n Position: ${this.getPosition()} - Room: ${this.getRoom()},\n Bag: ${this.getBagObjects()},\n Money = ${this.getMoney()} ).`;
    }
    
}

export function resetPlayerInstance() {
    instancePlayer = null;
}