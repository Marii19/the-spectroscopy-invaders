import {gameState} from "../game_objects/game-state"; 
import { term } from "../formulas/term";
import {gameMove} from "../game_objects/game-move"
import { spectroscopyGame } from "./create-spectroscopy-game";
import { hmlFormula } from "../formulas/hml-formula";


export class spectroscopyProcedure {
    game: spectroscopyGame;
    strats;

    constructor(player: term, defender: term[], turn: string, calculateRegions: boolean){
        this.game = new spectroscopyGame(player, defender, turn, calculateRegions);
        this.strats = new Map();
    }

    /**
     * * Spectroscopy procedure algorithm
     * Calculates the cheapest distinguishing formulas for start state
     */
    calculateCheapestFormulas(){
        
        if(this.game.startState.winningRegion){
            console.log("game is won")
            let todo = [this.game.startState];
            while(todo.length != 0 ){
                let g = todo[0];
               // console.log("lista Todo: ")
               //console.log("g to jest: " + g.toString())
                let sg = this.strats.get(g)
                if(!sg){
                    this.strats.set(g,[])
                    //console.log("strats = 0");
                }
                let gg_ = [];
                for(let child of g.winningChildren){
                    if(!this.strats.get(child)){
                        gg_.push(child)
                    }
                    //console.log("calculate winning regions")
                }
                if(gg_.length == 0){
                    todo.shift();
                    //console.log("nie ma nowych dzieci");
                    if((g.move == "*") || (g.move == "^")){
                        let sg_ = g.calculateStrats(this.strats);
                        this.strats.set(g,sg_)
                    }else {
                        let sg_ = this.nonDominated(g.calculateStrats(this.strats));
                        this.strats.set(g,sg_)
                    }
                }
                else{
                    //console.log("wkładam dzieci : ")
                    todo = gg_.concat(todo);
                    for(let gihi of gg_){
                        //console.log(gihi.toString())
                    }
                }
            }
            return this.strats.get(this.game.startState);
        }else {
            console.log("game is lost")
            return [];
        }
    }

    /**
     * Prints all states strating from start state
     */
    printTree(){
        this.game.startState.printAllChildren(0);
    }

    /**
     * Collects only non dominated hmlFormulas
     * @param strats 
     * @param state 
     */
     nonDominated(formulas: hmlFormula[]){
        // Check what formulas are being dominated and deletes them
    
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
}