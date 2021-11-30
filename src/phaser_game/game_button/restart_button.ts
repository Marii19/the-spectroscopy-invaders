import levelBasic from "../scenes/level_basic";
import Button from "./basic_button";

// A class for restart button
export default class RestartButton extends Button{
    constructor(game_scene: levelBasic){
        // Call button constructor 
        super(750, 50, 'restart_button', game_scene);

        // Add on click event
        this.addOnClickEvent();
    }

    /**
     * Adds on click listener that restarts the scene
     */
    addOnClickEvent(){
        this.button.on('pointerdown', function(){
            this.game.scene.start(this.name);
        }, this.game_scene);
    }

    /**
     * makes the button pulse
     * @param timesLeft how many times to pulse
     */
    pulseButton(timesLeft: number){
        let fade = this.game_scene.tweens.add({
            targets: this.button,
            alpha: 0.5,
            duration: 500,
        })

        fade.on("complete", function(){
            let unfade = this.game_scene.tweens.add({
                targets: this.button,
                alpha: 1,
                duration: 500
            });
            unfade.on("complete", function(){
                if(timesLeft != 0){
                    this.pulseButton(timesLeft - 1)
                }
            }, this)
        }, this);

    }
}