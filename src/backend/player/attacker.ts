import term from '../formulas/term';
import hmlFormula from '../formulas/hml-formula';

/**
 * A class representing the attacker in spectroscopy game
 */
export default class attacker{
    formula: string;        // player's formula build during the game (from player's moves)
    
    /**
     * Creates the attacker instanz
     */
    constructor(){
        // Initialize empty player's formula
        this.formula = "";
    }

    /**
     * Expands player's formula 
     * @param move move played by the player
     */
    addAttackerMove(move: string): void{
        switch(move) {
            case "^": {
                this.formula = this.formula + "^{"
                break;
            }
            case "*": {
                if(this.formula[this.formula.length - 1] != "{"){
                    this.formula = this.formula + ","
                }
                break;
            }
            case "-": {
                this.formula = this.formula + move;
                break;
            }
            default: {
                this.formula = this.formula + move;
                break;
            }
        }
    }

    /**
     * Closes conjunction in player's formula
     */
    closeConjunction(): void{
        this.formula = this.formula + "}";
    }

    /**
     * Transforms player's formula into an instanz of HML Formula and deletes duplicates in conjunctions
     * @returns player's formula as HML Formula
     */
    movesToFormel(): hmlFormula{
        let player_formula: hmlFormula =  new hmlFormula(this.formula);
        player_formula.deleteDuplicates();
        return player_formula;
    }
}