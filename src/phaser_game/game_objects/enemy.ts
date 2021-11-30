import levelBasic from "../scenes/level_basic";
import Defender from "./defender";
import Field from "./field";

/**
 * A class that represents one enemy (elf)
 */
export default class Enemy{

    x: number;                          // Current enemy x position
    y: number;                          // Current enemy y position
    defender: Defender                  // Defender instance that the enemy belongs to
    game_scene: levelBasic;             // Corresponding phaer scene
    sprite: Phaser.GameObjects.Sprite;  // Contains sprite to this enemy
    enemy: string;                      // Contains enemy type (trace, failure, ...)
    position: Field;                    // Tells in which field is the enemy placed
    conjunct_challenge_positions: Field[]; // Positions of this enemy in during conjunct activities (as queue first in first out)


    /**
     * 
     * @param defender corresponding defender
     * @param x x-position
     * @param y y-position
     * @param field game field where this enemy is currently at
     * @param game_scene 
     * @param enemy enemy type
     */
    constructor(defender: Defender, x: number, y: number, field: Field, game_scene: levelBasic, enemy:  string){
        this.x = x;
        this.y = y;
        this.game_scene = game_scene;
        this.enemy = enemy;
        this.position = field;
        this.defender = defender;
        this.conjunct_challenge_positions = [];

        // Add enemy sprite to corresponding scene
        let sprite: Phaser.GameObjects.Sprite = this.game_scene.add.sprite(this.x, this.y, this.enemy);
        this.sprite = sprite;
    }

    /**
     * Creates tween's shaking animation when the enemy has been defeated without moving
     */
    fancyDestroy(){
        let startShake = this.game_scene.tweens.add({
            targets: this.sprite,
            rotation: this.sprite.rotation - 0.5,
            duration: 50
        })
        
        startShake.on("complete", function(){
            this.shakeEnemySprite(1)
        }, this);
    }

    /**
     * SHake enemy sprite given number of times
     * @param times_left 
     */
    shakeEnemySprite(times_left: number){
        let rightShake = this.game_scene.tweens.add({
            targets: this.sprite,
            rotation: this.sprite.rotation + 1,
            tint: 0xFF0000,
            duration: 50
        });
        rightShake.on("complete", function(){
            let leftShake = this.game_scene.tweens.add({
                targets: this.sprite,
                rotation: this.sprite.rotation - 1,
                tint: 0xFCFF00,
                duration: 50
            })
            leftShake.on("complete", function(){
                if(times_left != 0){
                    this.shakeEnemySprite(times_left - 1)
                }else{
                    this.sprite.destroy();
                }
            },this);
        }, this);
    }

    /**
     * Destroy the enemy sprite 
     * @param has_moved 
     * @param current_conjunction 
     */
    destroyEnemy(has_moved: boolean){
        // If the enemy has not performed any move, then he is defeated and removed with animation        
        if(!has_moved && this.game_scene.hero.conjunction_played){
            for(let cc_position of this.conjunct_challenge_positions){
                // Is there any other enemy that cc_position originates form the current cc-position ?
                let position_undefeated: boolean = false;
                // Check if any other current enemy has the same origin cc_position
                for(let enemy of this.game_scene.defender.getAllEnemies()){
                    for(let enemy_position of enemy.conjunct_challenge_positions){
                        if(enemy_position == cc_position){
                            position_undefeated = true;
                        }
                    }
                }

               if(!position_undefeated){
                   cc_position.sprite.clearTint();
               }

               this.fancyDestroy();
            }            
            this.fancyDestroy();
        }
        // No cc move played, just destroy the enemy with animation
        else if(!has_moved){
            this.fancyDestroy();
        }
        // ENemy performed move, therefore was not defeated (no animation, just destroy sprite)
        else{
            this.sprite.destroy();
        }  
    }

    /**
     * Creates tween's shaking animation when the enemy has been defeated
     */
     pulseEnemy(){
        let startPulse = this.game_scene.tweens.add({
            targets: this.sprite,
            scale: this.sprite.scale + 0.3,
            duration: 50
        })
        
        startPulse.on("complete", function(){
            this.pulseEnemySprite(1)
        }, this);
    }

    /**
     * Pulse the sprite 
     * @param times_left 
     */
    pulseEnemySprite(times_left: number){
        let makeBig = this.game_scene.tweens.add({
            targets: this.sprite,
            scale: 0.7,
            duration: 50
        });
        makeBig.on("complete", function(){
            let makeSmall = this.game_scene.tweens.add({
                targets: this.sprite,
                scale: 1.0,
                duration: 50
            })
        }, this);
    }
}