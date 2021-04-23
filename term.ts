export class term {
    term: string;

    constructor(term: string){
        this.term = term
    }

    // Function to compare two terms
    compare(){
       
    }

    /*  Calculates all possible player moves
        WARNING!: works only on terms with max. 1 ()
        Input: CSS player state as a String
        Output: List of all possible attacker moves sorted by <a> > ¬ > ^
    */
    
    divideTerm(){
        var depth = 0; //checks if there was an opening ()
        var cutAtIndex = [0];
        var divided = []

        // Find the indicies of every + outside of any () in the term
        for(var i = 0; i < this.term.length; i++){
            switch(this.term.charAt(i)){
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
        cutAtIndex.push(this.term.length-1)

        // Cut the term at every + at depth 0 and write it to divided
        for (i = 0; i < cutAtIndex.length-1; i++){
            divided.push(new term(this.term.substring(cutAtIndex[i],cutAtIndex[i+1])));
        }

        // Get rid of the '+' at the beginning of each seperated term (except the first one)
        for(i = 1; i < divided.length; i++){
            divided[i].term = divided[i].term.substring(1,divided[i].term.length-1);
        }

        return divided;
    }
}