import hmlFormula from "./hml-formula";

/**
 * A class that represents the price of a formula
 */
export default class formulaPrice{
    conjunctions: number;           // Conjunctions dimension
    positiveBranches: number;       // positive branches dimension (deep + flat positive branches)
    negations: number;              // negations dimension
    negationsHeight: number;        // negation height dimension
    observations: number;           // observations dimension

    /**
     * Constructs a formula price instanz
     * @param formula HML formula 
     */
    constructor(formula: string){
        this.conjunctions = this.calculateConjunctions(formula, 0);
        // Positive branches are equal to deep positive branches + flat positive branches
        this.positiveBranches = this.calculatePositiveFlatBranches(formula) + this.calculatePositiveDeepBranches(formula);
        this.negations = this.calculateNegations(formula);
        this.negationsHeight = this.calculateNegationsHeight(formula, false);
        this.observations = this.calculateObservations(formula);
    }

    /**
     * Calculates maximal number of conjunctions. 
     * @param formula 
     * @param depth 
     * @returns 
     */
    calculateConjunctions(formula: string, depth: number): number{
        let conjunctionCount: number = 0;
        let temp_formula: string = formula;
        while(temp_formula != ''){
            let move: string = temp_formula.charAt(0);
            temp_formula = temp_formula.slice(1,temp_formula.length);
            switch(move) {
                case '-': {
                    if(depth == 0){
                        conjunctionCount += 1;
                    }
                    break;
                }
                case '^': {
                    conjunctionCount += 1;
                    temp_formula = temp_formula.slice(1,temp_formula.length-1);
                    let sub_formulas: string[] = this.divideFormula(temp_formula);
                    let temp_count_max:number = 0;
                    for(let sub_formula of sub_formulas){
                        let temp_count = this.calculateConjunctions(sub_formula, depth + 1);
                        if(temp_count > temp_count_max){
                            temp_count_max = temp_count
                        }
                    }
                    conjunctionCount += temp_count_max;
                    temp_formula = '';
                    break;
                }
                default: {
                    depth +=1
                    if((temp_formula.length > 1) && (temp_formula.charAt(0)=='-')){
                        conjunctionCount +=1;
                    }
                    break;
                }
            }
        }
        return conjunctionCount;
    }

    /**
     * Calculates maximal number of flat positive branches under a conjunction
     * @param formula 
     * @returns 
     */
    calculatePositiveDeepBranches(formula: string): number{
        let deepBranchesCount: number = 0;
        let temp_formula: string = formula.slice();

        if(temp_formula.includes('^')){
            temp_formula = temp_formula.slice(temp_formula.indexOf('^') + 2, -1);
            let branches: string[] = this.divideFormula(temp_formula);
            let deep_positive_branchse: string[] = this.getPositiveDeepBranches(branches);
            deepBranchesCount = deep_positive_branchse.length;
            for(let branch of branches){
                let temp_count: number = this.calculatePositiveDeepBranches(branch);
                if(temp_count > deepBranchesCount){
                    deepBranchesCount = temp_count;
                }
            }
        }else {
            return 0;
        }
        
        return deepBranchesCount;
    }

    /**
     * Calculates maximal number of flat positive branches under a conjunction
     * @param formula 
     * @returns 
     */
    calculatePositiveFlatBranches(formula: string): number{
        let flatBranchesCount: number = 0;
        let temp_formula: string = formula.slice();
        
        if(temp_formula.includes('^')){
            temp_formula = temp_formula.slice(temp_formula.indexOf('^')+2,-1);
            let branches: string[] = this.divideFormula(temp_formula);
            let deep_positive_branchse: string[] = this.getPositiveFlatBranches(branches);
            flatBranchesCount = deep_positive_branchse.length;
            for(let branch of branches){
                let temp_count: number = this.calculatePositiveFlatBranches(branch);
                if(temp_count > flatBranchesCount){
                    flatBranchesCount = temp_count;
                }
            }
        }else {
            return 0;
        }
        
        return flatBranchesCount;
    }

    /**
     * Calculates how often on runs into a negation when descending the syntax tree of a formula
     * @param formula 
     * @returns 
     */
    calculateNegations(formula: string): number{
        let negations_count: number = 0;
        let temp_formula: string = formula.slice();

        while(temp_formula != ''){
            let move: string = temp_formula.charAt(0);
            temp_formula = temp_formula.slice(1,temp_formula.length);
            switch(move) {
                case '-': {
                    negations_count += 1;
                    break;
                }
                case '^': {
                    temp_formula = temp_formula.slice(1,temp_formula.length-1);
                    let sub_formulas: string[] = this.divideFormula(temp_formula);
                    let temp_count_max: number = 0;
                    for(let sub_formula of sub_formulas){
                        let temp_count: number = this.calculateNegations(sub_formula);
                        if(temp_count > temp_count_max){
                            temp_count_max = temp_count
                        }
                    }
                    negations_count += temp_count_max;
                    temp_formula = '';
                    break;
                }
                default: {
                    break;
                }
            }
        }
        return negations_count;
    }

    /**
     * Calculates recursively maximal formula height under each negation
     * @param formula 
     * @param count_start indicates if one should start counting by now
     * @returns 
     */
    calculateNegationsHeight(formula: string, count_start: boolean){
        let negations_height_count: number = 0;
        let start: boolean = count_start;
        let temp_formula: string = formula.slice();
        
        while(temp_formula != ''){
            let move: string = temp_formula.charAt(0);
            temp_formula = temp_formula.slice(1,temp_formula.length);
            switch(move) {
                case '-': {
                    if(start){
                        negations_height_count +=1;
                    }
                    start = true;
                    break;
                }
                case '.': {
                    break;
                }
                case '^': {
                    if(start){
                        negations_height_count +=1;
                    }
                    temp_formula = temp_formula.slice(1,temp_formula.length-1);
                    let sub_formulas: string[] = this.divideFormula(temp_formula);
                    let temp_count_max: number = 0;
                    for(let sub_formula of sub_formulas){
                        let temp_count: number = this.calculateNegationsHeight(sub_formula, start);
                        if(temp_count > temp_count_max){
                            temp_count_max = temp_count
                        }
                    }
                    negations_height_count += temp_count_max;
                    temp_formula = '';
                    break;
                }
                default: {
                    if(start){
                        negations_height_count += 1;
                    }
                    break;
                }
            }
        }
        return negations_height_count;
    }

    /**
     * Calculates how often one runs into observation (action) when descending the syntax tree of a formula
     * @param formula 
     * @returns 
     */
    calculateObservations(formula: string): number{
        let observations_count: number = 0;
        let temp_formula = formula.slice();

        while(temp_formula != ''){
            let move: string = temp_formula.charAt(0);
            temp_formula = temp_formula.slice(1,temp_formula.length);
            switch(move) {
                case '-': {
                    observations_count += 1;
                    temp_formula = temp_formula.slice(1,temp_formula.length)
                    break;
                }
                case '.': {
                    break;
                }
                case '^': {
                    temp_formula = temp_formula.slice(1,temp_formula.length-1);
                    let sub_formulas: string[] = this.divideFormula(temp_formula);
                    let temp_count_max: number = 0;
                    for(let sub_formula of sub_formulas){
                        let temp_count = this.calculateObservations(sub_formula);
                        if(temp_count > temp_count_max){
                            temp_count_max = temp_count
                        }
                    }
                    observations_count += temp_count_max;
                    temp_formula = '';
                    break;
                }
                default: {
                    observations_count += 1;
                    break;
                }
            }
        }
        return observations_count;
    }

    /**
     * Selects only the positive and deep branches from given branches.
     * @param branches 
     * @returns 
     */
    getPositiveDeepBranches(branches: string[]): string[]{
        let deep_positive_branches = [];
        for(let branch of branches){
            if(!(branch.charAt(0)=='-') && branch.length >1){
                deep_positive_branches.push(branch);
            }
        }
        return deep_positive_branches;
    }

    /**
     * Selects out only the positive and flat branches from given branches.
     * @param branches 
     * @returns 
     */
     getPositiveFlatBranches(branches: string[]): string[]{
        let deep_positive_branches: string[] = [];
        for(let branch of branches){
            if(!(branch.charAt(0)=='-') && branch.length == 1){
                deep_positive_branches.push(branch);
            }
        }
        return deep_positive_branches;
    }


    /**
     * Divides given formula by ","" outside any {}
     * @param formula 
     * @returns Array of divided formulas
     */
    divideFormula(formula: string): string[]{
        let dividedFormula: string[] = [];
        let klammer_count: number = 0;
        let last_sliced: number = 0;
        for(let i =0; i<formula.length; i++){
            switch(formula.charAt(i)) {
                case ',': {
                    if(klammer_count == 0){
                        let branch: string = formula.slice(last_sliced,i);
                        last_sliced = i + 1;
                        dividedFormula.push(branch);
                    }
                    break;
                }
                case '{': {
                    klammer_count += 1;
                    break;
                }
                case '}': {
                    klammer_count -= 1;
                    break;
                }
                default: {
                    break;
                }
            }
        }
        dividedFormula.push(formula.slice(last_sliced, formula.length))
        return dividedFormula;
    }

    /**
     * Returns the price as an array [conjunctions, positive branches, negations, negation height, observations]
     * @returns 
     */
    asArray(){
        return [this.conjunctions, this.positiveBranches,  this.negations, this.negationsHeight, this.observations];
    }
}