import GamePosition from "../game_objects/game-position"; 
import hmlFormula from "../formulas/hml-formula";

/**
 *  Class that represents the spectroscopy procedure
 */
export default class SpectroscopyProcedure {
    strats;                 // Map containing strats
    observation: string;    // Current observation language

    /**
     * Created spectroscopy procedure instanz
     * @param observation 
     */
    constructor(observation: string){
        this.strats = new Map();
        this.observation = observation;
    }

    /**
     * Implementation of the spectroscopy procedure. Calculates set of cheapest distinguishing formulas.
     * @param startPosition 
     * @returns Cheapest distinguishing formulas if the initial states are bisimulation inequivalent, otherwise an empty set
     */
    calculateCheapestFormulas(startPosition: GamePosition): hmlFormula[]{
        if(startPosition){
            let todo = [startPosition];
            while(todo.length != 0 ){
                let g = todo[0];
                let sg = this.strats.get(g)
                if(!sg){
                    this.strats.set(g,[])
                }
                let gg_ = [];
                for(let child of g.winningChildren){
                    if(!this.strats.get(child)){
                        gg_.push(child)
                    }
                }
                if(gg_.length == 0){
                    todo.shift();
                    if((g.move == "*") || (g.move == "^")){
                        let sg_ = g.calculateStrats(this.strats);
                        this.strats.set(g,sg_)
                    }else {
                        let temp = this.nonDominated(g.calculateStrats(this.strats))
                        let sg_ = this.removeDuplicates(temp);
                        this.strats.set(g,sg_)
                    }
                }
                else{
                    todo = gg_.concat(todo);
                }
            }
            return this.strats.get(startPosition);
        }
        // Game lost, the states are bisimulation equivalent
        else {
            return [];
        }
    }



    /**
     * Removes all dominated formulas
     * @param formulas a set of HML formulas to reduce
     * @returns reduced set of HML formulas
     */
     nonDominated(formulas: hmlFormula[]): hmlFormula[]{
        let dominatedIndex: number[] = [];
    
        // Checks for formulas that are being dominated by any other formula in formulas and adds its Index
        for(let formula of formulas){
            for(let i =0; i< formulas.length; i++){
                if(formulas[i].dominates(formula)==1){
                    dominatedIndex.push(formulas.indexOf(formula))
                }   
            }
        }
    
        // Deletes all dominate formulas
        let nonDominatedFormulas: hmlFormula[] = [];
        for(let formula of formulas){
            if(!(dominatedIndex.includes(formulas.indexOf(formula)))){
                nonDominatedFormulas.push(formula);
            }
        }
        return nonDominatedFormulas;
    }

    /**
     * Removes duplicates from a set of HML formulas
     * @param formulas a set of HML formulas
     * @returns reduced HML formulas
     */
    removeDuplicates(formulas: hmlFormula[]): hmlFormula[]{
        let nonDuplicates: hmlFormula[] = [];
        let nonDuplicatesFormulas: string[] = [];

        for(let formula of formulas){
            if(!nonDuplicatesFormulas.includes(formula.formula)){
                nonDuplicates.push(formula);
                nonDuplicatesFormulas.push(formula.formula);
            }
        }
        return nonDuplicates;
    }

    /**
     * Compares algorithm result to player's formula
     * @param procedure_result result of the spectroscopy procedure
     * @param player_result player's formula
     * @returns 0 if player result is not in the same observation, 1 if player result is in the same observation, 2 if player result is in the same observation & is not dominated
     */
    compareProcedureToPlayer(procedure_result: hmlFormula[], player_result: hmlFormula): number{
        // Player's result does not fit into observation language
        if(!(player_result.observations.includes(this.observation))){
            return 0;
        }

        // Player's result does fit into observation language but is not part of the cheapest distinguishing formulas
        for(let procedure_formula of procedure_result){
            if(procedure_formula.dominates(player_result) == 1){
                return 1;
            }
        }
        // Player's formula is part of the cheapest dostinguishing formulas
        return 2;
    }

    /**
     * Deletes HML formulas that does not fit into the observation language + all keeps formulas that are part of simulation language
     * @param formulas a set of HML formulas
     * @returns reduced set of HML formulas
     */
    collectObservations(formulas: hmlFormula[]): hmlFormula[]{
        let observation_formulas:hmlFormula[] = []
        for(let formula of formulas){
            if(formula.observations.length != 0){
                if(formula.observations.includes(this.observation)){
                    observation_formulas.push(formula);
                }
            }
        }

        return observation_formulas;
    }
}