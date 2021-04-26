export class term {
    term: string;

    constructor(term: string){
        this.term = term
    }

    // Function to compare two terms
    compare(){
       
    }

    
    /* 
    - Divides the term into by '+' outside any () 
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
        cutAtIndex.push(this.term.length)

        // Cut the term at every + at depth 0 and write it to divided
        for (i = 0; i < cutAtIndex.length-1; i++){
            divided.push(new term(this.term.substring(cutAtIndex[i],cutAtIndex[i+1])));
        }

        // Get rid of the '+' at the beginning of each seperated term (except the first one)
        for(i = 1; i < divided.length; i++){
            divided[i].term = divided[i].term.substring(1,divided[i].term.length);
        }

        return divided;
    }

    /**
     * Calculates all possible moves with given observation and returns target terms
     * @param observation 
     * @returns List of resulting terms. Empty list if no observation possible.
     */
    calculateMoves(observation: string){
        var resultingTerms: term[] = [];
        var dividedTerm = this.divideTerm();
        console.log("divided term for observation: " + this.term);
        console.log(dividedTerm)
        for(var sub_term of dividedTerm){
            if(sub_term.beginsWith(observation)){
                resultingTerms.push(new term(this.term.substring(1,this.length())));
            }
        }
        return resultingTerms;
    }

    /**
     * Checks if the term begins with given observation
     * @param observation
     * @returns TRUE if term begins with given observation, FALSE otherweise
     */
    beginsWith(observation: string){
        if(this.term.charAt(0) == observation){
            return true;
        }else {
            return false;
        }
    }

    /**
     * 
     * @returns length of the term
     */
    length(){
        return this.term.length;
    }
}