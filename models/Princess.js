import {
    Entity
} from './Entity.js';

let princess;
export class Princess extends Entity {

    constructor(name) {
      // Superclass
      super(name);
    }

    static getInstance(name){

        if (!princess) {
            princess = new Princess(name);
        }

        return princess;
    }
    
}