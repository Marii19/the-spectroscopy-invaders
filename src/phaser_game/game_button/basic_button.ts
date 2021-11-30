import levelBasic from "../scenes/level_basic";

/**
 * A class representing basic button template
 */
export default class Button{

    game_scene: levelBasic;               // Corresponding phaser scene
    button: Phaser.GameObjects.Sprite;    // Button sprite

    /**
     * Construct basic button instanz
     * @param x             // x-position
     * @param y             // y-position
     * @param button_name   // name of the button (used in add.sprite())
     * @param game_scene    
     */
    constructor(x: number, y: number, button_name: string, game_scene: levelBasic){
        this.game_scene = game_scene

        // Create button sprite and add to corresponding phaser scene
        let button: Phaser.GameObjects.Sprite = this.game_scene.add.sprite(x, y, button_name).setInteractive();
        this.button = button;

        // Add hower event to the button
        this.addHowerEvent()
    }

    /**
     * Adds a listiner for hower on button effect
     */
    addHowerEvent(){
        this.button.on('pointerover', function(){
            this.button.alpha = 0.6;
        }, this);
        this.button.on('pointerout', function(){
            this.button.alpha = 1;
        }, this);  
    }
    
    
}