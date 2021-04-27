import {gameState} from "./game-state"; 
import { term } from "./term";

let p_0 = new term("a.(b.0+c.0)+a.d.0")
//let q_0 = new term("a.(b.0+d.0)+a.(c.0+d.0)")
// var q_0 = new term("b.0+c.0");
var q_0 = new term("b.0+d.0");
var q_1 = new term("c.0+d.0");

let startState = new gameState(p_0, [q_0,q_1], "defender");
var moves = startState.calculateDefenderMoves();
var str = JSON.stringify(moves, null, 4);
console.log(str);
