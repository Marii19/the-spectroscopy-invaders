import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import level from "../level";


export default class failureFour extends level{

    constructor(){
        let instructions: string[] = ['failure', 'move conjunct info', "move negation info", 'move observation info']
        super('failure four', 'a.b.0', 'a.b.e.0+a.(b.f.0+c.0)', 'Failure', instructions);
        this.enemy = "enemy_failure"
    }

    preload(){
        super.preload();
        this.load.image('background_failure', 'assets/backgrounds/level_backgrounds/background_failure.png');
        this.load.spritesheet('enemy_failure', 'assets/characters/enemy_failure.png', { frameWidth: 32, frameHeight: 48 });

    }

    create(){
        this.add.image(400, 300, 'background_failure');
        super.create();
 
        // Fields

        let field_0: Field = this.createField(200, 200, 'a.b.0', 0);

        this.createField(200, 320, 'b.0', 1);

        this.createField(200, 440, '0', 2);

        let field_3: Field = this.createField(600, 200, 'a.b.e.0+a.(b.f.0+c.0)', 3);

        this.createField(500, 320, 'b.e.0', 4);

        this.createField(600, 320, 'b.f.0+c.0', 5);

        this.createField(500, 440, 'e.0', 6);

        this.createField(600, 440, 'f.0', 7);

        this.createField(700, 440, '0', 8);

        this.createField(500, 560, '0', 9);

        this.createField(600, 560, '0', 10);

        //create arrows
        this.add.image(200,260, 'arrow').rotation += 1.57;

        this.add.image(200,380, 'arrow').setTint(0xffff00).rotation += 1.57;

        this.add.image(550,260, 'arrow').rotation += 2.3;

        this.add.image(600,260, 'arrow').rotation += 1.57;

        this.add.image(500,380, 'arrow').setTint(0xffff00).rotation += 1.57;

        this.add.image(600,380, 'arrow').setTint(0xffff00).rotation += 1.57;

        this.add.image(650,380, 'arrow').setTint(0xff0000).rotation += 0.8;

        this.add.image(500,500, 'arrow').setTint(0xFFAA00).rotation += 1.57;

        this.add.image(600,500, 'arrow').setTint(0x0025FF).rotation += 1.57;
     
        //initialize the adjacency matrix
        this.connected = this.createConnections(11);
        this.connected[0][1] = 1;
        this.connected[1][2] = 1;
        this.connected[3][4] = 1;
        this.connected[3][5] = 1;
        this.connected[4][6] = 1;
        this.connected[5][7] = 1;
        this.connected[5][8] = 1;
        this.connected[6][9] = 1;
        this.connected[7][10] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(11);
        this.observations[0][1] = 'a';
        this.observations[1][2] = 'b';
        this.observations[3][4] = 'a';
        this.observations[3][5] = 'a';
        this.observations[4][6] = 'b';
        this.observations[5][7] = 'b';
        this.observations[5][8] = 'c';
        this.observations[6][9] = 'e';
        this.observations[7][10] = 'f';

        // create hero
        this.hero = new Hero(200, 200, field_0, this);

        // create defender
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 200, field_3);
    }


    
}
