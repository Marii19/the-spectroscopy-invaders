import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import level from "../level";


export default class failureOne extends level{
first_open: boolean;        // Indicates wheather the level has been opened before

    constructor(){
        let instructions: string[] = ['failure', "move negation info", 'move observation info']
        super('failure one', 'a.b.0+a.c.0', 'a.(b.0+c.0)', 'Failure', instructions);
        this.enemy = "enemy_failure"
        this.first_open = true;
    }

    preload(){
        super.preload();
        this.load.image('background_failure', 'assets/backgrounds/level_backgrounds/background_failure.png');
        this.load.spritesheet('enemy_failure', 'assets/characters/enemy_failure.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(){
        if(this.first_open){
            // show instructions on how to play negation activity before starting level
            this.showInstructions();
            this.first_open = false;
        }else{
            this.createLevel();
        }
    }

    /**
     * Show negation activity instructions
     */
    showInstructions(){
        let info_image: Phaser.GameObjects.Image = this.add.image(400, 300, "move negation info");
        let next_arrow: Phaser.GameObjects.Image = this.add.image(750, 550, 'next_arrow').setScale(1.3).setInteractive();

        let observation_move_video: Phaser.GameObjects.Video = this.add.video(400, 200, 'move negation info video').setScale(0.4);
        observation_move_video.play(true);
        next_arrow.on("pointerdown", function(){
            info_image.destroy();
            next_arrow.destroy();
            observation_move_video.destroy();
            this.createLevel();
        }, this);
        
    }

    /**
     * Creates the fields and arrows ...
     */
    createLevel(){
        this.add.image(400, 300, 'background_failure');
        super.create();
 
        // Fields
        let field_0: Field = this.createField(200, 250, 'a.b.0+a.c.0', 0);

        this.createField(100, 400, 'b.0', 1);

        this.createField(300, 400, 'c.0', 2);

        this.createField(200, 550, '0', 3);

        let field_defender: Field = this.createField(600, 250, 'a.(b.0+c.0)', 4);

        this.createField(600, 400, 'b.0+c.0', 5);

        this.createField(500, 550, '0', 6);

        this.createField(700, 550, '0', 7);

        //create arrows
        // 0
        this.add.image(150,325, 'arrow').setTint(0xff8800).rotation += 2.3;
        // 1
        this.add.image(250,325, 'arrow').setTint(0xff8800).rotation += 0.8;
        // 2
        this.add.image(150,475, 'arrow').setTint(0x0000ff).rotation += 0.8;
        // 3
        this.add.image(250,475, 'arrow').setTint(0xffff00).rotation += 2.3;
        // 4
        this.add.image(600,325, 'arrow').setTint(0xff8800).rotation += 1.57;
        // 5
        this.add.image(550,475, 'arrow').setTint(0x0000ff).rotation += 2.35;
        // 6
        this.add.image(650,475, 'arrow').setTint(0xffff00).rotation += 0.8;
        
        //initialize the adjacency matrix
        this.connected = this.createConnections(8);
        this.connected[0][1] = 1;
        this.connected[0][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][3] = 1;
        this.connected[4][5] = 1;
        this.connected[5][6] = 1;
        this.connected[5][7] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(12);
        this.observations[0][1] = 'a';
        this.observations[0][2] = 'a';
        this.observations[1][3] = 'b';
        this.observations[2][3] = 'c';
        this.observations[4][5] = 'a';
        this.observations[5][6] = 'b';
        this.observations[5][7] = 'c';

        //create hero
        this.hero = new Hero(200, 250, field_0, this);

        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 250, field_defender);
    }

    
}
