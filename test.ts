import {gameState} from "./game_objects/game-state"; 
import { term } from "./formulas/term";
import {gameMove} from "./game_objects/game-move"
import { spectroscopyGame } from "./spectroscopy/create-spectroscopy-game";
import { spectroscopyProcedure } from "./spectroscopy/spectroscopy-procedure";
import {hmlFormula} from "./formulas/hml-formula"



let p = new term("b.0");
let q = new term("a.0");
let q1 = new term("c.0+d.0");
let q2 = new term("c.0+d.0");
let t = new term("0");

let a = new hmlFormula('a-d');
console.log(a.price.asArray());
let b = new hmlFormula('a^{-b,-c}');
console.log(b.price.asArray());


