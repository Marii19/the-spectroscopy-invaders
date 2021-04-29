import {hmlFormula} from './hml-formula'

export class formulaPrice{
    conjunctions: number;
    positiveDeepBranches: number;
    positiveFlatBranches: number;
    negations: number;
    negationsHeight: number;

    constructor(formula: string){
        this.conjunctions = this.calculateConjunctions(formula);
        this.positiveDeepBranches = this.calculatePositiveDeepBranches(formula);
        this.positiveFlatBranches = this.calculatePositiveFlatBranches(formula);
        this.negations = this.calculateNegations(formula);
        this.negationsHeight = this.calculateNegationsHeight(formula);
    }


    calculateConjunctions(formula: string){

        return 0;
    }

    calculatePositiveDeepBranches(formula: string){

        return 0;
    }

    calculatePositiveFlatBranches(formula: string){

        return 0;
    }

    calculateNegations(formula: string){

        return 0;
    }

    calculateNegationsHeight(formula: string){

        return 0;
    }
}