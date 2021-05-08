import { gameState } from "./game-state";
import { term } from "./term";
import {gameMove} from "./game-move"
import {formulaPrice} from "./formula-price"
import {hmlFormula} from './hml-formula'
import {spectroscopyGame} from "./create-spectroscopy-game"
import { spectroscopyProcedure } from "./spectroscopy-procedure";

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

var form1 = new hmlFormula('a^{c,b}');
console.log(form1.price.asArray());
var form2 = new hmlFormula('a^{-b,-c}');
console.log(form2.price.asArray());

// var spec = new spectroscopyProcedure(q,[p],"attacker");
// console.log(spec.nonDominated([form1, form2]));

