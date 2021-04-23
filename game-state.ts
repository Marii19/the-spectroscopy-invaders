import {term} from "./term"; 

export class gameState {
    player: term;
    defender: term[];

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
        Input: CSS player state as a String
        Output: List of all possible attacker moves sorted by <a> > ¬ > ^
    */
    calculatePlayerMoves(){
        var observations: string[];
        var divided = this.player.divideTerm()
        console.log(divided);
    }

}