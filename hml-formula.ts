import {formulaPrice} from './formula-price';

/**
 * Class to represent a HML Formula with its price
 */
export class hmlFormula{
    formula: string;
    price: formulaPrice;

    /**
     * Constructor for the hmlFormula
     * Calculates formula price immediately
     * @param formula 
     */
    constructor(formula: string ){
        this.formula = formula;
        this.price = new formulaPrice(this.formula);
    }

    
}