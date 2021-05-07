import { gameState } from "./game-state";
import { term } from "./term";
import {gameMove} from "./game-move"
import {formulaPrice} from "./formula-price"

// var a = new term("a.0+b.0");
// var p = new term("b.0+c.0");
// var q = new term("b.0+d.0");
// var q1 = new term("c.0+d.0");
// var q2 = new term("c.0+d.0");
// var t = new term("0");
//var start = new gameState(p,[q], "attacker");
// console.log(start.calculatePlayerMoves())
//console.log(start.createString(2));

// let allStates: gameState[] = [];
// var test = new gameState(p,[q,q1], "attacker");
// var test1 = new gameState(p,[q,q2], "attacker");
// allStates.push(test);
// console.log(allStates.some(elem => elem.compare(test1)));

var hml = "a-ad"
var price = new formulaPrice(hml)
console.log(price);