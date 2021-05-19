import {hmlFormula} from './hml-formula'

export class formulaPrice{
    conjunctions: number;
    positiveDeepBranches: number;
    positiveFlatBranches: number;
    negations: number;
    negationsHeight: number;

    constructor(formula: string){
        this.conjunctions = this.calculateConjunctions(formula, 0);
        this.positiveDeepBranches = this.calculatePositiveDeepBranches(formula);
        this.positiveFlatBranches = this.calculatePositiveFlatBranches(formula);
        this.negations = this.calculateNegations(formula);
        this.negationsHeight = this.calculateNegationsHeight(formula);
    }

    /**
     * Calculates maximal number of conjunctions. 
     * @param formula 
     * @param depth 
     * @returns 
     */
    calculateConjunctions(formula: string, depth: number){
        let conjunctionCount: number = 0;
        let temp_formula = formula;
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
                    let sub_formulas = this.divideFormula(temp_formula);
                    let temp_count_max = 0;
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
    calculatePositiveDeepBranches(formula: string){
        let deepBranchesCount: number = 0;
        let temp_formula = formula.slice();

        if(temp_formula.includes('^')){
            temp_formula = temp_formula.slice(temp_formula.indexOf('^')+2,-1);
            let branches = this.divideFormula(temp_formula);
            let deep_positive_branchse = this.getPositiveDeepBranches(branches);
            deepBranchesCount = deep_positive_branchse.length;
            for(let branch of branches){
                let temp_count = this.calculatePositiveDeepBranches(branch);
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
    calculatePositiveFlatBranches(formula: string){
        let flatBranchesCount: number = 0;
        let temp_formula = formula.slice();
        
        if(temp_formula.includes('^')){
            temp_formula = temp_formula.slice(temp_formula.indexOf('^')+2,-1);
            let branches = this.divideFormula(temp_formula);
            let deep_positive_branchse = this.getPositiveFlatBranches(branches);
            flatBranchesCount = deep_positive_branchse.length;
            for(let branch of branches){
                let temp_count = this.calculatePositiveFlatBranches(branch);
                if(temp_count > flatBranchesCount){
                    flatBranchesCount = temp_count;
                }
            }
        }else {
            return 0;
        }
        
        return flatBranchesCount;
    }

    calculateNegations(formula: string){
        let negations_count: number = 0;
        let temp_formula = formula.slice();
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
                    let sub_formulas = this.divideFormula(temp_formula);
                    let temp_count_max = 0;
                    for(let sub_formula of sub_formulas){
                        let temp_count = this.calculateNegations(sub_formula);
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

    calculateNegationsHeight(formula: string){
        let negations_height_count: number = 0;
        let start:boolean = false;
        let temp_formula = formula.slice();
        
        while(temp_formula != ''){
            let move: string = temp_formula.charAt(0);
            temp_formula = temp_formula.slice(1,temp_formula.length);
            switch(move) {
                case '-': {
                    if(start==true){
                        negations_height_count +=1;
                    }
                    start = true;
                    break;
                }
                case '.': {
                    break;
                }
                case '^': {
                    temp_formula = temp_formula.slice(1,temp_formula.length-1);
                    let sub_formulas = this.divideFormula(temp_formula);
                    let temp_count_max = 0;
                    for(let sub_formula of sub_formulas){
                        let temp_count = this.calculateNegationsHeight(sub_formula);
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
     * Selects only the positive and deep branches from given branches.
     * @param branches 
     * @returns 
     */
    getPositiveDeepBranches(branches: string[]){
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
     getPositiveFlatBranches(branches: string[]){
        let deep_positive_branches = [];
        for(let branch of branches){
            if(!(branch.charAt(0)=='-') && branch.length == 1){
                deep_positive_branches.push(branch);
            }
        }
        return deep_positive_branches;
    }


    /**
     * Divides given formula by , outside any {}
     * @param formula 
     * @returns Array of divided formulas
     */
    divideFormula(formula: string){
        let dividedFormula = [];
        let klammer_count = 0;
        let last_sliced = 0;
        for(let i =0; i<formula.length; i++){
            switch(formula.charAt(i)) {
                case ',': {
                    if(klammer_count == 0){
                        let branch = formula.slice(last_sliced,i);
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

    asArray(){
        return [this.conjunctions, this.positiveDeepBranches, this.positiveFlatBranches, this.negations, this.negationsHeight];
    }
}