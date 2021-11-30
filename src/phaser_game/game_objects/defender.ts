import levelBasic from "../scenes/level_basic";
import term from "../../backend/formulas/term";
import Enemy from "./enemy";
import Field from "./field";

/**
 * A class that represents the defender in the spectroscopy invaders
 */
export default class Defender{

    enemies: Enemy[];               // Array containing all enemies
    enemy_type: string;             // The type of the enemies
    game_scene: levelBasic;         // Corresponding phaser scene 
    enemies_positions: Field[];     // Array that contains all positions of each enemy
    frozen_enemies: Enemy[][];      // In case of conjunct challenge saves all enemies in temporary array

    /**
     * 
     * @param enemy_type type of the enemy (each segment has own enemy type)
     * @param game_scene 
     */
    constructor(enemy_type: string, game_scene: levelBasic){
        this.enemy_type = enemy_type;
        this.game_scene = game_scene;

        // Create empty enemies and enemies' positions array
        this.enemies = [];
        this.enemies_positions = [];
        this.frozen_enemies = [];
    }

    /**
     * Creates new enemy on given position and ads it to enemies array.
     * @param x x-position
     * @param y y-position
     */
    addEnemy(x: number, y: number, field: Field): Enemy{
        let enemy: Enemy = new Enemy(this, x, y, field, this.game_scene, this.enemy_type);
        this.enemies.push(enemy);
        this.updateEnemiesPositions();
        return enemy;
    }

    /**
     * Move enemies that can perform transition with given observation
     * @param observation 
     */
    moveEnemies(observation: string): void{
        let enemies_copy: Enemy[] = this.enemies.slice();
        let enemy_has_moved: boolean;

        for(let enemy of enemies_copy){
            enemy_has_moved = false;

            // Iterate over every field and check if the enemy can move there performin given observation
            for(let field of this.game_scene.fields){
                if(this.game_scene.connected[enemy.position.field_number][field.field_number]  && this.game_scene.observations[enemy.position.field_number][field.field_number] == observation){
                    
                    // Instead of moveing the enemy and its sprite to next field, we create a new enemy with new sprite
                    if(!this.enemies_positions.includes(field)){
                        // delete old sprite
                        enemy.sprite.destroy();
                        // create new enemy
                        let new_enemy: Enemy = this.addEnemy(enemy.position.sprite.x, enemy.position.sprite.y, field);
                        // update new enemy's positions
                        new_enemy.position = field;
                        
                        this.game_scene.tweens.add({
                            targets: new_enemy.sprite,
                            x: field.sprite.x,
                            y: field.sprite.y,
                            duration: 200,
                        });
                        
                        // Give new enemy same conjunct_challange_position as the previous enemy
                        new_enemy.conjunct_challenge_positions = enemy.conjunct_challenge_positions.slice();
                        
                        // Update enemies positions
                        this.updateEnemiesPositions();
                    }
                    enemy_has_moved = true;      
                }
            }
            // Delete old enemy & its sprite
            this.destroyEnemy(enemy, enemy_has_moved);  
        }
    }

    /**
     * update enemie's positions saved in this.enemies_positions
     */
    updateEnemiesPositions(): void{
        let new_enemies_positions: Field[] = [];
        for(let enemy of this.enemies){
            new_enemies_positions.push(enemy.position);
        }
        this.enemies_positions = new_enemies_positions;
    }

    /**
     * Transform all current enemies into CCS terms
     * @returns 
     */
    enemiesToTerms(): term[]{
        let enemies_as_terms: term[] = []
        // From the field where the current enemies are in, we extract the CCS terms
        for(let enemy_position of this.enemies_positions){
            enemies_as_terms.push(new term(enemy_position.term));
        }
        return enemies_as_terms;
    }


    /**
     * Returns an array of all frozen and unfrozen enemies (may include duplicates)
     */
    getAllEnemies(): Enemy[]{
        let all_enemies: Enemy[] = []
        for(let enemy of this.enemies){
            all_enemies.push(enemy);
        }

        for(let frozen_enemies of this.frozen_enemies){
            for(let enemy of frozen_enemies){
                all_enemies.push(enemy);
            }
        }
        return all_enemies;
    }

    /**
     * Destroy given enem
     * @param enemy enemy to destroy
     * @param enemy_has_moved has the enemy moved after last observation activity
     */
    destroyEnemy(enemy: Enemy, enemy_has_moved: boolean){
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
        this.updateEnemiesPositions();
        enemy.destroyEnemy(enemy_has_moved);
         
    }

    /**
     * Set all enemies' sprites to interactive
     */
    setEnemiesInteractive(){
        for(let enemy of this.enemies){
            enemy.sprite.setInteractive();
        }
    }

    /**
     * Disable all enemies' sprites interactive
     */
    disableEnemiesInteractive(){
        for(let enemy of this.enemies){
            enemy.sprite.disableInteractive();
        }
    }
}