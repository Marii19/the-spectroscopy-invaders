import {formulaPrice} from './formula-price';

/**
 * Class to represent a HML Formula with its price
 */
export class hmlFormula{
    formula: string;
    price: formulaPrice;

    constructor(formula: string ){
        this.formula = formula;
    }

    /**
     * Calculates price for the hml formula
     */
    calculatePrice(){
        
    }
}