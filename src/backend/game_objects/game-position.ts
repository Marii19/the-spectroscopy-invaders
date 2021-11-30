import term from "../formulas/term";
import gameMove from "./game-move" 
import hmlFormula from "../formulas/hml-formula";

/**
 * Class representing spectroccopy game position
 */
export default class GamePosition {l
    player: term;                       // state representing the attacker
    defender: term[];                   // States representing the defender
    turn: string;                       // turn
    children: GamePosition[];           // All game positions one can reach with on game move (This represents the spectroscopy tree form my thesis)
    winningChildren: GamePosition[];    // All attacker winning region game positions one can reach with on game move 
    parentPosition: GamePosition;          // Parent game position
    move: string;                       // Game move that has lead to this game position
    winningRegion: boolean;             // Indicates if this gmae position is part of the attacker winning region
    visitedStates: GamePosition[];      // All states that were visited from root node to this node 

    /**
     * Creates game position instanz
     * @param p state that represents the attacker
     * @param Q states that represents the defender
     * @param turn turn indicator
     */
    constructor(p: term, Q: term[], turn: string){
        this.player = p;
        this.defender = Q;
        this.turn = turn;
        this.children = [];
        this.winningChildren = [];
        this.move = "";
        this.visitedStates =[];
    }

    /**
     * Compares two gameState objects by:
     * player, defender and turn
     * @param compareObjekt 
     * @returns boolean
     */
    compare(compareObjekt: GamePosition): boolean{
        if(this.defender.length != compareObjekt.defender.length){
            return false;
        }
        if(!this.player.compare(compareObjekt.player) || this.turn != compareObjekt.turn ){
            return false;
        }

        if(!this.player.compare(compareObjekt.player) ||  this.turn != compareObjekt.turn ){
            return false;
        }

        // this.defender.every(elem =>elem.compare(compareObjekt.defender[this.defender.indexOf(elem)])) &&
        let same_enemies: number = 0;
        let compare_defender_copy = compareObjekt.defender.slice();
        for(let enemy of this.defender){
            for(let comp_enemy of compare_defender_copy){
                if(enemy.compare(comp_enemy)){
                    compare_defender_copy.splice(compare_defender_copy.indexOf(comp_enemy), 1);
                    same_enemies = same_enemies + 1;
                    break;
                }
            }
        }

        if(same_enemies == this.defender.length && compare_defender_copy.length == 0){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Returns copy of this including player, defender. winning children and turn
     * @returns copied game position
     */
    copy(): GamePosition{
        let player: term = new term(this.player.term);
        let defender: term[] = [];
        for(let def of this.defender){
            defender.push(def)
        }
        let turn: string = this.turn;

        let temp_winning_children = [];
        for(let child of this.winningChildren){
            let child_copy = child.copy();
            temp_winning_children.push(child_copy)
        }

        let copy_state = new GamePosition(player, defender, turn);
        copy_state.move = this.move;
        copy_state.winningChildren = temp_winning_children;

        return copy_state;
    }


    /**
     * Calls itself recursively for all children printing the whole tree
     * @param depth adds '  ' * depth
     * @param children 
     */
    printAllChildren( depth: number){
        if(this.children.length != 0){
            let str = this.createString(depth);
            depth +=1;
            for(let child of this.children){
                console.log(str, child.player, child.defender, child.turn, child.children.length, child.move, "is winning: ",child.winningRegion); 
                child.printAllChildren(depth);
            }
        }
    }

    /**
     * Calls itself recursively for all winning children printing the winning graph tree
     * @param depth adds '  ' * depth
     */
     printWinningChildren( depth: number){
        if(this.winningChildren.length != 0){
            let str = this.createString(depth);
            depth +=1;
            for(let child of this.winningChildren){
                console.log(str, child.player, child.defender, child.turn, child.children.length, "move: ", child.move, "is winning: ",child.winningRegion); 
                child.printWinningChildren(depth);
            }
        }
    }

    /**
     * Extract target positions from given game moves and save them in this.children
     * @param moves a set containing game moves
     */
     getChildrenFromMoves(moves: gameMove[]){
        let children: GamePosition[] = [];
        for(let move of moves){
            move.targetPosition.move = move.move;
            children.push(move.targetPosition)
        }
        this.children = children;
    }

    /**
     * Checks whether given state is already in all States
     * @param allStates 
     * @param state 
     * @returns 
     */
    duplicate(allStates, state){
        if(allStates.some(elem => elem.compare(state))){
            // Checkes for zero state ( doesnt count zero States as duplicates)
            if(!state.isZeroPosition()){
                return true
            }
        }else{
            return false;
        }
    }

    /**
     * Calculates all possible attacker moves from this game position
     * @returns seto of game moves
     * @param stop_at what gamme moves to calculate
     * @returns 
     */
    calculatePlayerMoves(stop_at: string){
        let playerMoves = this.calculateObservationMoves();

        if(stop_at == "observations"){
            // Calculate only observation moves
            return playerMoves;
        }
        // Checks wheather defender holds exactly 1 position
        if(this.defender.length == 1 && this.player.term != this.defender[0].term){
            playerMoves = playerMoves.concat(this.calculateNegationMove());
        }

        if(stop_at == "negations"){
            // Calculate only observation and negation moves
            return playerMoves;
        }

        // Checks wheather state is not a zero State
        if(!this.isZeroPosition()){
            playerMoves = playerMoves.concat(this.calculateConjunctionChallengeMove());
        }
        return playerMoves;
    }

    
    /**
     * Calculates all possible defender answers (for conjunct challenge)
     * @returns a set of defender answers
     */
    calculateDefenderMoves(): gameMove[]{
        let defenderMoves = this.calculateConjunctionAnswerMoves();
        return defenderMoves;
    }

    
    /**
     * Calculates all possible observatin moves from this game position
     * @returns observation moves
     */
    calculateObservationMoves(): gameMove[]{
        let observations: gameMove[] = [];
        // A list containing divided terms by + outside any ()
        let divided = this.player.divideTerm()
        // Collects all posible observation moves
        for(let sub_term of divided){
            if(sub_term.term != '0'){
                let target;
                if(sub_term.term.charAt(2)=='('){
                    target = new term(sub_term.term.slice(3,-1));
                }else{
                    target = new term(sub_term.term.substring(2,sub_term.term.length))
                }
                let possibleObservation = new gameMove(this,sub_term.term.charAt(0),target, "observation");
                possibleObservation.targetPosition.parentPosition = this;
                if(!this.duplicate(this.visitedStates, possibleObservation.targetPosition)){
                    observations.push(possibleObservation)
                    possibleObservation.targetPosition.visitedStates = this.visitedStates.slice()
                    possibleObservation.targetPosition.visitedStates.push(this)

                }
            }
        }
        return observations;
    }

    /**
     * Calculates the negation move (only one)
     * @returns a set containing the only negation move
     */
    calculateNegationMove(): gameMove[]{
        let negations: gameMove[] = [];
        let negation = new gameMove(this, "-", new term(" "), "negation");
        negation.targetPosition.parentPosition = this;
        if(!this.duplicate(this.visitedStates, negation.targetPosition)){
            negations.push(negation);
            negation.targetPosition.visitedStates = this.visitedStates.slice();
            negation.targetPosition.visitedStates.push(this)
        }
        return negations;
    }

    /**
     * Creates the attacker conjuntion challenge move
     * @returns conjunct challenge move
     */
    calculateConjunctionChallengeMove(): gameMove[]{
        let conjunctions: gameMove[] = [];
        let conjunction = new gameMove(this, "^", new term(" "), "conjunction challenge");
        conjunction.targetPosition.parentPosition = this;
        if((!this.duplicate(this.visitedStates, conjunction.targetPosition)) && (this.defender.length !=1)){
            conjunctions.push(conjunction);
            conjunction.targetPosition.visitedStates = this.visitedStates.slice();
            conjunction.targetPosition.visitedStates.push(this)
        }
        return conjunctions;    
    }

    /**
     * Creates the defender conjunction answer
     * @returns conjunction answer move
     */
    calculateConjunctionAnswerMoves(): gameMove[]{
        let conjunctionAnswers: gameMove[] = [];
        for(let sub_term of this.defender){
            let conjunctionAnswer = new gameMove(this, "*", sub_term, "conjunction answer");
            conjunctionAnswer.targetPosition.parentPosition = this;
            if(!this.duplicate(this.visitedStates, conjunctionAnswer.targetPosition)){
                conjunctionAnswers.push(conjunctionAnswer);
                conjunctionAnswer.targetPosition.visitedStates = this.visitedStates.slice();
                conjunctionAnswer.targetPosition.visitedStates.push(this)
            }
        }
        return conjunctionAnswers;
    }

    /**
     * Creates a Str like: depth * " "
     * @param depth 
     * @returns empty string of diverse length
     */
    createString(depth): string{
        let str: string = "";
        for(let i = 0; i < depth; i++){
            let temp_str = "    "
            str = str.concat(temp_str);
        }
        return str;
    }

    /**
     * Checks wheather a position is (0,[{0}*]), (0,{}) or ({obs}*, [])
     * @returns True if zero state, false else
     */
    isZeroPosition(): boolean{
        let zeroTerm = new term('0');
        if(this.player.compare(zeroTerm) && (this.defender.length ==1) && (this.defender[0].term == '0')){
            return true;
        }else if((this.defender.length==0)){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Calculates wheather this position is winning region for attacker 
     * Updates this.winningRegion 
     * @returns True if winning region, false else
     */
    isWinningRegion(): boolean{
        // Recursion anchor
        if(this.isZeroPosition()){
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
                let isWinning: boolean = false;
                for(let child of this.children){
                    child.isWinningRegion();
                    isWinning = isWinning || child.winningRegion
                }
                this.winningRegion = isWinning;
                return isWinning;
            // If defenders turn, state is winning region if all of its children are winning regions.
            }else{
                let isWinning: boolean = true;
                for(let child of this.children){
                    child.isWinningRegion();
                    isWinning = isWinning && child.winningRegion
                }
                this.winningRegion = isWinning;
                return isWinning;
            }
        }
        
    }

    /**
     * Creates a tree of winning children
     */
    calculateWinningStrategyGraph(): void{
        for(let child of this.children){
            if(child.winningRegion){
                this.winningChildren.push(child);   
            }
            child.calculateWinningStrategyGraph();
        }
    }

    /**
     * Converts a position into string like "player: ..., defender: ..., turn: ..."
     * @returns 
     */
    toString(): string{
        let str: string = '';
        str = str + "player: " + this.player.term + ", defender: ";
        for(let sub_term of this.defender){
            str = str + sub_term.term + ", "
        }
        str = str.slice(0,-2)
        str = str + ", turn: " + this.turn;

        return str;
    }

    /**
     * Calculates strategy formulas for this game position
     * @param strats 
     * @returns 
     */
    calculateStrats(strats): hmlFormula[]{
        let strat: hmlFormula[] = [];
        for(let child of this.winningChildren){
            let move = child.move;
            switch(move){
                case '*':{
                    break;
                }
                case '^':{
                    let sub_strats = [];
                    if(child.winningChildren.length != 0){
                        sub_strats = this.getPermutations(child.winningChildren[0], strats, child.winningChildren, '');
                    }
                    for(let sub_strat of sub_strats){
                        
                        if(!(sub_strat.includes(","))){
                            let new_strat = new hmlFormula('^{'+sub_strat+'}');
                            strat.push(new_strat);
                        }else{
                            sub_strat = this.deleteDuplicates(sub_strat);
                            let new_strat = new hmlFormula('^{'+sub_strat+'}');
                            strat.push(new_strat);
                        }  
                    }
                    break;
                }
                default:{
                    for(let _strat of strats.get(child)){
                        let sub_strat = new hmlFormula(move + _strat.formula);
                        strat.push(sub_strat);
                    }
                }
            }
        }
        if(this.winningChildren.length == 0){
            let sub_strat = new hmlFormula('');
            strat.push(sub_strat);
        }
        return strat;
    }

    /**
     * 
     * @param state 
     * @param strats 
     * @param next 
     * @param formel 
     * @returns 
     */
    getPermutations(state: GamePosition, strats, next: GamePosition[], formel: string){
        let perm: string[] = []
        next.shift();
        for(let strat of strats.get(state)){
            if(next.length == 0 && (formel != '')){
                perm.push(formel + "," + strat.formula);
            }else if(next.length == 0){
                perm.push(strat.formula);
            }else{
                let temp_perm = this.getPermutations(next[0], strats, next.slice(), strat.formula)
                for(let elem of temp_perm){
                    if(formel == ''){
                        perm.push(elem);
                    }else{
                        perm.push(formel + "," + elem);
                    }
                }
            }
        }
        return perm;
    }

   /**
    * Deletes duplicated observations inside conjunction
    * @param strat strategy formula
    * @returns reduced strategy formula
    */
    deleteDuplicates(strat: string): string{
        let seperated = strat.split(",");
        let unique: string[] =[]; 
        for(let elem of seperated){
            if(!(unique.includes(elem))){
                unique.push(elem);
            }
        }
        return unique.toString();
    }


    /**
     * Transforms all defender positions to strings
     * @returns positions as string
     */
    defenderTermsToStrings(): string[]{
        let termsStrings: string[] = []
        for(let term of this.defender){
            termsStrings.push(term.term);
        }
        return termsStrings;
    }

     /**
     * Calculates recursively how often one runs into negation when descending the spectroscopy tree from this position
     * @returns number of negations
     */
    calculateNumberNegations(): number{
        let number_negations: number = 0;
        for(let child of this.winningChildren){
            if(child.winningChildren.length == 0 && child.move == '-'){
                number_negations += 1;
            }else{
                if(child.move == '-'){
                    number_negations += 1;
                }
                number_negations += child.calculateNumberNegations();
            }
        }
        return number_negations;
    }

    /**
     * Calculates recursively how many positions one runs into when descending the spectroscopy tree from this position
     * @returns number of positions
     */
    calculateNumberPositions(): number{
        let states_negations: number = 0;
        states_negations += this.winningChildren.length
        for(let child of this.winningChildren){
            states_negations += child.calculateNumberPositions()
        }
        return states_negations; 
    }

    /**
     * Checks if all possible paths starting from this position include negation
     * @returns boolean
     */
     includesNegation(): boolean{
        let negation: boolean = true;
        if(this.move == '-'){
            return true
        }else if(this.winningChildren.length == 0){
            return false
        }else{
            for(let child of this.winningChildren){
                negation = negation && child.includesNegation() 
            }
            return negation
        }  
    }


}