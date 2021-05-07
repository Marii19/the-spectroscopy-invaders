import {gameState} from "./game-state"; 
import { term } from "./term";
import {gameMove} from "./game-move"
import { spectroscopyGame } from "./create-spectroscopy-game";



export class spectroscopyProcedure {
    game: spectroscopyGame;

    constructor(player: term, defender: term[], turn: string){
        this.game = new spectroscopyGame(player, defender, turn);
    }

    /**
     * Calls calculate winning regions for game.
     */
    calculateWinningRegions(){
        this.game.calculateWinningRegions();
    }

    /**
     * Prints all states strating from start state
     * 
     */
    printTree(){
        this.game.startState.printAllChildren(0);
    }
}