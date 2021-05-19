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
    constructor(formula ){
        this.formula = formula;
        this.price = new formulaPrice(this.formula);
    }

    /**
     * Calculates a HML Formula from Attacker Strategy
     */
    calculateFormula(strategy: string){
        let formula: string = 'T';

        // while(strategy != ''){
        //     let move = strategy.charAt(strategy.length)
        //     strategy = strategy.slice(0,-1);
        //     if(move == '')
        // }
        return formula;
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

        
        for(let i = 0; i<5; i++){
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

        if(same == 5){
            return 0;
        }
        if(dominates == 5){
            return 1;
        }else if(dominated ==5){
            return -1;
        }else{
            return 0;
        }
    }
}