import levelBasic from "../scenes/level_basic";
import Field from "../game_objects/field";
import GamePosition from "../../backend/game_objects/game-position";
import term from "../../backend/formulas/term";
import Enemy from "../game_objects/enemy";

/**
 * A class for game over event
 */
export default class GameOver{
    game_scene: levelBasic;     // corresponding game scene
    prelost: number;            // How many times has current game been prelost

    constructor(game_scene: levelBasic){
        this.game_scene = game_scene;
        this.prelost = 0;
    }

    /**
     * Checks if the game is over: won, lost or prelost
     * @param move last game activity performed
     * @returns 
     */
    gameOver(move: string){
        // Check if game is won
        if(this.isGameWon()){
            this.gameWonReact();
            return;
        }
        // Check if game is lost
        if(this.isGameLost()){
            this.gameLostReact();
            return;
        }

        // Check if game is prelost
        if(this.isGamePreLost(move)){
            this.gamePreLostReact();
            return;
        };            
    }
    

    /**
     * Checks if the game is won
     * @returns boolean
     */
    isGameWon(): boolean{
        if(this.game_scene.defender.enemies.length == 0){ 
            // Game won if there is no enemies and frozen enemies left
            let temp_frozen_enemies: Enemy[][] = this.game_scene.defender.frozen_enemies.slice()
            for(let frozen_enemies of temp_frozen_enemies){

                // If all frozen enemies have been defeated shift hero conjunct position and frozen enemies, and close current conjunction
                if(frozen_enemies.length == 0){
                    this.game_scene.hero.conjunct_challenge_position.shift();
                    this.game_scene.defender.frozen_enemies.shift();
                    this.game_scene.spectroscopy.player.closeConjunction();
                }
                // If at least one frozen enemy left return false
                else{
                    this.game_scene.hero.chooseNextEnemy();
                    return false;
                }
            }
            return true
            
        }else{
            return false;
        }
    }

    /**
     * If game is won, creates needed images and finishes a level
     */
    gameWonReact(): void{

        // Get player's formula
        let player_result = this.game_scene.spectroscopy.player.movesToFormel()
        
        // Get stars by comparing the player's formula with spectroscopy procedure result
        let stars: number = this.game_scene.spectroscopy.spectroscopyGame.spectroscopyProcedure.compareProcedureToPlayer(this.game_scene.spectroscopy.observation_strats, player_result);

        // Add images
        this.game_scene.add.sprite(400, 300, 'gameover_background');
        this.game_scene.add.sprite(400, 190, 'game_over');
        this.game_scene.add.sprite(400, 230, 'won');
        this.game_scene.add.image(375, 290, 'star_empty').setScale(1.5);
        this.game_scene.add.image(425, 290, 'star_empty').setScale(1.5);

        //Depending on stars number show right feedback
        if(stars == 1){
            this.game_scene.add.image(400, 260, 'nice');
        }else if(stars == 2){
            this.game_scene.add.image(400, 260, 'perfect');
        }else{
            this.game_scene.add.image(410, 260, 'read instructions');

        }

        // Show start
        let x = 375;
        let y = 290;
        for(let i = 0; i<stars ; i++){
            let star = this.game_scene.add.image(0, 350, 'star').setScale(1.5);
            this.game_scene.tweens.add({
                
                targets: star,
                x: x,
                y: y,
                duration: 500,
            })
            x += 50;  
        }
        // If the level is not the last level, add "Next level" button
        if(this.game_scene.name != 'bisimulation four'){
            this.game_scene.add.sprite(412, 330, 'next').setInteractive().on('pointerdown', function(){
                // Run next level
                this.game_scene.game.scene.stop(this.game_scene.name);
                this.game_scene.game.scene.start(this.game_scene.game.scene.getAt(this.game_scene.game.scene.getIndex(this.game_scene.name) +1 ))
            },this);
        }
        
        // Add restart and back to menu buttons
        this.game_scene.restartButton = this.game_scene.add.sprite(450, 370, 'restart').setInteractive().on('pointerdown', function(){
            this.game_scene.scene.start(this.game_scene.name);
        },this);
        this.game_scene.add.sprite(350, 370, 'menu').setInteractive().on('pointerdown', function(){
            this.game_scene.scene.stop(this.game_scene.name);
            this.game_scene.scene.wake('main menu');
        },this);

        // Disable all sprites expect menu, restart and next
        this.game_scene.disableAll();

        // Update stars in main menu
        let main_menu: any= this.game_scene.scene.get('main menu');
        main_menu.updateStars(stars, this.game_scene.name);
    }
    
    /**
     * Checks if the hero has lost the game
     * @returns True/False
     */
    isGameLost(): boolean{
        // Check if hero is in closed field
        if(this.game_scene.hero.position.term == '0'){
            // For all current enemies, check if at least one enemy is in a closed field
            for(let enemy of this.game_scene.defender.enemies){
                if(enemy.position.term == "0"){
                    return true;
                }
            }
        }
        return false;   
    }

    /**
     * React to lost game
     */
    gameLostReact(): void{
        // Show game over images
        this.game_scene.add.sprite(400, 300, 'gameover_background');
        this.game_scene.add.sprite(400, 190, 'game_over');
        this.game_scene.add.sprite(405, 260, 'lost');

        // Add restart and main menu buttons
        this.game_scene.add.sprite(450, 350, 'restart').setInteractive().on('pointerdown', function(){
            this.game_scene.scene.start(this.game_scene.name);
        },this);
        this.game_scene.add.sprite(360, 350, 'menu').setInteractive().on('pointerdown', function(){
            this.game_scene.scene.stop(this.game_scene.name);
            this.game_scene.scene.wake('main menu');
        },this);

        // Disable all other sprites
        this.game_scene.disableAll();
    }

    /**
     * Checks if the game ist pre lost (the player looses no matter what happens)
     * @param move last move played
     * @returns 
     */
    isGamePreLost(move: string): boolean{
        // if the same evel has already been prelost, just return true
        if(this.prelost > 0){
            return true;
        }
        
        // Create a game position from current configuration
        let hero_term: term = new term(this.game_scene.hero.position.term);
        let defender_terms: term[] = this.game_scene.defender.enemiesToTerms();
        let targetPosition: GamePosition = new GamePosition(hero_term, defender_terms, "attacker");
        targetPosition.move = move; 

        // Check if the position is part of attacker winning region
        let won: boolean = this.searchIfPositionWon(this.game_scene.spectroscopy.spectroscopyGame.startPosition, targetPosition);
        return !won;
    }

    /**
     * React if game pre lost
     */
    gamePreLostReact(): void{
        // A pop-up shows informing the player that he/she has lost and asks whether to restart the level or continue
        // Pop-up shows only if the player has prelost and made at least one further activity (if the player decides to continue, the pop-up is not showed again)
        if((this.prelost == 1) && !this.isGameLost()){
            // Disable all buttons
            this.game_scene.disableAll();

            //Create pop-up
            let background = this.game_scene.add.sprite(400, 300, 'prelost_background');

            //Create restart and continue buttons
            let restart = this.game_scene.add.sprite(450, 379, 'restart').setInteractive().on('pointerdown', function(){
                this.game_scene.scene.start(this.name);
            },this);

            // Continue the levell if player pushes "continue"
            let continue_button = this.game_scene.add.sprite(360, 379, 'continue').setInteractive().on('pointerdown', function(){
                this.prelost += 1;
                this.game_scene.enableAll();
                background.destroy();
                restart.destroy();
                continue_button.destroy();
            },this);

        // If the game is pre lost for the first time (or game was beed continued after showing pop-up), pulse the restart button
        }else if(!this.isGameLost()){
            this.game_scene.restart_level_button.pulseButton(2);
            this.prelost += 1;
        }
    }


    /**
     * Traverse the spectroscopy tree in order to find the target position and see if it is part of attacker winning region
     * @param startPosition     // Start position (where to start traversing)
     * @param targetPosition    // Target position
     * @returns boolean
     */
    searchIfPositionWon(startPosition: GamePosition, targetPosition: GamePosition): boolean{
        let todo: GamePosition[] = [];
        if(startPosition.compare(targetPosition)){
            return startPosition.winningRegion;
        }else if(startPosition.children.length > 0 ){
            todo = startPosition.children.slice();
        }

        while(todo.length > 0){
            let tempPosition: GamePosition= todo.shift();
            if(tempPosition.compare(targetPosition)){
                if(tempPosition.winningRegion != false || tempPosition.move != "-"){
                    return tempPosition.winningRegion;
                }
            }else if(tempPosition.children.length > 0 ){
                todo = tempPosition.children.concat(todo);
            }
        }
        return true;
    }
}