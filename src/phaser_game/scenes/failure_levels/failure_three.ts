import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import level from "../level";


export default class failureThree extends level{
first_open: boolean;    // Indicates whether this level has been opened before

    constructor(){
        let instructions: string[] = ['failure', 'move conjunct info', "move negation info", 'move observation info']
        super('failure three', 'a.b.0+a.0+a.c.0', 'a.b.0+a.(b.b.0+c.c.0)+a.c.0', 'Failure', instructions);
        this.enemy = "enemy_failure";
        this.first_open = true;
    }

    preload(){
        super.preload();
        this.load.image('background_failure', 'assets/backgrounds/level_backgrounds/background_failure.png');
        this.load.spritesheet('enemy_failure', 'assets/characters/enemy_failure.png', { frameWidth: 32, frameHeight: 48 });
        
    }

    create(){
        if(this.first_open){
            // First show the conjunct acctivity instruction before creating level
            this.showInstructions();
            this.first_open = false;
        }else{
            this.createLevel();
        }
    }

    /**
     * Show conjunct activity instructions
     */
    showInstructions(){
        let info_image: Phaser.GameObjects.Image = this.add.image(400, 300, "move conjunct info");
        let next_arrow: Phaser.GameObjects.Image = this.add.image(750, 550, 'next_arrow').setScale(1.3).setInteractive();

        let observation_move_video: Phaser.GameObjects.Video = this.add.video(400, 200, 'move conjunct info video').setScale(0.4);
        observation_move_video.play(true);
        next_arrow.on("pointerdown", function(){
            info_image.destroy();
            next_arrow.destroy();
            observation_move_video.destroy();
            this.createLevel();
        }, this);
    }

    /**
     * Creates level
     */
    createLevel(){
        this.add.image(400, 300, 'background_failure');
        super.create();
 
        // Fields

        let field_0: Field = this.createField(200, 250, 'a.b.0+a.0+a.c.0', 0);

        this.createField(100, 400, 'b.0', 1);

        this.createField(300, 400, 'c.0', 2);

        this.createField(200, 550, '0', 3);

        let field_4: Field = this.createField(600, 250, 'a.b.0+a.(b.b.0+c.c.0)+a.c.0', 4);

        this.createField(450, 400, 'b.0', 5);

        this.createField(600, 400, 'b.b.0+c.c.0', 6);

        this.createField(750, 400, 'c.0', 7);

        this.createField(600, 550, '0', 8);

        //create arrows
        this.add.image(150,325, 'arrow').rotation += 2.3;

        this.add.image(250,325, 'arrow').rotation += 0.8;

        this.add.image(200,325, 'arrow').rotation += 1.57;

        this.add.image(200,400, 'arrow').rotation += 1.57;

        this.add.image(200,475, 'arrow').rotation += 1.57;

        this.add.image(150,475, 'arrow').setTint(0xffff00).rotation += 0.8;

        this.add.image(250,475, 'arrow').setTint(0xff0000).rotation += 2.3;

        this.add.image(550,300, 'arrow').rotation += 2.35;

        this.add.image(500,350, 'arrow').rotation += 2.35;

        this.add.image(600,325, 'arrow').rotation += 1.57;

        this.add.image(650,300, 'arrow').rotation = 0.8;

        this.add.image(700,350, 'arrow').rotation = 0.8;

        this.add.image(525,400, 'arrow').setTint(0xffff00).rotation += 3.15;

        this.add.image(675,400, 'arrow').setTint(0xff0000);

        this.add.image(500,450, 'arrow').setTint(0xffff00).rotation = 0.8;

        this.add.image(550,500, 'arrow').setTint(0xffff00).rotation = 0.8;

        this.add.image(700,450, 'arrow').setTint(0xff0000).rotation += 2.35;

        this.add.image(650,500, 'arrow').setTint(0xff0000).rotation += 2.35;

        //initialize the adjacency matrix
        this.connected = this.createConnections(9);
        this.connected[0][1] = 1;
        this.connected[0][2] = 1;
        this.connected[0][3] = 1;
        this.connected[1][3] = 1;
        this.connected[2][3] = 1;
        this.connected[4][5] = 1;
        this.connected[4][6] = 1;
        this.connected[4][7] = 1;
        this.connected[5][8] = 1;
        this.connected[6][5] = 1;
        this.connected[6][7] = 1;
        this.connected[7][8] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(12);
        this.observations[0][1] = 'a';
        this.observations[0][2] = 'a';
        this.observations[0][3] = 'a';
        this.observations[1][3] = 'b';
        this.observations[2][3] = 'c';
        this.observations[4][5] = 'a';
        this.observations[4][6] = 'a';
        this.observations[4][7] = 'a';
        this.observations[5][8] = 'b';
        this.observations[6][5] = 'b';
        this.observations[6][7] = 'c';
        this.observations[7][8] = 'c';

        //create hero
        this.hero = new Hero(200, 250, field_0, this);

        // create defender
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 250, field_4);
    }
    
}
