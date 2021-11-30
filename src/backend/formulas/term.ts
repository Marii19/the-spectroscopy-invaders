/**
 * A class representing CSS terms
 */
export default class term {
    term: string;   // The term as string

    // Creates CSS term instanz
    constructor(term: string){
        this.term = term
    }

    /**
     * COmpares two terms
     * @param compareObject 
     * @returns boolean
     */
    compare(compareObject): boolean{
       if(this.term == compareObject.term){
           return true;
       }else {
           return false;
       }
    }

    /**
     * Divides the term into multiple terms with + outside any () as separator
     * @returns 
     */
    divideTerm(): term[]{
        let depth: number = 0; //checks if there was an opening ()
        let cutAtIndex: number[] = [0];
        let divided: term[] = []

        // Find the indicies of every + outside of any () in the term
        for(let i = 0; i < this.term.length; i++){
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
        for (let i = 0; i < cutAtIndex.length-1; i++){
            let new_term = new term(this.term.substring(cutAtIndex[i],cutAtIndex[i+1]));
            if(new_term.term[0]=='('){
                new_term.term = new_term.term.substring(1,new_term.term.length-1);
            }
            divided.push(new_term);
        }

        // Get rid of the '+' at the beginning of each seperated term (except the first one)
        for(let i = 1; i < divided.length; i++){
            divided[i].term = divided[i].term.substring(1,divided[i].term.length);
        }

        return divided;
    }

    /**
     * Calculates all possible observation moves with given observation and returns target terms
     * @param observation The name of the action
     * @returns List of resulting terms. Empty list if no observation possible.
     */
    calculateMoves(observation: string): term[]{
        let resultingTerms: term[] = [];
        let dividedTerm = this.divideTerm();
        for(let sub_term of dividedTerm){
            if(sub_term.beginsWith(observation)){
                let new_term = new term(sub_term.term.substring(2,this.length()));
                if(new_term.term.charAt(0) == '('){
                    new_term.term = new_term.term.slice(1,-1);
                }
                resultingTerms.push(new_term);
            }
        }
        return resultingTerms;
    }

    /**
     * Checks if the term begins with given observation
     * @param observation action
     * @returns true if term begins with given observation, FALSE otherweise
     */
    beginsWith(observation: string): boolean{
        if(this.term.charAt(0) == observation){
            return true;
        }else {
            return false;
        }
    }

    /**
     * Calculate length of a term
     * @returns length
     */
    length(): number{
        return this.term.length;
    }

    


}