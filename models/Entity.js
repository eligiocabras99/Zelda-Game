export class Entity{
    constructor(name) {
        this.name = name;
        this.position;
        this.isDead = false;
    }

    getName(){
        return this.name;
    }

    getIsDead(){
        return this.isDead;
    }

    getPosition(){
        return this.position;
    }

    setPosition(value){
        this.position = value;
    }

    setIsDead(value){
        this.isDead = value;
    }

}