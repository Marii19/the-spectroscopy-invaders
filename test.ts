import {gameState} from "./game_objects/game-state"; 
import { term } from "./formulas/term";
import {gameMove} from "./game_objects/game-move"
import { spectroscopyGame } from "./spectroscopy/create-spectroscopy-game";
import { spectroscopyProcedure } from "./spectroscopy/spectroscopy-procedure";
import {hmlFormula} from "./formulas/hml-formula"

var p = new term("b.0");
var q = new term("a.0");
var q1 = new term("c.0+d.0");
var q2 = new term("c.0+d.0");
var t = new term("0");
//var start = new gameState(p,[q], "attacker");
// console.log(start.calculatePlayerMoves())
//console.log(start.createString(2));

// let allStates: gameState[] = [];
// var test = new gameState(p,[q,q1], "attacker");
// var test1 = new gameState(p,[q,q2], "attacker");
// allStates.push(test);
// console.log(allStates.some(elem => elem.compare(test1)));



var start = new gameState(q,[p],"attacker");

// var c = test1;
// var a = test;
// var b = test;

// console.log(a == c)

var strats = new Map();


// var game = new spectroscopyGame(q,[p],"attacker");
// game.calculateWinningRegions();
// game.startState.calculateWinningGraph();

// var test = game.startState.children[0];
// var test1 = game.startState.children[1];

// strats.set(test1,[new hmlFormula('b')]);
// strats.set(test,[new hmlFormula('')])

// var strat = game.startState.calculateStrats(strats);

var form1 = new hmlFormula('a-b'); //failure - equ
console.log(form1.price.asArray());
var form2 = new hmlFormula('a^{c,-b,d}'); // trace

 console.log(form2.price.asArray());

 // var spec = new spectroscopyProcedure(q,[p],"attacker");
 console.log(form1.dominates(form2));

