import {gameState} from "./game-state"; 
import { term } from "./term";
import {gameMove} from "./game-move"
import { spectroscopyGame } from "./create-spectroscopy-game";
import {hmlFormula} from './hml-formula';

export type strat = {
     [key: string]: string[];
 }