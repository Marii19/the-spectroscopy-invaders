import GamePosition from "./game-position";
import term from "../formulas/term";

/**
 * A class representing spectroscopy game move
 */
export default class gameMove{
    startPosition: GamePosition;       // start position   
    targetPosition: GamePosition;      // target game position
    move: string;                   // game move as: negation = "-", conjunction challenge = "^", conjunction answer = "*", observation move = "a" (a is the name of action)

    /**
     * Creates game move instanz
     * @param startState    // Start position
     * @param move          // move
     * @param target        // target attacker position (only by observation moves)
     * @param moveType      // type of the move: "observation", "negation", "conjunction challenge", "conjunction answer"
     */
    constructor(startState: GamePosition,  move: string, target: term, moveType: string){
        this.startPosition = startState;
        this.move = move;
        // Create game position from attacker target state and game mmoove type
        this.targetPosition = this.calculateTargetState(target, moveType);   
    }

    /**
     * Creates target position form 
     * @param target 
     * @param moveType 
     * @returns 
     */
    calculateTargetState(target: term, moveType: string): GamePosition{
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
    calculateNegationTargetState(): GamePosition{
        return new GamePosition(this.startPosition.defender[0], [this.startPosition.player], "attacker")
    }

    /**
     * calculates conjunction state by changing the turn indicator
     * @returns Target state.
     */
    calculateConjunctionChallengeTargetState(): GamePosition{
        return new GamePosition(this.startPosition.player, this.startPosition.defender, "defender")
    }

    /**
     * Calculates conjunction answer target state and changes turn indicator
     * @param target
     * @returns Target state.
     */
     calculateConjunctionAnswerTargetState(target: term): GamePosition{
        return new GamePosition(this.startPosition.player, [target], "attacker")
    }


    /** 
        Calculates the target state
        Input: @param term player position after move as a term
        Output: Whole game State with all defender positions
    */
    calculateObservationTargetState(target: term): GamePosition{
        let defenderPositions = this.calculateObservationDefenderPositions();
        let new_state = new GamePosition(target, defenderPositions, "attacker")
        return new_state ;  
    }
    
   /**
    * Calculate defender positions after observation move
    * @returns defender positions
    */
    calculateObservationDefenderPositions(): term[]{
        let defenderPositions: term[] = [];
        for (let defenderPosition of this.startPosition.defender){
            if(defenderPosition.term.charAt(0)=="("){
                defenderPosition.term = defenderPosition.term.substring(1,defenderPosition.term.length -1);
            }
            let newPositions = defenderPosition.calculateMoves(this.move);
            for(let newPosition of newPositions){
                let is_duplicated = false;
                for(let defenderPosition of defenderPositions){
                    if(newPosition.term == defenderPosition.term){
                        is_duplicated = true;
                    }
                }
                if(!is_duplicated){
                    defenderPositions.push(newPosition)
                }
            }
        }
        return defenderPositions;
    }

}