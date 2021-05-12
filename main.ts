import {gameState} from "./game-state"; 
import { term } from "./term";
import {gameMove} from "./game-move"
import { spectroscopyGame } from "./create-spectroscopy-game";
import { spectroscopyProcedure } from "./spectroscopy-procedure";
import {hmlFormula} from "./hml-formula"



/**
 * ROOM FOR CCS TERMS
 */
// *Initial state
let p = new term("a.b.c.0+a.(b.c.0+b.0)")
let q = new term("a.(b.c.0+b.0)")

// *1-st nested children

// var p_0 = new term("b.0+c.0");
// var d_0 = new term("b.0+d.0");
// var d_1 = new term("c.0+d.0");

// var p_0 = new term("d.0");
// var d_0 = new term("b.0+d.0");
// var d_1 = new term("c.0+d.0");

// *Testing
// var p_0 = new term("a.b.0");
// var q_0 = new term("a.c.0");

console.log("starting...")
var spectroscopy = new spectroscopyProcedure(p, [q], 'attacker');
// spectroscopy.game.startState.printAllChildren(0)
var strats: hmlFormula[] = spectroscopy.calculateCheapestFormulas();

for(var strat of strats){
    console.log(strat.formula)
}

