import {term} from "./term";
import {gameMove} from "./game-move" 

export class gameState {
    player: term;
    defender: term[];
    //TODO add turn indicator
    //turn: string;

    constructor(p: term, Q: term[]){
        this.player = p;
        this.defender = Q;
        this.calculatePlayerMoves();
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
        var playerMoves = [];
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
            var possibleObservation = new gameMove(this,sub_term.term.charAt(0),sub_term.term.substring(2,sub_term.term.length));
            observations.push(possibleObservation)
        }
        return observations;
    }

}