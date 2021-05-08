import {hmlFormula} from './hml-formula'

export class strat{
    formulas: hmlFormula[]

    constructor(){
        this.formulas = [];
    }


    

    sortStrats(){
        return this.formulas.sort((elem1,elem2)=> elem1 > elem2 ? -1:1);
    }

    // /**
    //  * compares this.strats with given hml formulas
    //  * @param compObj as hmlFormula[] 
    //  * @returns True | False
    //  */
    //  compareStrats(compObj: hmlFormula[]){
    //     var same = true;
    //     formulas = this.sortStrats
    //     compObj = this.sortStrats(compObj);
    //     if(strats.length != compObj.length)
    //     for(var i=0; i<compObj.length; i++){
    //         if(!(strats[i].formula == compObj[i].formula)){
    //             same = false; 
    //         }
    //     }
    //     return same;
    // }
}