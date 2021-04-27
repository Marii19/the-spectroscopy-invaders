import {gameState} from "./game-state"; 
import { term } from "./term";
import {gameMove} from "./game-move"



let zeroTerm: term = new term("0");

export class spectroscopyGame {
    allStates: gameState[];

    constructor(player: term, defender: term[], turn: string){
        this.allStates = [];
        var startState = new gameState(p_0, [q_0,q_1], "attacker");
        this.createSpectroscopyGame(startState,4);
        startState.printAllChildren(0);
    }

    createSpectroscopyGame(startState: gameState, depth: number){
        if(depth <= 0){
            return [];
        }else{
            depth -=1;
        }
        var moves: gameMove[] = [];
        var moves_queue: gameMove[] = [];
        // Calculate moves for either attacker or defender  
        if(startState.turn == "attacker"){
            moves = startState.calculatePlayerMoves(this);
            startState.getChildrenFromMoves(moves);
        }else{
            moves = startState.calculateDefenderMoves(this);
            startState.getChildrenFromMoves(moves);
        } 
        moves_queue = moves;
        // Pop one move from the queue and calculate its next moves
        while(moves_queue.length != 0){
            var move = moves_queue.shift();
            var new_moves = this.createSpectroscopyGame(move.targetState, depth)
            moves = moves.concat(new_moves);
        }
        return moves;
    }


    removeDuplicates(moves: gameMove[]){
        var temp_moves = moves;
        for(var move of moves){
            if(this.allStates.some(elem => elem.compare(move.targetState))){
                // DO NOT REMOVE  (0,{0}) or (0,{}) states
                if(!move.targetState.isZeroState()){
                    temp_moves.splice(temp_moves.indexOf(move), 1);
                }
            }
        }
        return temp_moves;
    }
}

/**
 * ROOM FOR CCS TERMS
 */
// *Initial state
// let p_0 = new term("a.(b.0+c.0)+a.d.0")
// let q_0 = new term("a.(b.0+d.0)+a.(c.0+d.0)")

// *1-st nested children
var p_0 = new term("b.0+c.0");
var q_0 = new term("b.0+d.0");
var q_1 = new term("c.0+d.0");

// *Testing
// var p_0 = new term("0");
// var q_0 = new term("0");
new spectroscopyGame(p_0, [q_0,q_1], "attacker");