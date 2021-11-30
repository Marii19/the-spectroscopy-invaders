import levelBasic from "../scenes/level_basic";
import Enemy from "./enemy";
import GameOver from "../events/game_over";
import Field from "./field";

/**
 * A class that represents the hero (player) in the spectroscopy invaders
 */
export default class Hero{

    sprite: Phaser.GameObjects.Sprite;          // Phaseer sprite representing the hero
    position: Field;                            // Current hero position 
    game_scene: levelBasic;                     // Corresponding phaser scene
    game_over: GameOver;                        // Checks wheather a game is over or not
    conjunct_challenge_position: Field[];       // Conjunct fields for the hero
    conjunction_played: boolean;                // Indicates wheter the conjunction activity has been already played
    current_conjunction: number;                // Indicated which conjunction was currently played (0 - if no conjunction played, 1 if first conjunction, 2 if second)
    last_move: string;                          // What was the last move executed by the player
    conjunct_challenge_colors: number[];        // Colors to use for conjunct challenge positions marking
    
    /**
     * 
     * @param x x-position
     * @param y y-position
     * @param hero_field field where hero stays
     * @param game_scene 
     */
    constructor(x: number, y: number, hero_field: Field, game_scene: levelBasic){
        this.game_scene = game_scene;
        this.position = hero_field;
        this.conjunction_played = false;
        this.current_conjunction = 0;
        this.conjunct_challenge_position = [];

        // None move played yet
        this.last_move = "None"; 

        // Three different colors: red, orange and yellow in hexa numbers
        this.conjunct_challenge_colors = [0xFF0000, 0xFF6800, 0xFFFB00];

        // Create hero sprite and add to corresponding phaser scene
        let sprite: Phaser.GameObjects.Sprite = this.game_scene.add.sprite(x, y, "hero");
        this.sprite = sprite;

        // Create game_over instance
        this.game_over = new GameOver(this.game_scene);
    }

    /**
     * Performs observation activity
     * @param field 
     */
    observationActivity(field: Field){
        // Check if there is a transition between current hero Field and clicked Field
        if(this.game_scene.connected[this.position.field_number][field.field_number]){

            // Get the observation 
            let observation: string = this.game_scene.observations[this.position.field_number][field.field_number];

            // Update hero position
            this.game_scene.tweens.add({
                targets: this.sprite,
                x: field.sprite.x,
                y: field.sprite.y,
                duration: 200,
            })
            this.position = field;

            // Move the enemies
            this.game_scene.defender.moveEnemies(observation);

            // Update player
            this.game_scene.spectroscopy.player.addAttackerMove(observation);

            // Check if game over
            this.game_over.gameOver(observation);
            this.last_move = observation;
        }
    }
    /**
     * Performs negation activity
     * @returns 
     */
    negationActivity(){
        // Allow only if exactly one enemy
        if(this.game_scene.defender.enemies.length > 1 ){
            return;
        }
        this.last_move = "-";

        // Get the only enemy
        let enemy: Enemy = this.game_scene.defender.enemies[0];
        let enemy_position: Field = enemy.position;


        // Move enemy to groom's hexagone
        this.game_scene.tweens.add({
            targets: enemy.sprite,
            x: this.position.sprite.x,
            y: this.position.sprite.y,
            duration: 200
        })

        // Move hero to enemy's hexagone
        this.game_scene.tweens.add({
            targets: this.sprite,
            x: enemy.position.sprite.x,
            y: enemy.position.sprite.y,
            duration: 200
        })

        // Update positions
        enemy.position = this.position;
        this.position = enemy_position;
        this.game_scene.defender.updateEnemiesPositions();
        
        // Add the negation move to spectroscopy
        this.game_scene.spectroscopy.player.addAttackerMove("-");
        this.game_over.gameOver("-");
    }

    /**
     * Performs conjunct challenge activity
     * @returns 
     */
    conjunctChallengeActivity(){
        // Allow only if more than one current enemy
        if(this.last_move == "^"  || this.game_scene.defender.enemies.length <= 1){
            return;
        }
        this.last_move = "^";
        this.conjunction_played = true;

        // Get color for marking fields and push it at the end of the list afterwards
        let conjunct_color = this.conjunct_challenge_colors.shift();
        this.conjunct_challenge_colors.push(conjunct_color);
        // Add conjunct challenge to player moves
        this.game_scene.spectroscopy.player.addAttackerMove("^");

        // Change colors
        for(let enemy_position of this.game_scene.defender.enemies_positions){
            enemy_position.sprite.setTint(conjunct_color);
        }

        // Change visibility
        for(let enemy of this.game_scene.defender.enemies){
            enemy.sprite.setAlpha(0.3);
        }

        // Change hero field color
        this.position.sprite.setTint(conjunct_color);
        this.conjunction_played = true;

        // Add current hero position to the front of hero cc positions (FCLS)
        this.conjunct_challenge_position.unshift(this.position);

        // Create a list of frozen enemies and add it to the front of the defender frozen enemies FCLS list
        let frozen_enemies = []
        for(let enemy of this.game_scene.defender.enemies){
            frozen_enemies.push(enemy);
            enemy.conjunct_challenge_positions.unshift(enemy.position);
        }
        
        this.game_scene.defender.frozen_enemies.unshift(frozen_enemies);
        this.chooseNextEnemy();
        this.game_over.gameOver("^");
    }

    /**
     * Chooses next enemy to defeat after a conjunct challenge
     */
    chooseNextEnemy(){
        this.moveHerotoConjunctChallengePosition();
        let frozen_enemies = this.game_scene.defender.frozen_enemies[0];
        let current_enemy = frozen_enemies.shift();
        this.game_scene.defender.enemies = [current_enemy];
        current_enemy.pulseEnemy();
        this.game_scene.defender.updateEnemiesPositions();
        current_enemy.sprite.setAlpha(1);
        this.game_scene.spectroscopy.player.addAttackerMove("*");
    }

    /**
     * Move hero back to conjunct challenge 
     */
    moveHerotoConjunctChallengePosition(){
        let conjunct_challenge_position = this.conjunct_challenge_position[0];
        this.game_scene.tweens.add({
            targets: this.sprite,
            x: conjunct_challenge_position.sprite.x,
            y: conjunct_challenge_position.sprite.y,
            duration: 200
        });
        this.position = conjunct_challenge_position;
    }

}