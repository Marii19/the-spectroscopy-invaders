import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import levelTrace from "../level_trace";

/** 
 * A class representing first trace level in the spectroscopy invadors
 */
export default class traceOne extends levelTrace{
    first_open: boolean;        // Has the level been opened before

    constructor(){
        // What instructions to display after clicking on info button
        let instructions: string[] = ['trace', 'move observation info']
        super('trace one', 'c.c.0+a.b.0', 'a.b.0+c.a.0', 'Trace', instructions);
        this.enemy = "enemy_trace";
        this.first_open = true;
    }

    preload(){
        super.preload();
        this.load.image('background_trace', 'assets/backgrounds/level_backgrounds/background_trace.png');
        this.load.spritesheet('enemy_trace', 'assets/characters/enemy_trace.png', { frameWidth: 32, frameHeight: 48 });
        
    }

    create(){
        this.preload();
        // SHow instructions before creating the level
        if(this.first_open){
            this.showInstructions('info button at levels');
            this.first_open = false;
        }else{
            this.createLevel();
        }
    }

    /**
     * Shows instructions of how to play observation activity and where to find the segment instructions
     * @param info what instruction to show
     */
    showInstructions(info: string){
        let info_image: Phaser.GameObjects.Image = this.add.image(400, 300, info);
        let next_arrow: Phaser.GameObjects.Image = this.add.image(750, 550, 'next_arrow').setScale(1.3).setInteractive();

        if(info == 'move observation info'){
            let observation_move_video: Phaser.GameObjects.Video = this.add.video(400, 200, 'move observation info video').setScale(0.4);
            observation_move_video.play(true);
            next_arrow.on("pointerdown", function(){
                info_image.destroy();
                next_arrow.destroy();
                observation_move_video.destroy();
                this.createLevel();
            }, this);
        }else{
            next_arrow.on("pointerdown", function(){
                info_image.destroy();
                next_arrow.destroy();
                // Call this funtion for observation activity instruction
                this.showInstructions('move observation info');
            }, this);
        }
    }

    /**
     * Creates the level by adding fields and arrows
     */
    createLevel(){
        // Add background
        this.add.image(400, 300, 'background_trace');
        super.create();

        // Adds the fields
        let field_0: Field = this.createField(200, 200, 'c.c.0+a.b.0', 0);

        this.createField(100, 320, 'c.0', 1);

        this.createField(300, 320, 'b.0', 2);

        this.createField(200, 440, '0', 3);

        let field_4: Field = this.createField(600, 200, 'a.b.0+c.a.0', 4);

        this.createField(500, 320, 'b.0', 5);

        this.createField(700, 320, 'a.0', 6);

        this.createField(600, 440, '0', 7);

        //create arrows
        this.createArrow(150, 260, 2.3, 0xFFFF00)

        this.createArrow(250, 260, 0.9, 0xff8000)

        this.createArrow(150, 380, 0.9, 0xffff00)
        
        this.createArrow(250, 380, 2.3, 0x0000FF)

        this.createArrow(550, 260, 2.3, 0xFF8000)

        this.createArrow(650, 260, 0.9, 0xFFFF00)

        this.createArrow(550, 380, 0.9, 0x0000FF)
        
        this.createArrow(650, 380, 2.3, 0xFF8000)

        //initialize the adjacency matrix
        this.connected = this.createConnections(8);
        this.connected[0][1] = 1;
        this.connected[0][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][3] = 1;
        this.connected[4][5] = 1;
        this.connected[4][6] = 1;
        this.connected[5][7] = 1;
        this.connected[6][7] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(8);
        this.observations[0][1] = 'c';
        this.observations[0][2] = 'a';
        this.observations[1][3] = 'c';
        this.observations[2][3] = 'b';
        this.observations[4][5] = 'a';
        this.observations[4][6] = 'c';
        this.observations[5][7] = 'b';
        this.observations[6][7] = 'a';

        // create hero
        this.hero = new Hero(200, 200, field_0, this);

        // create defender
        this.defender = new Defender(this.enemy, this); 

        // Create first enemy
        this.defender.addEnemy(600, 200, field_4); 
    }
}
