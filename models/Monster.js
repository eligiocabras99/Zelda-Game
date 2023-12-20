import {
    Entity
} from './Entity.js';

let monster_instances = [];
// Sottoclasse
export class Monster extends Entity {
    constructor(name) {
      // Chiamata al costruttore della superclasse
      super(name);
    }

    static getInstance(name){
        let foundMonster = monster_instances.find(monster => monster.name === name);

        if (!foundMonster) {
            foundMonster = new Monster(name);
        }

        return foundMonster;
    }

    
}