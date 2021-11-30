import levelBasic from "../scenes/level_basic";
import Button from "./basic_button";

/**
 * A class for main menu button
 */
export default class MainMenuButton extends Button{
button_text: Phaser.GameObjects.Image;      // Text showing when hovered on the button


    constructor(game_scene: levelBasic){
        // Call button constructor 
        super(50, 50, 'main_menu', game_scene);
        this.button_text = game_scene.add.image(250, 50, "menu_text");
        this.button_text.visible = false;

        // Add on click event
        this.addOnClickEvent();

        this.button.on("pointerover", function(){
            this.button_text.visible = true;
        }, this);

        this.button.on("pointerout", function(){
            this.button_text.visible = false;
        }, this);


    }

    /**
     * Adds on click listener that 
     */
    addOnClickEvent(): void{
        this.button.on('pointerdown', function(){
            this.game.scene.stop(this.name);
            this.game.scene.wake('main menu');
        }, this.game_scene);
    }



    
}