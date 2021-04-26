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

    /*  Calculates all possible player moves
        WARNING!: works only on terms with max. 1 ()
        Output: List of all possible attacker moves sorted by <a> > ¬ > ^
    */
    calculatePlayerMoves(){
        var playerMoves = this.calculateObservationMoves();

        // Checks wheather defender holds exactly 1 position
        if(this.defender.length == 1){
            playerMoves = playerMoves.concat(this.calculateNegationMove());
        }
        playerMoves = playerMoves.concat(this.calculateConjunctionMove());
        return playerMoves;
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

    calculateNegationMove(){
        return new gameMove(this, " Neg ", new term(" "), "negation");
    }

    calculateConjunctionMove(){
        return new gameMove(this, " ^ ", new term(" "), "conjunction");
    }

}