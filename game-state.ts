import {term} from "./term";
import {gameMove} from "./game-move" 

export class gameState {
    player: term;
    defender: term[];
    turn: string;

    constructor(p: term, Q: term[], turn: string){
        this.player = p;
        this.defender = Q;
        this.turn = turn;
    }

    // Function to compare if two gameState objects are equal
    compare(compareObjekt: gameState){
        if(this.player == compareObjekt.player && this.defender == compareObjekt.defender ){
            return true;
        } else {
            return false;
        }
    }

    /**
     * calculates all possible attacker moves
     * @returns List[gameMoves] of all possible attacker moves sorted by <a> > neg > ^ 
     */
    calculatePlayerMoves(){
        var playerMoves = this.calculateObservationMoves();

        // Checks wheather defender holds exactly 1 position
        if(this.defender.length == 1){
            playerMoves = playerMoves.concat(this.calculateNegationMove());
        }
        playerMoves = playerMoves.concat(this.calculateConjunctionChallengeMove());
        return playerMoves;
    }

    /**
     * Calculates all possible defender answers
     * @returns List[gameMoves] of all possible defender answers 
     */
    calculateDefenderMoves(){
        var defenderMoves = this.calculateConjunctionAnswerMoves();
        return defenderMoves;
    }

    /*
        Calculates all possible observation moves
        Output: String list containing all possible observation moves
    */
    calculateObservationMoves(){
        var observations: gameMove[] = [];

        // A list containing divided terms by + outside any ()
        var divided = this.player.divideTerm()
        
        // Collects all posible observation moves
        for(var sub_term of divided){
            var possibleObservation = new gameMove(this,sub_term.term.charAt(0),sub_term.term.substring(2,sub_term.term.length), "observation");
            observations.push(possibleObservation)
        }
        return observations;
    }

    /**
     * Calculates the negation move  
     * @returns negation gameMove object
     */
    calculateNegationMove(){
        return new gameMove(this, " Neg ", new term(" "), "negation");
    }

    /**
     * Calculates the attacket conjuntion challenge
     * @returns Conjunction challenge gameMove object
     */
    calculateConjunctionChallengeMove(){
        return new gameMove(this, " ^ ", new term(" "), "conjunction challeng");
    }

    /**
     * Calculates the defender conjunction answer
     * @returns List[gamemoves] conjunction answer moves
     */
    calculateConjunctionAnswerMoves(){
        var conjunctionAnswers: gameMove[] = [];
        for(var sub_term of this.defender){
            conjunctionAnswers.push(new gameMove(this, " * ", sub_term, "conjunction answer"));
        }
        return conjunctionAnswers;
    }

}