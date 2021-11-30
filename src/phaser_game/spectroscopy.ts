import levelBasic from "./scenes/level_basic";
import hmlFormula  from "../backend/formulas/hml-formula";
import term from "../backend/formulas/term";
import attacker  from "../backend/player/attacker";
import SpectroscopyGame  from "../backend/spectroscopy/spectroscopy_game";

/**
 * A cass that connects the phaser game with backend
 */
export default class Spectroscopy{
    player: attacker;                   // Attacker instance
    spectroscopyGame: SpectroscopyGame; // SPectroscopy game
    observation_strats: hmlFormula[];   // Cheapest distinguishing formulas
    game_scene: levelBasic;

    /**
     * 
     * @param attacker_term initial attacker state
     * @param defender_term initial hero state
     * @param type observation language
     * @param game_scene 
     */
    constructor(attacker_term: string, defender_term: string, type: string, game_scene: levelBasic){
        this.game_scene = game_scene;

        // Create spectroscopy game
        let p: term = new term(attacker_term);
        let q: term = new term(defender_term);
        let stop_at: string = "conjunctions";

        // For trace levels, create compute spectroscopy tree containing only observation moves
        if(type == "Trace"){
            stop_at = "observations";
        // For failure levels one and two, create compute spectroscopy tree containing only observation moves and negation moves
        }else if(this.game_scene.name == "failure one" || this.game_scene.name == "failure two"){
            stop_at = "negations";
        }
        
        // Create spectroscopy game and calculate cheapest distinguishing formulas for initial states
        this.spectroscopyGame = new SpectroscopyGame(p, [q], "attacker", stop_at, type);
        this.spectroscopyGame.computeStrategyGraph();
        this.observation_strats = this.spectroscopyGame.collectCheapestFormulas();
        this.player = new attacker();
    }
}