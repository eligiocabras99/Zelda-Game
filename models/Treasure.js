import {
    Item
} from './Item.js';


let treasure_instances = []
// Sub-class
export class Treasure extends Item {
    constructor(name) {
      // Superclass
      super(name);
      this.money = 0;
      treasure_instances.push(this);
    }

    static getInstance(name){
        let foundTreasure = treasure_instances.find(treasure => treasure.name === name);

        if (!foundTreasure) {
        // If it doesn't find the treasure, it creates it
            foundTreasure = new Treasure(name);
        }

        return foundTreasure;
    }

    getMoney(){
        return this.money;
    }

    setMoney(value){
        this.money = value;
    }

    toString() {
        return `Treasure: ${this.name}, Money: ${this.money}`;
    }
}