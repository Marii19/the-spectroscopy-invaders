export class gameState {
    player: string;
    defender: string[];

    constructor(p: string, Q: string[]){
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
        var observations: [string];
        this.divideTerm(this.player);
    }

    divideTerm(term: string){
        var depth = 0; //checks if there was an opening ()
        var cutAtIndex = [];
        console.log(term)
        for(var i = 0; i < this.player.length; i++){
            switch(this.player.charAt(i)){
                case '(': {
                    depth += 1;
                    break;
                }
                case ')': {
                    depth -= 1;
                    break;
                }
                case '+':{
                    if(depth == 0){
                        cutAtIndex.push(i)
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        };
        console.log(cutAtIndex);
    }



}