import {gameState} from "./game_objects/game-state"; 
import { term } from "./formulas/term";
import {gameMove} from "./game_objects/game-move"
import { spectroscopyGame } from "./spectroscopy/create-spectroscopy-game";
import { spectroscopyProcedure } from "./spectroscopy/spectroscopy-procedure";
import {hmlFormula} from "./formulas/hml-formula"

let p = new term("b.0");
let q = new term("a.0");
let q1 = new term("c.0+d.0");
let q2 = new term("c.0+d.0");
let t = new term("0");
//let start = new gameState(p,[q], "attacker");
// console.log(start.calculatePlayerMoves())
//console.log(start.createString(2));

// let allStates: gameState[] = [];
// let test = new gameState(p,[q,q1], "attacker");
// let test1 = new gameState(p,[q,q2], "attacker");
// allStates.push(test);
// console.log(allStates.some(elem => elem.compare(test1)));



let start = new gameState(q,[p],"attacker");

// let c = test1;
// let a = test;
// let b = test;

// console.log(a == c)

let strats = new Map();


// let game = new spectroscopyGame(q,[p],"attacker");
// game.calculateWinningRegions();
// game.startState.calculateWinningGraph();

// let test = game.startState.children[0];
// let test1 = game.startState.children[1];

// strats.set(test1,[new hmlFormula('b')]);
// strats.set(test,[new hmlFormula('')])

// let strat = game.startState.calculateStrats(strats);

let form1 = new hmlFormula('a^{-b^{a}, b^{b}}'); //failure - equ
console.log(form1.price.asArray());
let form2 = new hmlFormula('a^{c,-b}'); // trace

 console.log(form2.price.asArray());

 // let spec = new spectroscopyProcedure(q,[p],"attacker");
 console.log(form1.dominates(form2));

