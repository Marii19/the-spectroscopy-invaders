import {gameState} from "./game-state"; 
import { term } from "./term";
import {gameMove} from "./game-move"
import { spectroscopyGame } from "./create-spectroscopy-game";
import { hmlFormula } from "./hml-formula";


export class spectroscopyProcedure {
    game: spectroscopyGame;

    constructor(player: term, defender: term[], turn: string){
        this.game = new spectroscopyGame(player, defender, turn);
    }

    /**
     * * Spectroscopy procedure algorithm
     * Calculates the cheapest distinguishing formulas for start state
     */
    calculateCheapestFormulas(){
        
        this.game.calculateWinningRegions();
        this.game.startState.calculateWinningGraph();
        
        if(this.game.startState.winningRegion){
            console.log("game is won")
            var todo = [this.game.startState];
            var strats = new Map();
            while(todo.length != 0 ){
                var g = todo[0];
               // console.log("lista Todo: ")
               //console.log("g to jest: " + g.toString())
                var sg = strats.get(g)
                if(!sg){
                    strats.set(g,[])
                    //console.log("strats = 0");
                }
                var gg_ = [];
                for(var child of g.winningChildren){
                    if(!strats.get(child)){
                        gg_.push(child)
                    }
                    //console.log("calculate winning regions")
                }
                if(gg_.length == 0){
                    todo.shift();
                    //console.log("nie ma nowych dzieci");
                    var sg_ = this.nonDominated(g.calculateStrats(strats));
                    strats.set(g,sg_)
                }
                else{
                    //console.log("wkładam dzieci : ")
                    todo = gg_.concat(todo);
                    for(var gihi of gg_){
                        //console.log(gihi.toString())
                    }
                }
            }
            return strats.get(this.game.startState);
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
        var dominated: hmlFormula[] = [];

        // Check what formulas are being dominated and stores them in dominated[]
        for(var formula of formulas){
            for(var i =0; i< formulas.length; i++){
                if(i != formulas.indexOf(formula)){
                    if(formulas[i].dominates(formula)==1){
                        formulas.splice(formulas.indexOf(formula),1);
                    }
                }
            }
        }


        // Delete all formulas of dominated from formula
        // for(var domFormula of dominated){
        //     formulas.splice(formulas.indexOf(domFormula),1);
        // } 
        return formulas;
    }
}