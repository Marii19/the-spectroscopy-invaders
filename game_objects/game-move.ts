import { NONE } from "phaser";
import { gameState } from "./game-state";
import {term} from "../formulas/term";

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
            } case "conjunction challenge": {
                return this.calculateConjunctionChallengeTargetState();
            } case "conjunction answer": {
                return this.calculateConjunctionAnswerTargetState(target);
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
    calculateConjunctionChallengeTargetState(){
        return new gameState(this.startState.player, this.startState.defender, "defender")
    }

    /**
     * Calculates conjunction answer target state and changes turn indicator
     * @param target
     * @returns Target state.
     */
     calculateConjunctionAnswerTargetState(target: term){
        return new gameState(this.startState.player, [target], "attacker")
    }


    /** 
        Calculates the target state
        Input: @param term player position after move as a term
        Output: Whole game State with all defender positions
    */
    calculateObservationTargetState(target: term){
        let defenderPositions = this.calculateObservationDefenderPositions();
        return new gameState(target, defenderPositions, "attacker");
    }
    
    /**
     * Calculates the defender position after move
     */
    calculateObservationDefenderPositions(){
        let defenderPositions: term[] = [];
        for (let defenderPosition of this.startState.defender){
            if(defenderPosition.term.charAt(0)=='('){
                defenderPosition.term = defenderPosition.term.slice(1,-1);
            }
            defenderPositions = defenderPositions.concat(defenderPosition.calculateMoves(this.move));
        }
        return defenderPositions;
    }

}