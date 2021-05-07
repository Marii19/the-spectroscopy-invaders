import {gameState} from "./game-state"; 
import { term } from "./term";
import {gameMove} from "./game-move"
import { spectroscopyGame } from "./create-spectroscopy-game";
import { spectroscopyProcedure } from "./spectroscopy-procedure";



/**
 * ROOM FOR CCS TERMS
 */
// *Initial state
// let p = new term("a.(b.0+c.0)+a.d.0")
// let q = new term("a.(b.0+d.0)+a.(c.0+d.0)")

// *1-st nested children
var p_0 = new term("b.0+c.0");
var p_1 = new term("d.0");
var q_0 = new term("b.0+d.0");
var q_1 = new term("c.0+d.0");

// *Testing
// var p_0 = new term("0");
// var q_0 = new term("0");


var spectroscopy = new spectroscopyProcedure(p_1, [q_0,q_1], 'attacker');
spectroscopy.calculateWinningRegions();
spectroscopy.printTree();