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
    constructor(strategy: string ){
        this.formula = this.calculateFormula(strategy);
        this.price = new formulaPrice(this.formula);
    }

    /**
     * Calculates a HML Formula from Attacker Strategy
     */
    calculateFormula(strategy: string){
        var formula: string = 'T';

        // while(strategy != ''){
        //     var move = strategy.charAt(strategy.length)
        //     strategy = strategy.slice(0,-1);
        //     if(move == '')
        // }
        return formula;
    }

    
}