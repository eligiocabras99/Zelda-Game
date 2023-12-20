import chalk from 'chalk';

export var places = {
    ONE : 1   ,                       //maze[1][1]  Room(Position(1,1), 1),
    TWO:   2   ,                     //maze[1][3],
    THREE: 3  ,                       //maze[1][5],
    FOUR: 4    ,                     //maze[3][1],
    FIVE: 5     ,                     //maze[3][3],
    SIX:  6     ,                    //maze[3][5],
    SEVEN: 7   ,                   //maze[5][1],
    EIGHT: 8 ,                   //maze[5][3],
    NINE: 9                  //maze[5][5]
}

export const directions = {
    NORTH : "NORTH",
    EAST: "EAST",
    SOUTH:  "SOUTH",
    WEST: "WEST" 
};

export const actions = {
    MOVE : "MOVE",
    PICK : "PICK", 
    DROP: "DROP", 
    EXIT: "EXIT", 
    ATTACK: "ATTACK", 
    LOOK: "LOOK"
};

export const objects = {
    EGG: "EGG",
    CHALICE: "CHALICE",
    PAPER: "PAPER",
    SHIELD: "SHIELD",
    DAGGER: "DAGGER"
}

export const weapons = {
    SHIELD: "SHIELD",
    DAGGER: "DAGGER"
}

export const treasures = {
    EGG: "EGG",
    CHALICE: "CHALICE",
    PAPER: "PAPER"
}

export const entities = {

    MEDUSA: "MEDUSA",
    DRACULA: "DRACULA",
    PRINCESS: "PRINCESS"
}

export const door_types = {
    NORMAL: "NORMAL",
    DOTTED: "DOTTED",
    EXIT: "EXIT"
}

export const directionMap = {
    [directions.NORTH]: { dx: -1, dy: 0 },
    [directions.SOUTH]: { dx: 1, dy: 0 },
    [directions.EAST]: { dx: 0, dy: 1 },
    [directions.WEST]: { dx: 0, dy: -1 }
};

export const monsterMap = {
    [entities.DRACULA]: { weaponToKill: weapons.DAGGER, doorLockX: 4, doorLockY: 5},
    [entities.MEDUSA]:  { weaponToKill: weapons.SHIELD, doorLockX: 4, doorLockY: 3}
};

export const endCases = {
    WIN: "WIN",
    LOSE: "LOSE",
    DEAD: "DEAD"
}

export const pathFiles = {
    PRINT: './files/PrintStart.txt',
    STORY: './files/Start.txt',
    DEAD:  './files/EndDead.txt',
    ROOMS: './files/Rooms.txt',
    WIN: './files/EndWin.txt',
    LOSE: './files/EndLose.txt'
}

export const colorMap = {
    red: chalk.red,
    green: chalk.green,
    blue: chalk.blue,
    cyan: chalk.cyan,
    magenta: chalk.magenta,
    yellow: chalk.yellow
};

