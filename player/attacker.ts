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

    addDefenderMove(){
        let i = 0;
        for(let state of this.actualState.children){
            if(i == this.actualState.children.length -1){
                let playerState = new gameState(state.player, state.defender, state.turn);
                playerState.winningRegion = true;
                playerState.move = state.move;
                this.actualPlayerState.winningChildren.push(playerState);
                this.actualPlayerState = playerState;
                this.actualState = state; 
            }else{
                let playerState = new gameState(state.player, state.defender, state.turn);
                playerState.winningRegion = true;
                playerState.move = state.move;
                playerState.children = state.children
                playerState.winningChildren = state.winningChildren;
                this.actualPlayerState.winningChildren.push(playerState);
            }
            i +=1;
        }

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