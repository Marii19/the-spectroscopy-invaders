import {gameState} from "./game-state"; 
import { term } from "./term";
import {gameMove} from "./game-move"



let zeroTerm: term = new term("0");

export class spectroscopyGame {
    startState: gameState;

    constructor(player: term, defender: term[], turn: string){      
        var startState = new gameState(p_0, [q_0], "attacker");
        this.startState = startState;
        this.startState.visitedStates.push(startState)
        this.createSpectroscopyGame(startState);
        startState.printAllChildren(0);
    }

    createSpectroscopyGame(startState: gameState){
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


    removeDuplicates(moves: gameMove[], visitedStates: gameState[]){
        var temp_moves = moves;
        for(var move of moves){
            if(visitedStates.some(elem => elem.compare(move.targetState))){
                // DO NOT REMOVE  (0,{0}) or (0,{}) states
                if(!move.targetState.isZeroState()){
                    temp_moves.splice(temp_moves.indexOf(move), 1);
                }
            }
        }
        return temp_moves;
    }

    /**
     * Check if startState is a winning region
     * @returns True if winning region, false else
     */
    calculateWinningRegions(){
        return this.startState.isWinningRegion()
    }

    
}

/**
 * ROOM FOR CCS TERMS
 */
// *Initial state
// let p_0 = new term("a.(b.0+c.0)+a.d.0")
// let q_0 = new term("a.(b.0+d.0)+a.(c.0+d.0)")

// *1-st nested children
var p_0 = new term("a.b.0");
var q_0 = new term("a.c.0");
var q_1 = new term("c.0+d.0");

// *Testing
// var p_0 = new term("0");
// var q_0 = new term("0");
var game = new spectroscopyGame(p_0, [q_0], "attacker");
game.calculateWinningRegions();
