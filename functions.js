import * as fs from 'fs';
//import promptSync from 'prompt-sync';
//const prompt = promptSync();
import * as readlineSync from 'readline-sync'; // Module for synchronous reading of input

import {
  Position
} from './models/Position.js'

import {
  Player,
  resetPlayerInstance
} from './models/Player.js'

import {
  Wall
} from './models/Wall.js'

import {
  Door
} from './models/Door.js'

import {
  Treasure
} from './models/Treasure.js'

import {
  Weapon
} from './models/Weapon.js'

import {
  Princess
} from './models/Princess.js'

import {
  Monster
} from './models/Monster.js'

import {
  Maze,
  resetMazeInstance
} from './models/Maze.js'

import {
  Room
} from './models/Room.js'

import {
  colorMap,
  places,
    actions,
    directions,
    objects,
    pathFiles,
    endCases,
    door_types,
    entities,
    monsterMap
} from './structure.js';


const functionMap = {
  initializeMaze,
  initializePlayer
  // Aggiungi altre funzioni se necessario
};

/*
This function was created to generalize a scenario in which there is a need for a promise inside a function to be resolved.
...args are the parameters of the fnName function, they are optional 
Within the Promise, there is code that, in turn, calls the function fn. All the functions named "fn" are specified in the functionMap. 
This is necessary to ensure that the outputs of the functions are displayed in the correct order.*/
function createPromiseForFunction(fnName, ...args) {
  return () => new Promise((resolve, reject) => {
      try {
      const fn = functionMap[fnName];  //It takes the input value (function name) from the map, searches for it among the defined functions, and then executes it, returning a Promise.
      if (typeof fn === 'function') {
          const boundFn = fn.bind(this); //For class function
          const result = boundFn(...args);
          resolve(result);
      } else {
          throw new Error(`Function "${fnName}" not found.`);
      }
      } catch (error) {
      reject(error);
      }
  });
}

//This Function initializes all the Maze objects necessary for the game
async function initializeMaze(){

  //Initialize the Maze Castle
  Maze.getInstance();

  //initialize rooms
  let roomOne = Room.getInstance(places.ONE)
  roomOne.setPosition(Position.getInstance(1,1))

  let roomTwo = Room.getInstance(places.TWO)
  roomTwo.setPosition(Position.getInstance(1,3))

  let roomThree = Room.getInstance(places.THREE)
  roomThree.setPosition(Position.getInstance(1,5))

  let roomFour = Room.getInstance(places.FOUR)
  roomFour.setPosition(Position.getInstance(3,1))

  let roomFive = Room.getInstance(places.FIVE)
  roomFive.setPosition(Position.getInstance(3,3))

  let roomSix = Room.getInstance(places.SIX)
  roomSix.setPosition(Position.getInstance(3,5))

  let roomSeven = Room.getInstance(places.SEVEN)
  roomSeven.setPosition(Position.getInstance(5,1))

  let roomEight = Room.getInstance(places.EIGHT)
  roomEight.setPosition(Position.getInstance(5,3))

  let roomNine = Room.getInstance(places.NINE)
  roomNine.setPosition(Position.getInstance(5,5))

  //Walls (with 0 in the maze matrix )
  Wall.getInstance(Position.getInstance(0,0));
  Wall.getInstance(Position.getInstance(0,1));
  Wall.getInstance(Position.getInstance(0,2));
  Wall.getInstance(Position.getInstance(0,3));
  Wall.getInstance(Position.getInstance(0,4));
  Wall.getInstance(Position.getInstance(0,5));
  Wall.getInstance(Position.getInstance(0,6));

  Wall.getInstance(Position.getInstance(1,6));

  Wall.getInstance(Position.getInstance(2,0));
  Wall.getInstance(Position.getInstance(2,2));
  Wall.getInstance(Position.getInstance(2,4));
  Wall.getInstance(Position.getInstance(2,5));
  Wall.getInstance(Position.getInstance(2,6));

  Wall.getInstance(Position.getInstance(3,0));
  Wall.getInstance(Position.getInstance(3,2));
  Wall.getInstance(Position.getInstance(3,6));

  Wall.getInstance(Position.getInstance(4,0));
  Wall.getInstance(Position.getInstance(4,1));
  Wall.getInstance(Position.getInstance(4,2));
  Wall.getInstance(Position.getInstance(4,4));
  Wall.getInstance(Position.getInstance(4,6));

  Wall.getInstance(Position.getInstance(5,0));
  Wall.getInstance(Position.getInstance(5,4));
  Wall.getInstance(Position.getInstance(5,6));

  Wall.getInstance(Position.getInstance(6,0));
  Wall.getInstance(Position.getInstance(6,1));
  Wall.getInstance(Position.getInstance(6,2));
  Wall.getInstance(Position.getInstance(6,4));
  Wall.getInstance(Position.getInstance(6,5));
  Wall.getInstance(Position.getInstance(6,6));

  //Doors Normal (with | in the maze matrix )
  //Exit (with E in the maze matrix )
  //Doors Dotted (with L in the maze matrix )
  Door.getInstance(Position.getInstance(1,0)).setType(door_types.EXIT);
  Door.getInstance(Position.getInstance(1,2)).setType(door_types.NORMAL);
  Door.getInstance(Position.getInstance(1,4)).setType(door_types.NORMAL);
  
  Door.getInstance(Position.getInstance(2,1)).setType(door_types.NORMAL);
  Door.getInstance(Position.getInstance(2,3)).setType(door_types.NORMAL);

  Door.getInstance(Position.getInstance(3,4)).setType(door_types.NORMAL);

  Door.getInstance(Position.getInstance(4,3)).setType(door_types.DOTTED);
  Door.getInstance(Position.getInstance(4,5)).setType(door_types.DOTTED);

  Door.getInstance(Position.getInstance(5,2)).setType(door_types.NORMAL);

  //Rooms initial objects
  let egg = Treasure.getInstance(objects.EGG);
  egg.setMoney(500000);

  let shield = Weapon.getInstance(objects.SHIELD);

  let chalice = Treasure.getInstance(objects.CHALICE);

  let dagger = Weapon.getInstance(objects.DAGGER);

  let paper = Treasure.getInstance(objects.PAPER);
  paper.setMoney(1000000);


  //Add the objects in their respective rooms
  roomTwo.addObject(egg);
  roomThree.addObject(shield);
  roomFour.addObject(chalice);
  roomSeven.addObject(dagger);
  roomEight.addObject(paper);

  let medusa = Monster.getInstance(entities.MEDUSA);
  let dracula = Monster.getInstance(entities.DRACULA);
  let princess = Princess.getInstance(entities.PRINCESS);

  //Add the entities in their respective rooms
  roomFive.addEntities(medusa);
  medusa.setPosition(Position.getInstance(3,3));
  roomSix.addEntities(dracula);
  dracula.setPosition(Position.getInstance(3,5));
  roomNine.addEntities(princess);
  princess.setPosition(Position.getInstance(5,5));


}

//This Function is used to initialize player informations, like his initial position and his name
function initializePlayer() {

  console.log('Initializing player...');

  let userName = readlineSync.question("Please enter your name: "); //Reading user input through the readline-sync module

  Player.getInstance().setName(userName); //Set Player username 

}

/*Generic function that reads an entire file given a relative path as input (pathFile), 
writes the entire content of the file to the terminal with the color passed as the second parameter (color).*/
function displayFileContent(pathFile, color) {

  let fileStory = pathFile; //relative path of the file

  //Promise for the synchronous execution of this function, because without that and the await statement in its called,
  //the reading file operation is executed in asynchronous mode.
  //When it reads a file asynchronously using fs.readFile, the program continues to perform other operations,
  // and  this denies the correct play of the game in the terminal
  
  return new Promise((resolve, reject) => { //Read the file
    fs.readFile(fileStory, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log(color(data.toString())); //Convert data output in string format, in order to show it in the terminal
        resolve();
      }
    });
  });
}

//This function is used to check all the conditions in which the player can move in the given direction as input, 
//returning true if the conditions are met and false otherwise
async function conditionsToMove(dir) {

  var player = Player.getInstance();
  var directionsAllowed = await player.getRoom().getDirectionsAllowed(); // Array with all possible directions from the player's room

  //I need to have a direction provided as input; the entered direction must be present in the directions list (in the structure.js file)
  // and, above all, it must be a direction present in the directionAllowed array.
  const isValidDirection = dir &&
      Object.values(directions).includes(dir.toUpperCase().toString()) &&
      directionsAllowed.includes(dir.toUpperCase().toString());


  return isValidDirection;
}

//This function is used to gather all the conditions in which the player can pick up an object passed as input,
// in order to return true if the conditions are met, false otherwise.
async function conditionsToPick(obj){
  var player = Player.getInstance();

  var objectAllowed = player.getRoom().getObjects(); //He can only pick up objects in the room where it is located.

  let objectAllowedNames = objectAllowed.map(object => object.name); //Objects' names

  //The object must be passed as input, must be included in the 'objects' list (declared in the structure.js file),
  // and must be included in the 'objectsAllowed' array. The player's bag must contains max. 10 items
  const isValidObject = obj && player.getBagObjects().length < 10
  Object.values(objects).includes(obj.toUpperCase().toString()) &&
  objectAllowedNames.includes(obj.toUpperCase().toString());

  return isValidObject;
}

//This function is used to gather all the conditions in which the player can drop an object passed as input,
// in order to return true if the conditions are met, false otherwise.
async function conditionsToDrop(obj){

  var player = Player.getInstance();

  var objectAllowed = player.getBagObjects(); //He can only drop objects in the room where it is located.

  let roomObjectsNum = player.getRoom().getObjects().length;

  let objectAllowedNames = objectAllowed.map(object => object.name);

  //The object must be passed as input, must be included in the 'objects' list (declared in the structure.js file),
  // and must be included in the 'objectsAllowed' array. 
  //The room where the object is dropped must have fewer than 5 objects present before the drop action.
  const isValidObject = obj && roomObjectsNum < 5 &&
  Object.values(objects).includes(obj.toUpperCase().toString()) &&
  objectAllowedNames.includes(obj.toUpperCase().toString());

  return isValidObject;

}

/*This function is used to check if the player, in the current room, 
can initiate an attack (whether successful or not) against a living monster.*/ 
async function conditionsToAttack(){

  var player = Player.getInstance();
  let monsterToAttack = player.getRoom().getEntities()[0];
  let hasRequiredWeapon;
  let entity_name = "";

  //If the entity I am trying to attack is a living monster.
  if (monsterToAttack instanceof Monster && monsterToAttack.getIsDead() == false){

    entity_name = monsterToAttack.getName(); //Monster's name

    //Retrieve the name of the weapon needed to kill the monster, information present in the 'monsterMap' defined in the 'structure.js' file.
    let weaponToKillIt = monsterMap[entity_name].weaponToKill; 

    //It checks if the required weapon is present in the player's bag.
    hasRequiredWeapon = weaponToKillIt && player.getBagObjects().some(weapon => weapon.getName() == weaponToKillIt);

  }

  //There's the monster in player's room
  //The monster is included in the entities structure and his type is monster
  //The player has the weapon which has property in monsterMap of the monster in question
  const isValidObject = monsterToAttack &&
  Object.values(entities).includes(entity_name.toUpperCase().toString()) &&
  hasRequiredWeapon
  ;

  return isValidObject;

}

/*This function is used to gather all winning conditions, returning true if the conditions are met, and false otherwise.*/ 
async function winCondition(){

  var player = Player.getInstance();
  let exit = Maze.getInstance().getExit(); //Exit 
  let exitPos = exit.getPosition()   //Exit position

  //I must be in the same position as the exit, and I must have the princess with me.
  const winCondition =  player.getPosition() === exitPos   
  && player.getHasPrincess();
  
  return winCondition;

}

/*This function is used to gather all losing conditions, returning true if the conditions are met, and false otherwise.*/ 
async function loseConditions(){

  //2) exit without the princess                            
  var player = Player.getInstance();
  let exit = Maze.getInstance().getExit();
  let exitPos = exit.getPosition()

  const loseCondition =  player.getPosition() === exitPos
  && !player.getHasPrincess();
  
  return loseCondition;
}

/*This function is used to gather all death conditions, returning true if the conditions are met, and false otherwise.*/
//This function is similar to conditionsToAttack, but it checks if the player doesn't have the required Weapon
async function deadCondition(){

  
  var player = Player.getInstance();
  let monsterToAttack = player.getRoom().getEntities()[0];
  let hasRequiredWeapon;
  let entity_name = "";

  if (monsterToAttack instanceof Monster && monsterToAttack.getIsDead() == false){

    entity_name = monsterToAttack.getName(); 
    //console.log(entity_name)

    let weaponToKillIt = monsterMap[entity_name].weaponToKill;
  
    //It checks if the required weapon is present in the player's bag.
    hasRequiredWeapon = weaponToKillIt && player.getBagObjects().some(weapon => weapon.getName() == weaponToKillIt);

    //If the player doesn't have the required weapon to kill the monster in the current room, he dies
    if(!hasRequiredWeapon){
      return true;
    }

  }


}

/*This function is called by taking as input a file path declared in the pathFiles structure in the structure.js file. 
The three cases are WIN, LOSE, DEAD. The function is called within the choice function, 
which handles user input in a loop, at points where one of these three conditions can occur.*/
async function endGame(codeExit){
  
  switch (codeExit){
    case endCases.WIN:
      await displayFileContent(pathFiles.WIN, colorMap.green);
      process.exit(0); //Exit from the program
      break;
    case endCases.LOSE:
      await displayFileContent(pathFiles.LOSE, colorMap.blue);
      process.exit(0); //Exit from the program
      break;
    case endCases.DEAD:
      await displayFileContent(pathFiles.DEAD, colorMap.red);
      process.exit(0); //Exit from the program
      break;
    default:
      break;
  }

} 



//This function needs to display at the user the possibility of his choices
export async function choice() {

  var player = Player.getInstance();
  let repeatInfo = true;  //boolean variable to understand if the information about the room should be displayed on the screen again."

  const actionsMap = {
    [actions.MOVE]: async (secondParameter) => {
      if (await conditionsToMove(secondParameter)){

        console.log(`You want to move ${secondParameter}`);
        player.move(secondParameter.toUpperCase());
        if (await winCondition()) {  //The only case in which the user could win (move out of the castle with the princess)
          endGame(endCases.WIN);
          return false;
        }else if ( await loseConditions() ){ //The only case in which the user could lose (move out of the castle without the princess)
          endGame(endCases.LOSE);
          return false;
        }
        repeatInfo = true;
        return true;
      } else {
        console.log("INVALID DIRECTION");
        repeatInfo = false;
        return true;
      }
    },
    [actions.PICK]: async (secondParameter) => {
      if(secondParameter && await conditionsToPick(secondParameter)){
        console.log(`You want to pick ${secondParameter}`);
        player.pick(secondParameter.toUpperCase());
        repeatInfo = false;
        return true;
      } else {
        console.log("INVALID OBJECT");
        repeatInfo = false;
        return true;
      }
    },
    [actions.DROP]: async (secondParameter) => {
      if (await conditionsToDrop(secondParameter)){
        console.log(`You want to drop ${secondParameter}`);
        player.drop(secondParameter.toUpperCase());
        repeatInfo = false;
        return true;
      }else{
        console.log("IT'S IMPOSSIBLE TO DROP");
        repeatInfo = false;
        return true;
      }

    },
    [actions.ATTACK]: async () => {

      if (await conditionsToAttack()){
        console.log(`You want to attack!`);
        player.attack();
        repeatInfo = false;
        return true;
      }else if (await deadCondition()){
        endGame(endCases.DEAD); //The only case in which the user could die
        return false;
      }else{
        console.log("IT'S IMPOSSIBLE TO ATTACK!");
        repeatInfo = false;
        return true;
      }
    },
    [actions.LOOK]: async () => {
      console.log("You want to LOOK");
      await player.look();
      repeatInfo = false;
      return true;
    },
    [actions.EXIT]: async () => {
      console.log("You want to EXIT");
      console.log("You exit from the program!!");
      return false;
    },
  };

  let repeatReq = true; //boolean variable to understand if the information about the input request should be displayed on the screen again."

  while (repeatReq) {

    if (repeatInfo){  //Information about current room and player (display only when the player changes room )
      await Player.getInstance().getRoom().displayRoomInfo();
      Player.getInstance().displayInfo();
      await player.takePrincess(); //Check if the player is in the princess's room
    }
    
    console.log("\n");
    let input = readlineSync.question("What do you want to do? "); //User input request
    console.log("\n");
    //Split input: It divides the input in the case of two parameters, where the first one will be the main command, and the second one will be either a direction or an object.
    let [choiceAction, secondParameter] = input.split(' '); 

    const selectedAction = actionsMap[choiceAction.toUpperCase()]; //

    if (selectedAction) {
      //The action map returns, depending on the cases, true if it needs to repeat the input request, false otherwise (only in cases where the game ends).
      repeatReq = await selectedAction(secondParameter);
    } else {
      /*
      This is the case when an input not present in the action map is entered. 
      It is necessary to specify that the information should not be displayed again,
       and an explanatory message will be shown.
      */ 
      repeatInfo = false;
      console.log("INVALID INPUT");
    }

    console.log("\n");
  }

}

//This function initializes the maze and the player
export async function initializeGame() {
  const prom = createPromiseForFunction;
  resetMazeInstance();
  await prom('initializeMaze')();
  resetPlayerInstance();
  await prom('initializePlayer')();
}

//This function is the only invocated in file index.js. It is used to start the entire game.
export async function beginGame() {

  await initializeGame();
  console.log("\n");
  await displayFileContent(pathFiles.PRINT, colorMap.red); //To show the drawing at the beginning
  console.log("\n");
  await displayFileContent(pathFiles.STORY, colorMap.magenta); //to show the game story
  console.log("\n");
  await displayFileContent (pathFiles.ROOMS, colorMap.yellow); //to show rooms' decsriptions
  console.log("\n");
  choice(); //The user starts playing


}