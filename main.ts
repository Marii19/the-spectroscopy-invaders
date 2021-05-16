import {gameState} from "./game_objects/game-state"; 
import { term } from "./formulas/term";
import {gameMove} from "./game_objects/game-move"
import { spectroscopyGame } from "./spectroscopy/create-spectroscopy-game";
import { spectroscopyProcedure } from "./spectroscopy/spectroscopy-procedure";
import {hmlFormula} from "./formulas/hml-formula"
import {attacker} from "./player/attacker";



/**
 * ROOM FOR CCS TERMS
 */
// *Initial state
let p = new term("a.(b.0+c.0)+a.d.0")
let q = new term("a.(b.0+d.0)+a.(c.0+d.0)")

// *1-st nested children

var p_0 = new term("b.0+c.0");
var d_0 = new term("b.0+d.0");
var d_1 = new term("c.0+d.0");

// var p_0 = new term("d.0");
// var d_0 = new term("b.0+d.0");
// var d_1 = new term("c.0+d.0");

// *Testing
// var p_0 = new term("a.b.0");
// var q_0 = new term("a.c.0");

console.log("starting...")
var spectroscopy = new spectroscopyProcedure(p, [q], 'attacker', true);
// spectroscopy.game.startState.printAllChildren(0)
var strats: hmlFormula[] = spectroscopy.calculateCheapestFormulas();

for(var strat of strats){
    console.log(strat.formula)
}

var player = new attacker(spectroscopy.game, p, [q], "attacker");
player.addAttackerMove('a', "b.0+c.0");
player.addAttackerMove("^", 'b.0+c.0');
player.addDefenderMove();
player.addAttackerMove("-", 'c.0+d.0');
player.addAttackerMove("d", '0');
//player.playerStartState.printWinningChildren(0);
player.movesToFormel();

