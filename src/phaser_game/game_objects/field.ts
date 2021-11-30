import levelBasic from "../scenes/level_basic";

/**
 * A class that represents a filed in the spectroscopy invaders
 */
export default class Field{ 
    term: string;                       // CSS term that this field represents
    game_scene: levelBasic;             // Corresponding phaser scene
    sprite: Phaser.GameObjects.Sprite;  // Field sprite
    field_number: number;               // Number of field

    /**
     * 
     * @param x x-position
     * @param y y-position
     * @param term CCS term
     * @param field_number number of the field
     * @param game_scene 
     */
    constructor(x: number, y: number, term: string, field_number: number, game_scene: levelBasic){
        this.term = term;
        this.field_number = field_number;
        this.game_scene = game_scene;
        this.sprite = this.game_scene.add.sprite(x, y, 'field_original');

        
        // Add properties to sprite
        this.sprite.setInteractive();
        this.game_scene.fields.push(this);
        // this.sprite.setTint(0x00F2FF);

        // Add on click event
        this.addOnClickEvent()

    }

    /**
     * Add event listener to perform observation move
     */
    addOnClickEvent(){
        this.sprite.on("pointerdown", function(){
            this.game_scene.hero.observationActivity(this);
        }, this);
    }

}