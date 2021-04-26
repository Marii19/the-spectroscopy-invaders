import { gameState } from "./game-state";
import { term } from "./term";
import {gameMove} from "./game-move"

var a = new term("a.0+b.0");
var p = new term("b.0+c.0");
var q = new term("b.0+d.0");
var q1 = new term("c.0+d.0");
var t = new term("0");
var start = new gameState(p,[q,q1]);
var move = new gameMove(start, "b", t)
//console.log(move.calculateDefenderPositions())