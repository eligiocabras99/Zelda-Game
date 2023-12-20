import {
    Item
} from './Item.js';

let weapon_instances = []
// Sub-class
export class Weapon extends Item {
    constructor(name) {
      // Superclass
      super(name);
      weapon_instances.push(this);
    }

    static getInstance(name){
        let foundWeapon = weapon_instances.find(weapon => weapon.name === name);

        if (!foundWeapon) {
            foundWeapon = new Weapon(name);
        }

        return foundWeapon;
    }

    toString() {
        return `Weapon: ${this.name}`;
    }

}