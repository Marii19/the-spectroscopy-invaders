import {gameState} from "../game_objects/game-state"; 
import { term } from "../formulas/term";
import {gameMove} from "../game_objects/game-move"
import { NONE } from "phaser";

export class spectroscopyGame {
    startState: gameState;

    constructor(player: term, defender: term[], turn: string){      
        var startState = new gameState(player, defender, "attacker");
        this.startState = startState;
        this.startState.visitedStates.push(startState)
        this.createSpectroscopyGame(startState);

        // Calculates winning regions and winning graph
        this.calculateWinningRegions();
        this.startState.calculateWinningGraph();
    }

    createSpectroscopyGame(startState: gameState){
        console.log("hallo")
        var moves: gameMove[] = [];
        var moves_queue: gameMove[] = [];
        // Calculate moves for either attacker or defender  
        if(startState.turn == "attacker"){
            moves = startState.calculatePlayerMoves();
            startState.getChildrenFromMoves(moves);
        }else{
            moves = startState.calculateDefenderMoves();
            startState.getChildrenFromMoves(moves);
        } 
        moves_queue = moves;
        // Pop one move from the queue and calculate its next moves
        while(moves_queue.length != 0){
            var move = moves_queue.shift();
            var new_moves = this.createSpectroscopyGame(move.targetState)
            moves = moves.concat(new_moves);
        }
        return moves;
    }


    
    // removeDuplicates(moves: gameMove[], visitedStates: gameState[]){
    //     var temp_moves = moves;
    //     for(var move of moves){
    //         if(visitedStates.some(elem => elem.compare(move.targetState))){
    //             if(!move.targetState.isZeroState()){
    //                 temp_moves.splice(temp_moves.indexOf(move), 1);
    //             }
    //         }
    //     }
    //     return temp_moves;
    // }

    /**
     * Check if startState is a winning region
     * @returns True if winning region, false else
     */
    calculateWinningRegions(){
        return this.startState.isWinningRegion()
    }

    
}

