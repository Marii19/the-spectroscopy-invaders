import GamePosition from "../game_objects/game-position"; 
import term from "../formulas/term";
import gameMove from "../game_objects/game-move"
import SpectroscopyProcedure from "../spectroscopy/spectroscopy-procedure";
import hmlFormula from "../formulas/hml-formula";

/**
 * Implementation of the spectroscopy game. This class computes the spectroscopy game (all possible moves), computes the winning region and the winning strategy graph, 
 * and calculates the cheapest distinguishing formulas for initial states
 */
export default class SpectroscopyGame {
    startPosition: GamePosition;                    // Initial game position
    spectroscopyProcedure: SpectroscopyProcedure;   // Instanz that computes the spectroscopy procedure
    observation: string;                            // Observational language (used in spectroscopy procedure)
    stop_at: string;                                // What game moves to calculate

    /**
     * Create spectroscopy game instanz
     * @param player    // Field that represents the attacker
     * @param defender  // Fields that represents defender
     * @param turn      // Whos turn is it at the start of the game
     * @param stop_at   
     * @param observation 
     */
    constructor(player: term, defender: term[], turn: string, stop_at: string, observation: string){      
        let startPosition = new GamePosition(player, defender, turn);
        this.stop_at = stop_at;
        this.startPosition = startPosition;
        this.startPosition.visitedStates.push(startPosition);

        // Create spectroscopy procedure instance for this game
        this.spectroscopyProcedure = new SpectroscopyProcedure(observation);
    }

    /**
     * Construct the spectroscopy game (calculate all moves), compute the winning region and the winning strategy graph.
     */
    computeStrategyGraph(): void{
        this.constructSpectroscopyGame(this.startPosition);
        this.startPosition.isWinningRegion();
        this.startPosition.calculateWinningStrategyGraph();
    }

    /**
     * Construct the spectroscopy game by calculating all possible moves (no cycles)
     * @param startState 
     * @returns 
     */
    constructSpectroscopyGame(startState: GamePosition): gameMove[]{
        let moves: gameMove[] = [];
        let moves_queue: gameMove[] = [];
        // Calculate moves for either attacker or defender  
        if(startState.turn == "attacker"){
            moves = startState.calculatePlayerMoves(this.stop_at);
            startState.getChildrenFromMoves(moves);
        }else{
            moves = startState.calculateDefenderMoves();
            startState.getChildrenFromMoves(moves);
        } 
        moves_queue = moves;
        // Pop one move from the queue and calculate its next moves
        while(moves_queue.length != 0){
            let move = moves_queue.shift();
            let new_moves = this.constructSpectroscopyGame(move.targetPosition)
            moves = moves.concat(new_moves);
        }
        return moves;
    }

    /**
     * Using spectroscopy procedure collect cheapest distinguishing formulas and selects only the ones that fit into given observation language
     * @returns cheapest distinguishing formulas
     */
    collectCheapestFormulas(): hmlFormula[]{
        let formulas = this.spectroscopyProcedure.calculateCheapestFormulas(this.startPosition);
        return this.spectroscopyProcedure.collectObservations(formulas);
    }

    /**
     * Prints all game positions starting from the initial position
     */
    printTree(): void{
        this.startPosition.printAllChildren(0);
    }
}


