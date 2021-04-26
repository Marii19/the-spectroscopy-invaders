import { gameState } from "./game-state";
import {term} from "./term";

export class gameMove{
    startState: gameState;
    targetState: gameState;
    // TODO how to save the choosen move?? 
    move: string;

    constructor(startState: gameState,  move: string, target: term){
        this.startState = startState;
        this.move = move;
        this.targetState = this.calculateTargetState(target);
        
    }

    /** 
        Calculates the target state
        Input: @param term player position after move as a term
        Output: Whole game State with all defender positions
    */
    calculateTargetState(target: term){
        var defenderPositions = this.calculateDefenderPositions();
        return new gameState(target, defenderPositions);
    }
    
    /**
     * Calculates the defender position after move
     */
    calculateDefenderPositions(){
        var defenderPositions: term[] = [];
        for (var defenderPosition of this.startState.defender){
            defenderPositions = defenderPositions.concat(defenderPosition.calculateMoves(this.move));
        }
        return defenderPositions;
    }

}