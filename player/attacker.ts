import {attackerMove} from './attacker_move';
import {hmlFormula} from '../formulas/hml-formula';
import {spectroscopyGame} from '../spectroscopy/create-spectroscopy-game';
import {gameState} from '../game_objects/game-state';
import { term } from '../formulas/term';
import { spectroscopyProcedure } from '../spectroscopy/spectroscopy-procedure';

export class attacker {

    playerStartState: gameState;
    //TODO type strats as a map
    game: spectroscopyGame;
    actualState: gameState;
    actualPlayerState: gameState;
    spectroscopy: spectroscopyProcedure;
    
    constructor(game: spectroscopyGame, player: term, defender: term[], turn: string){
        this.playerStartState = new gameState(player, defender,turn);
        this.game = game;
        this.actualState = game.startState;
        this.actualPlayerState = this.playerStartState;
        this.spectroscopy = new spectroscopyProcedure(player, defender, turn, false);
    }

    addAttackerMove(move: string,  target: string){
        for(let state of this.actualState.children){
            // Finds a corresponding move in game and adds winningChild to actualState
            if((state.move) == move && (state.player.term == target)){
                let playerState = new gameState(state.player, state.defender, state.turn);
                playerState.winningRegion = true;
                playerState.move = move;
                this.actualPlayerState.winningChildren.push(playerState);
                this.actualPlayerState = playerState;
                this.actualState = state;
            }
        }
    }

    /**
     * Computes the defender move
     */
    addDefenderMove(){
        let defenderMove = this.chooseDefenderMove();

        // Iterate over all children and add all non defenderMove to winningChildren
        for(let state of this.actualState.children){
            if(state == defenderMove){
                let playerState = new gameState(state.player, state.defender, state.turn);
                playerState.winningRegion = true;
                playerState.move = state.move;
                playerState.children = state.children
                playerState.winningChildren = state.winningChildren;
                this.actualPlayerState.winningChildren.push(playerState);
            }
        }
        // Add defenderMove to winningCHildren and overwrite actualState with defenderMove
        let playerState = new gameState(defenderMove.player, defenderMove.defender, defenderMove.turn);
        playerState.winningRegion = true;
        playerState.move = defenderMove.move;
        this.actualPlayerState.winningChildren.push(playerState);
        this.actualPlayerState = playerState;
        this.actualState = defenderMove; 
    }

    /**
     * Implements strategy for choosing next defender move
     * TODO implement strategy ( first move for now )
     */
    chooseDefenderMove(){
        return this.actualState.children[0];
    }

    movesToFormel(){
        this.playerStartState.winningRegion = true;
        this.spectroscopy.game.startState = this.playerStartState;
        let strats = this.spectroscopy.calculateCheapestFormulas();
        for(let strat of strats){
            console.log(strat.formula)
        }
    }
}