import Hero from "../../game_objects/hero";
import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import level from "../level";

export default class simulationOne extends level{

    constructor(){
        let instructions: string[] = ['simulation', 'move conjunct info', "move negation info", 'move observation info']
        super('simulation one', 'a.(b.0+c.0)+a.a.(b.0+c.0)', 'a.(b.0+a.b.0)+a.(c.0+a.c.0)', 'Simulation', instructions);
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
 
        // Fields

        let field_0: Field = this.createField(200, 200, 'a.(b.0+c.0)+a.a.(b.0+c.0)', 0);

        this.createField(100, 320, 'b.0+c.0', 1);

        this.createField(300, 320, 'a.(b.0+c.0)', 2);

        this.createField(100, 440, '0', 3);

        this.createField(300,440, '0', 4);

        let field_5: Field = this.createField(600, 200, 'a.(b.0+a.b.0)+a.(c.0+a.c.0)', 5);

        this.createField(500, 320, 'b.0+a.b.0', 6);

        this.createField(700, 320, 'c.0+a.c.0', 7);

        this.createField(500, 440, 'b.0', 8);

        this.createField(700, 440, 'c.0', 9);

        this.createField(600, 500, '0', 10);


        //create arrows
        this.add.image(150,260, 'arrow').rotation += 2.3;
        this.add.image(250,260, 'arrow').rotation += 0.9;
        this.add.image(200,320, 'arrow').rotation += 3.15;
        this.add.image(100,380, 'arrow').setTint(0xff0000).rotation += 1.57;
        this.add.image(160,360, 'arrow').setTint(0xFFAA00).rotation += 0.5;
        this.add.image(230,400, 'arrow').setTint(0xFFAA00).rotation += 0.5;
        this.add.image(550,260, 'arrow').rotation += 2.3;
        this.add.image(650,260, 'arrow').rotation += 0.9;
        this.add.image(500,380, 'arrow').rotation += 1.575;
        this.add.image(540,375, 'arrow').setTint(0xff0000).rotation += 1.1;
        this.add.image(570,435, 'arrow').setTint(0xff0000).rotation += 1.1;
        this.add.image(660,375, 'arrow').setTint(0xFFAA00).rotation += 2.0;
        this.add.image(630,435, 'arrow').setTint(0xFFAA00).rotation += 2.0;
        this.add.image(700,380, 'arrow').rotation += 1.575;
        this.add.image(535,490, 'arrow').setTint(0xff0000).rotation += 0.6;
        this.add.image(665,490, 'arrow').setTint(0xFFAA00).rotation += 2.6;
     
        //initialize the adjacency matrix
        this.connected = this.createConnections(11);
        this.connected[0][1] = 1;
        this.connected[0][2] = 1;
        this.connected[1][3] = 1;
        this.connected[1][4] = 1;
        this.connected[2][1] = 1;
        this.connected[5][6] = 1;
        this.connected[5][7] = 1;
        this.connected[6][8] = 1;
        this.connected[6][10] = 1;
        this.connected[7][9] = 1;
        this.connected[7][10] = 1;
        this.connected[8][10] = 1;
        this.connected[9][10] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(11);
        this.observations[0][1] = 'a';
        this.observations[0][2] = 'a';
        this.observations[1][3] = 'b';
        this.observations[1][4] = 'c';
        this.observations[2][1] = 'a';
        this.observations[5][6] = 'a';
        this.observations[5][7] = 'a';
        this.observations[6][8] = 'a';
        this.observations[6][10] = 'b';
        this.observations[7][9] = 'a';
        this.observations[7][10] = 'c';
        this.observations[8][10] = 'b';
        this.observations[9][10] = 'c';

        //create hero
        this.hero = new Hero(200, 200, field_0, this)

        // Create first defender
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 200, field_5);
    }
}
