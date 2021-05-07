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
     * * Spectroscopy procedure algorithm
     * Calculates the cheapest distinguishing formulas for start state
     */
    calculateCheapestFormulas(){
        this.game.calculateWinningRegions();
        if(this.game.startState.winningRegion){
            this.game.startState.calculateWinningGraph();
        }
    }

    /**
     * Prints all states strating from start state
     */
    printTree(){
        this.game.startState.printAllChildren(0);
    }
}