import { NONE } from "phaser";
import { gameState } from "./game-state";
import {term} from "./term";

export class gameMove{
    startState: gameState;
    targetState: gameState;
    // TODO how to save the choosen move?? 
    move: string;

    constructor(startState: gameState,  move: string, target: term, moveType: string){
        this.startState = startState;
        this.move = move;
        this.targetState = this.calculateTargetState(target, moveType);
        
    }

    calculateTargetState(target: term, moveType: string){
        switch(moveType){
            case "observation": {
                return this.calculateObservationTargetState(target);
            } case "negation": {
                return this.calculateNegationTargetState();
            } case "conjunction": {
                return this.calculateConjunctionTargetState();
            }
        }
    }

    /**
     * Creates target state by switching player and defender fields
     * @param  
     * @returns Target state.
     */
    calculateNegationTargetState(){
        return new gameState(this.startState.defender[0], [this.startState.player], "attacker")
    }

    /**
     * calculates conjunction state by changing the turn indicator
     * @returns Target state.
     */
    calculateConjunctionTargetState(){
        return new gameState(this.startState.player, this.startState.defender, "defender")
    }
    /** 
        Calculates the target state
        Input: @param term player position after move as a term
        Output: Whole game State with all defender positions
    */
    calculateObservationTargetState(target: term){
        var defenderPositions = this.calculateObservationDefenderPositions();
        return new gameState(target, defenderPositions, "attacker");
    }
    
    /**
     * Calculates the defender position after move
     */
    calculateObservationDefenderPositions(){
        var defenderPositions: term[] = [];
        for (var defenderPosition of this.startState.defender){
            defenderPositions = defenderPositions.concat(defenderPosition.calculateMoves(this.move));
        }
        return defenderPositions;
    }

}