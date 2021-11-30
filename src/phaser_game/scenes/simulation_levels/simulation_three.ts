import Hero from "../../game_objects/hero";
import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import level from "../level";

export default class simulationThree extends level{

    constructor(){
        let instructions: string[] = ['simulation', 'move conjunct info', "move negation info", 'move observation info']
        super('simulation three', 'a.(b.0+a.(b.0+c.0))', 'a.a.(b.0+c.0)+a.(b.0+a.b.0+a.c.0)', 'Simulation', instructions);
        this.enemy = "enemy_simulation";
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
        let field_0: Field = this.createField(200, 200, 'a.(b.0+a.(b.0+c.0))', 0);

        this.createField(200, 320, 'b.0+a.(b.0+c.0)', 1);

        this.createField(100, 440, 'b.0+c.0', 2);

        this.createField(300, 440, '0', 3);

        this.createField(100,560, '0', 4);

        this.createField(200, 560, '0', 5);

        let field_6: Field = this.createField(600, 200, 'a.a.(b.0+c.0)+a.(b.0+a.b.0+a.c.0)', 6);

        this.createField(500, 320, 'a.(b.0+c.0)', 7);

        this.createField(690, 320, 'b.0+a.b.0+a.c.0', 8);

        this.createField(500, 440, 'b.0+c.0', 9);

        this.createField(610, 440, 'b.0', 10);

        this.createField(690, 440, 'c.0', 11);

        this.createField(770, 440, '0', 12);

        this.createField(500, 560, '0', 13);

        this.createField(610, 560, '0', 14);

        //create arrows
        this.add.image(200,260, 'arrow').setTint(0xFF8000).rotation += 1.57;
        this.add.image(150,380, 'arrow').setTint(0xFF8000).rotation += 2.3;
        this.add.image(250,380, 'arrow').setTint(0x0000FF).rotation += 0.9;
        this.add.image(100,500, 'arrow').setTint(0x0000FF).rotation += 1.57;
        this.add.image(150,500, 'arrow').setTint(0xFFFF00).rotation += 0.9;
        this.add.image(550,260, 'arrow').setTint(0xFF8000).rotation += 2.3;
        this.add.image(650,260, 'arrow').setTint(0xFF8000).rotation += 0.9;
        this.add.image(500,380, 'arrow').setTint(0xFF8000).rotation += 1.575;
        this.add.image(650,380, 'arrow').setTint(0xFF8000).rotation += 2.1;
        this.add.image(690,380, 'arrow').setTint(0xFF8000).rotation += 1.575;
        this.add.image(740,380, 'arrow').setTint(0x0000FF).rotation += 1.1;
        this.add.image(500,500, 'arrow').setTint(0x0000FF).rotation +=  1.575;
        this.add.image(550,500, 'arrow').setTint(0xFFFF00).rotation += 0.9;
        this.add.image(610,500, 'arrow').setTint(0x0000FF).rotation += 1.575;
        this.add.image(650,500, 'arrow').setTint(0xFFFF00).rotation += 2.1;
        
        //initialize the adjacency matrix
        this.connected = this.createConnections(15);
        this.connected[0][1] = 1;
        this.connected[1][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][4] = 1;
        this.connected[2][5] = 1;
        this.connected[6][7] = 1;
        this.connected[6][8] = 1;
        this.connected[7][9] = 1;
        this.connected[8][10] = 1;
        this.connected[8][11] = 1;
        this.connected[8][12] = 1;
        this.connected[9][13] = 1;
        this.connected[9][14] = 1;
        this.connected[10][14] = 1;
        this.connected[11][14] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(13);
        this.observations[0][1] = 'a';
        this.observations[1][2] = 'a';
        this.observations[1][3] = 'b';
        this.observations[2][4] = 'b';
        this.observations[2][5] = 'c';
        this.observations[6][7] = 'a';
        this.observations[6][8] = 'a';
        this.observations[7][9] = 'a';
        this.observations[8][10] = 'a';
        this.observations[8][11] = 'a';
        this.observations[8][12] = 'b';
        this.observations[9][13] = 'b';
        this.observations[9][14] = 'c';
        this.observations[10][14] = 'b';
        this.observations[11][14] = 'c';

        //create hero
        this.hero = new Hero(200, 200, field_0, this)

        // Create first defender
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 200, field_6);
    }
}
