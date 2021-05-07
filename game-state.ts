import {term} from "./term";
import {gameMove} from "./game-move" 
import {spectroscopyGame} from "./create-spectroscopy-game" 

export class gameState {
    player: term;
    defender: term[];
    turn: string;
    children: gameState[];
    move: string;
    winningRegion: boolean;
    visitedStates: gameState[];

    constructor(p: term, Q: term[], turn: string){
        this.player = p;
        this.defender = Q;
        this.turn = turn;
        this.children = [];
        this.move = "";
        this.visitedStates =[];
    }

    /**
     * Compares two gameState objects by:
     * player, defender and turn
     * @param compareObjekt 
     * @returns 
     */
    compare(compareObjekt: gameState){
        if(this.defender.length != compareObjekt.defender.length){
            return false;
        }
        if(this.player.compare(compareObjekt.player) && this.defender.every(elem =>elem.compare(compareObjekt.defender[this.defender.indexOf(elem)])) && this.turn == compareObjekt.turn ){
            return true;
        } else {
            return false;
        }
    }


    /**
     * Calls itself recursively for all children printing the whole tree
     * @param depth 
     */
    printAllChildren(depth: number){
        if(this.children.length != 0){
            var str = this.createString(depth);
            depth +=1;
            for(var child of this.children){
                console.log(str, child.player, child.defender, child.turn, child.children.length, child.move);
                
                child.printAllChildren(depth);
            }
        }
    }

    /**
     * get all children state from all possible game moves and saves it 
     * in this.children
     * @param moves 
     */
     getChildrenFromMoves(moves: gameMove[]){
        var children = [];
        for(var move of moves){
            move.targetState.move = move.move;
            children.push(move.targetState)
        }
        this.children = children;
    }

    duplicate(allStates, state){
        if(allStates.some(elem => elem.compare(state))){
            // Checkes for zero state ( doesnt count zero States as duplicates)
            if(!state.isZeroState()){
                return true
            }
        }else{
            return false;
        }
    }

    /**
     * calculates all possible attacker moves
     * @returns List[gameMoves] of all possible attacker moves sorted by <a> > neg > ^
     * TODO remove comment to add childern to this 
     */
    calculatePlayerMoves(){
        var playerMoves = this.calculateObservationMoves();

        // Checks wheather defender holds exactly 1 position
        if(this.defender.length == 1 && this.player.term != this.defender[0].term){
            playerMoves = playerMoves.concat(this.calculateNegationMove());
        }
        // Checks wheather state is no zero State
        if(!this.isZeroState()){
            playerMoves = playerMoves.concat(this.calculateConjunctionChallengeMove());
        }
        return playerMoves;
    }

    
    /**
     * Calculates all possible defender answers
     * @returns List[gameMoves] of all possible defender answers
     * TODO remove comment line to add children to this 
     */
    calculateDefenderMoves(){
        var defenderMoves = this.calculateConjunctionAnswerMoves();
        return defenderMoves;
    }

    

    /*
        Calculates all possible observation moves
        Output: String list containing all possible observation moves
    */
    calculateObservationMoves(){
        var observations: gameMove[] = [];
        // A list containing divided terms by + outside any ()
        var divided = this.player.divideTerm()
        // Collects all posible observation moves
        for(var sub_term of divided){
            if(sub_term.term != '0'){
                var possibleObservation = new gameMove(this,sub_term.term.charAt(0),new term(sub_term.term.substring(2,sub_term.term.length)), "observation");
                if(!this.duplicate(this.visitedStates, possibleObservation.targetState)){
                    observations.push(possibleObservation)
                    possibleObservation.targetState.visitedStates = this.visitedStates.slice()
                    possibleObservation.targetState.visitedStates.push(this)

                }
            }
        }
        return observations;
    }

    /**
     * Calculates the negation move  
     * @returns negation gameMove object
     */
    calculateNegationMove(){
        var negations: gameMove[] = [];
        var negation = new gameMove(this, " Neg ", new term(" "), "negation");
        if(!this.duplicate(this.visitedStates, negation.targetState)){
            negations.push(negation);
            negation.targetState.visitedStates = this.visitedStates.slice();
            negation.targetState.visitedStates.push(this)
        }
        return negations;
    }

    /**
     * Calculates the attacket conjuntion challenge
     * @returns Conjunction challenge gameMove object
     */
    calculateConjunctionChallengeMove(){
        var conjunctions: gameMove[] = [];
        var conjunction = new gameMove(this, " ^ ", new term(" "), "conjunction challenge");
        if((!this.duplicate(this.visitedStates, conjunction.targetState)) && (this.defender.length !=1)){
            conjunctions.push(conjunction);
            conjunction.targetState.visitedStates = this.visitedStates.slice();
            conjunction.targetState.visitedStates.push(this)
        }
        return conjunctions;
        
    }

    /**
     * Calculates the defender conjunction answer
     * @returns List[gamemoves] conjunction answer moves
     */
    calculateConjunctionAnswerMoves(){
        var conjunctionAnswers: gameMove[] = [];
        for(var sub_term of this.defender){
            var conjunctionAnswer = new gameMove(this, " * ", sub_term, "conjunction answer");
            if(!this.duplicate(this.visitedStates, conjunctionAnswer.targetState)){
                conjunctionAnswers.push(conjunctionAnswer);
                conjunctionAnswer.targetState.visitedStates = this.visitedStates.slice();
                conjunctionAnswer.targetState.visitedStates.push(this)
            }
        }
        return conjunctionAnswers;
    }

    /**
     * Creates a Str like: depth * " "
     * @param depth 
     * @returns String
     */
    createString(depth){
        var str: string = "";
        for(var i = 0; i < depth; i++){
            var temp_str = "    "
            str = str.concat(temp_str);
        }
        return str;
    }

    /**
     * Checks wheather a state is (0,[{0}*]) or (0,{})
     * @returns True if zero state, false else
     */
    isZeroState(){
        var zeroTerm = new term('0');
        if(this.player.compare(zeroTerm) && (this.defender.length > 0)){
            return true;
        }else if(this.player.compare(zeroTerm) && (this.defender.length==0)){
            return true;
        }else {
            return false;
        }
    }

    /**
     * Calculates wheather this state is winning region for attacker 
     * Updates this.winningRegion 
     * @returns True if winning region, false else
     */
    isWinningRegion(){
        // Recursion anchor
        if(this.isZeroState()){
            if(this.defender.length == 0){
                this.winningRegion = true;
                return true;
            }else{
                this.winningRegion = false;
                return false;
            }
        }else{
            // If attackers turn, state is winning region if one of its children is winning region.
            if(this.turn == "attacker"){
                var isWinning: boolean = false;
                for(var child of this.children){
                    isWinning = isWinning || child.isWinningRegion();
                }
                this.winningRegion = isWinning;
                return isWinning;
            // If defenders turn, state is winning region if all of its children are winning regions.
            }else{
                var isWinning: boolean = true;
                for(var child of this.children){
                    isWinning = isWinning && child.isWinningRegion();
                }
                this.winningRegion = isWinning;
                return isWinning;
            }
        }
        
    }

}