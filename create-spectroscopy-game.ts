import {gameState} from "./game-state"; 
import { term } from "./term";

// let p_0 = new term("a.(b.0+c.0)+a.d.0")
// let q_0 = new term("a.(b.0+d.0)+a.(c.d.0)")
var q_0 = new term("b.0+c.0");
var p_0 = new term("b.0+d.0");
var p_1 = new term("c.0+d.0");

let startState = new gameState(q_0, [p_0,p_1]);
var observationMoves = startState.calculateObservationMoves();
console.log(observationMoves);
