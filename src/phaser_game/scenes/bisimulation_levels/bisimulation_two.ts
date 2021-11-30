import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import level from "../level";


export default class bisimulationTwo extends level{

    constructor(){
        let instructions: string[] = ['bisimulation', 'move conjunct info', "move negation info", 'move observation info']
        super('bisimulation two', 'a.(b.b.0+c.c.0)', 'a.(b.b.0+c.c.0)+a.(b.0+c.0)', 'Bisimulation', instructions);
        this.enemy = "enemy_bisimulation"
    }

    preload(){
        super.preload();
        this.load.image('background_bisimulation', 'assets/backgrounds/level_backgrounds/background_bisimulation.png');
        this.load.spritesheet('enemy_bisimulation', 'assets/characters/enemy_bisimulation.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(){
        this.add.image(400, 300, 'background_bisimulation');
        super.create();
 
        // Fields
        let field_0: Field = this.createField(200, 200, 'a.(b.b.0+c.c.0)', 0);

        this.createField(200, 320, 'b.b.0+c.c.0', 1);

        this.createField(100, 440, 'b.0', 2);

        this.createField(300, 440, 'c.0', 3);

        this.createField(200 ,560, '0', 4);

        let field_defender: Field = this.createField(600 ,200, 'a.(b.b.0+c.c.0)+a.(b.0+c.0)', 5);

        this.createField(550, 320, 'b.b.0+c.c.0', 6);

        this.createField(650, 320, 'b.0+c.0', 7);

        this.createField(500, 440, 'b.0', 8);

        this.createField(565, 440, 'c.0', 9);

        this.createField(635, 440, '0', 10);

        this.createField(700, 440, '0', 11);

        this.createField(532.5, 560, '0', 12);

        //create arrows
        this.add.image(200,260, 'arrow').rotation += 1.57;
        this.add.image(150,380, 'arrow').setTint(0xFF0000).rotation += 2.3;
        this.add.image(250,380, 'arrow').setTint(0xFFAA00).rotation += 0.9;
        this.add.image(150,500, 'arrow').setTint(0xFF0000).rotation += 0.9;
        this.add.image(250,500, 'arrow').setTint(0xFFAA00).rotation += 2.3;
        this.add.image(560,260, 'arrow').rotation += 2.1;
        this.add.image(640,260, 'arrow').rotation += 1.1;
        this.add.image(510,380, 'arrow').setTint(0xFF0000).rotation += 2.0;
        this.add.image(555,380, 'arrow').setTint(0xFFAA00).rotation += 1.4;
        this.add.image(645,380, 'arrow').setTint(0xff0000).rotation += 1.7;
        this.add.image(690,380, 'arrow').setTint(0xFFAA00).rotation += 1.1;
        this.add.image(510,500, 'arrow').setTint(0xff0000).rotation += 1.2;
        this.add.image(550,500, 'arrow').setTint(0xFFAA00).rotation += 1.9;
     
        //initialize the adjacency matrix
        this.connected = this.createConnections(13);
        this.connected[0][1] = 1;
        this.connected[1][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][4] = 1;
        this.connected[3][4] = 1;
        this.connected[5][6] = 1;
        this.connected[5][7] = 1;
        this.connected[6][8] = 1;
        this.connected[6][9] = 1;
        this.connected[7][10] = 1;
        this.connected[7][11] = 1;
        this.connected[8][12] = 1;
        this.connected[9][12] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(13);
        this.observations[0][1] = 'a';
        this.observations[1][2] = 'b';
        this.observations[1][3] = 'c';
        this.observations[2][4] = 'b';
        this.observations[3][4] = 'c';
        this.observations[5][6] = 'a';
        this.observations[5][7] = 'a';
        this.observations[6][8] = 'b';
        this.observations[6][9] = 'c';
        this.observations[7][10] = 'b';
        this.observations[7][11] = 'c';
        this.observations[8][12] = 'b';
        this.observations[9][12] = 'c';

        //create hero
        this.hero = new Hero(200, 200, field_0, this)

        // Create first defender
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 200, field_defender);
    }
}
