import formulaPrice from './formula-price';

/**
 * Class to represent a HML Formula with its price
 */
export default class hmlFormula{
    formula: string;            // The formula as string
    price: formulaPrice;        // formula price
    observations: string[];     // to what observation languages does this formula belongs

    /**
     * Constructor for the hmlFormula
     * Calculates formula price immediately
     * @param formula 
     */
    constructor(formula){
        this.formula = formula;
        this.price = new formulaPrice(this.formula);
        this.observations = this.calculateObservation();
    }

    /**
     * Checks if this dominates a given hmlFormula
     * @param compareObj 
     * @returns 1 if dominates, -1 if no, 0 no relation
     */
    dominates(compareObj: hmlFormula){
        let this_array = this.price.asArray();
        let compare_array = compareObj.price.asArray();
        let dominates = 0;
        let dominated = 0;
        let same = 0;
  
        for(let i = 0; i<4; i++){
            if(this_array[i]<=compare_array[i]){
                dominates +=1;
            }
            if(this_array[i]>=compare_array[i]){
                dominated +=1;
            }
            if(this_array[i]==compare_array[i]){
                same +=1;
            }
        }

        if(same == 4){
            if(this_array[4]<compare_array[4]){
                return 1;
            }
            return 0;
        }
        if(dominates == 4){
            return 1;
        }else if(dominated == 4){
            return -1;
        }else{
            return 0;
        }
    }

    /**
     * calculates to which observation languages does the formula belongs
     * @returns 
     */
    calculateObservation(){
        let observations: string[] = []
        if(this.price.conjunctions == 0 && this.price.positiveBranches == 0  && this.price.negations == 0 && this.price.negationsHeight == 0){
            observations.push('Trace');
        }else if(this.price.conjunctions <= 1 && this.price.positiveBranches == 0  && this.price.negations <= 1 && this.price.negationsHeight <= 1){
            observations.push('Failure');
        }else if(this.price.conjunctions <= 1 && this.price.negations <= 1){
            observations.push('Possible-future');
        }else if(this.price.negations > 0){
            observations.push('Bisimulation');
        }
        if(this.price.negations == 0){
            observations.push('Simulation');
        }
        return observations;
    }

    /**
     * Deletes duplicates in this formula from every conjunction 
     */
    deleteDuplicates(): void{
        // If the formula includes a conjunctions, deletes doplicates from them
        if(this.formula.includes("^")){
            this.formula = this.deleteDuplicatesWithConjunctions(this.formula);
        }
        
        // update formula price (observations/ positive branches might have decreased)
        this.price = new formulaPrice(this.formula);
    }

    /**
     * Deletes duplicates from conjunctions for a given formula
     * @param formula formula as string
     * @returns formula without duplicates in conjunctions
     */
    deleteDuplicatesWithConjunctions(formula: string): string{
        let begin_conjunctions: string[] = this.separateBeginFromConjunction(formula)
        let subformulas: string[] = this.price.divideFormula(begin_conjunctions[1]);

        for(let subformula of subformulas){
            if(subformula.includes("^")){
                subformulas[subformulas.indexOf(subformula)] = this.deleteDuplicatesWithConjunctions(subformula);
            }
        }

        let non_duplicates: string[] = []
        let duplicates;
        for(let subformula of subformulas){
            duplicates = false;
            for(let non_duplicate of non_duplicates){
                if(this.equal(subformula, non_duplicate)){
                    duplicates = true;
                }
            }
            if(!duplicates){
                non_duplicates.push(subformula);
            }
        }

        return begin_conjunctions[0] + "^{" + non_duplicates.join(",") + "}";
    }

    /**
     * Compare this formula to given formula. Returns true if the formulas have different orders in conjunctions but still contain same subformulas.
     * @param compare_obj 
     * @returns boolean
     */
    compare(compare_obj: hmlFormula): boolean{
        let formula_1: string = this.formula;
        let formula_2: string = compare_obj.formula;
        return this.equal(formula_1, formula_2);
    }

    /**
     * For two formulas (string), returns true if they are exactly the same
     * @param formula_1 
     * @param formula_2 
     * @returns boolean
     */
    same(formula_1: string, formula_2: string): boolean{
        if(formula_2.length != formula_1.length){
            return false;
        }
        for(let i = 0; i < formula_1.length; i++){
            if(formula_1[i] != formula_2[i]){
                return false;
            }
        }
        return true;
    }

    /**
     * For two formulas (string), return true if they contain same subformulas in conjunctions, but in different orders.
     * @param formula_1 
     * @param formula_2 
     * @returns boolean
     */
    equal(formula_1: string, formula_2: string): boolean{
        if(formula_1.length != formula_2.length){
            return false;
        }
        if(!formula_1.includes("^")){
            return this.same(formula_1, formula_2);
        }
        let begin_1_conjuntion: string[] = this.separateBeginFromConjunction(formula_1);
        let begin_2_conjuntion: string[] = this.separateBeginFromConjunction(formula_2);

        if(!this.same(begin_1_conjuntion[0], begin_2_conjuntion[0])){
            return false;
        }
        
        let subformulas_1: string[] = this.price.divideFormula(begin_1_conjuntion[1]);
        let subformulas_2: string[] = this.price.divideFormula(begin_2_conjuntion[1]);

        let same_found: boolean;
        for(let subformula_1 of subformulas_1){
            same_found = false;
            for(let subformula_2 of subformulas_2){
                if(this.equal(subformula_1, subformula_2)){
                    same_found = true;
                    subformulas_2.splice(subformulas_2.indexOf(subformula_2), 1)   
                    break;
                }
            }
            if(!same_found){
                return false;
            }
        }
        if(subformulas_2.length == 0){
            return true;
        }else{
            return false;
        }
    }

    /**
     * For a given formula (string), separates observations before first conjunction (^) from the content of the conjunction
     * @param formula 
     * @returns a set containing seperated formula
     */
    separateBeginFromConjunction(formula: string): string[]{

        let index = 0;
        for(let i = 0; i < formula.length; i++){
            if(formula[i] == "{"){
            break;
            }
            index ++;
        }
        return [formula.slice(0, index -1), formula.slice(index + 1, -1)]
    }
}