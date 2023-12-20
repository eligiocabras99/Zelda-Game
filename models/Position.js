let instancesPos = [] ;

export class Position {

    constructor(x, y) {
      this.x = x;
      this.y = y;
      Position.addInstances(this);
    }

    static addInstances(instance){
        instancesPos.push(instance);
    }

    static getAllInstances(){
        return instancesPos;
    }
    
    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setX(value){
        this.x = value;
    }

    setY(value){
        this.y = value;
    }
    static getInstance(x,y){

        if (Position.getAllInstances().length > 0){
            for (const instance of Position.getAllInstances()){
                if (instance.getX() == x && instance.getY() == y) {
                    return instance;
                }
            }
        }   

        return new Position(x,y);
    }

    toString(){
        return `(x=${this.x}, y=${this.y})`;
    }

}