import {
    Maze
} from './Maze.js';

export class Wall{
    constructor(position) {
        this.position = position
        Maze.getInstance().addWall(this);
    }

    static getInstance(pos){
        
        let foundWall = Maze.getInstance().getRooms().find(wall => wall.position === pos);

        if (!foundWall) {
            foundWall = new Wall(pos);
        }

        return foundWall;

    }

    getPosition(){
        return this.position;
    }

}