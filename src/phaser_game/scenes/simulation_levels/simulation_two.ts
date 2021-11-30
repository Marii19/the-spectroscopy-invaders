import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import level from "../level";

export default class simulationTwo extends level{

    constructor(){
        let instructions: string[] = ['simulation', 'move conjunct info', "move negation info", 'move observation info']
        super('simulation two', 'a.(b.0+c.c.0)', 'a.(b.0+c.0)+a.c.c.0', 'Simulation', instructions);
        this.enemy = "enemy_simulation"
    }

    preload(){
        super.preload();
        this.load.image('background_simulation', 'assets/backgrounds/level_backgrounds/background_simulation.png');
        this.load.spritesheet('enemy_simulation', 'assets/characters/enemy_simulation.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(){
        this.add.image(400, 300, 'background_simulation');
        super.create();
 
        // FIelds
        let field_0: Field = this.createField(200, 200, 'a.(b.0+c.c.0)', 0);

        this.createField(200, 320, 'b.0+c.c.0', 1);

        this.createField(100, 440, '0', 2);

        this.createField(300, 440, 'c.0', 3);

        let field_defender: Field = this.createField(600,200, 'a.(b.0+c.0)+a.c.c.0', 4);

        this.createField(500,320, 'b.0+c.0', 5);

        this.createField(700, 320, 'c.c.0', 6);

        this.createField(500, 440, '0', 7);

        this.createField(600, 440, '0', 8);

        this.createField(700, 440, 'c.0', 9);

        this.createField(700, 560, '0', 10);

        //create arrows
        this.add.image(200,260, 'arrow').rotation += 1.57;
        this.add.image(150,380, 'arrow').setTint(0xff0000).rotation += 2.3;
        this.add.image(250,380, 'arrow').setTint(0xFFAA00).rotation += 0.9;
        this.add.image(200,440, 'arrow').setTint(0xFFAA00).rotation += 3.15;
        this.add.image(550,260, 'arrow').rotation += 2.3;
        this.add.image(650,260, 'arrow').rotation += 0.9;
        this.add.image(500,380, 'arrow').setTint(0xff0000).rotation += 1.575;
        this.add.image(550,380, 'arrow').setTint(0xFFAA00).rotation += 0.9;
        this.add.image(700,380, 'arrow').setTint(0xFFAA00).rotation += 1.575;
        this.add.image(700,500, 'arrow').setTint(0xFFAA00).rotation += 1.57;
     
        //initialize the adjacency matrix
        this.connected = this.createConnections(11);
        this.connected[0][1] = 1;
        this.connected[1][2] = 1;
        this.connected[1][3] = 1;
        this.connected[3][2] = 1;
        this.connected[4][5] = 1;
        this.connected[4][6] = 1;
        this.connected[5][7] = 1;
        this.connected[5][8] = 1;
        this.connected[6][9] = 1;
        this.connected[9][10] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(11);
        this.observations[0][1] = 'a';
        this.observations[1][2] = 'b';
        this.observations[1][3] = 'c';
        this.observations[3][2] = 'c';
        this.observations[4][5] = 'a';
        this.observations[4][6] = 'a';
        this.observations[5][7] = 'b';
        this.observations[5][8] = 'c';
        this.observations[6][9] = 'c';
        this.observations[9][10] = 'c';

        //create hero
        this.hero = new Hero(200, 200, field_0, this)

        // Create first enemy
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 200, field_defender);
    }
}
