import {gameState} from "./game-state"; 
import { term } from "./term";

let p_0 = new term("a.(b.0+c.0)+a.d.0")
let q_0 = new term("a.(b.0+d.0)+a.(c.d.0)")

let startState = new gameState(p_0, [q_0]);

